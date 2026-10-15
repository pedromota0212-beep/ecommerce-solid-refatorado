import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { ProductFactory } from '../domain/ProductFactory';
import { PaymentMethodFactory } from '../payments/PaymentMethodFactory';
import { PaymentDetails } from '../payments/IPaymentMethod';
import { NotificationService } from './NotificationService';
import logger from '../lib/logger';

export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface ProcessOrderInput {
  customer: string;
  items: OrderItemInput[];
  paymentMethod: string;
  paymentDetails: PaymentDetails;
}

export class OrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(input: ProcessOrderInput) {
    if (!input || typeof input.customer !== 'string' || !input.customer.includes('@')) {
      throw new Error('E-mail do cliente inválido');
    }
    if (!Array.isArray(input.items) || input.items.length === 0) {
      throw new Error('Carrinho vazio');
    }
    if (!input.paymentDetails || typeof input.paymentDetails !== 'object') {
      throw new Error('Dados de pagamento inválidos');
    }

    const payment = PaymentMethodFactory.create(input.paymentMethod);
    if (!payment) throw new Error('Método de pagamento não suportado');

    let totalAmount = 0;
    const productsDetails: Array<{ id: number; name: string; price: number; type: string; quantity: number }> = [];

    for (const item of input.items) {
      if (!Number.isInteger(item.productId) || item.productId < 1 ||
          !Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new Error('Produto e quantidade devem ser valores inteiros positivos');
      }
      const data = await this.productRepository.findById(item.productId);
      if (!data) throw new Error(`Produto ${item.productId} não encontrado`);

      const product = ProductFactory.createProduct(data);
      totalAmount += product.price * item.quantity + product.calculateFreight(item.quantity);
      productsDetails.push({ ...data, quantity: item.quantity });
    }

    await payment.process(input.paymentDetails);

    const order = await this.orderRepository.create({
      customer: input.customer,
      items: JSON.stringify(productsDetails),
      total: Number(totalAmount.toFixed(2)),
      status: 'confirmed',
    });

    try {
      const emailPreview = await this.notificationService.orderConfirmed({
        customer: input.customer,
        orderId: order.id,
        total: order.total,
        productNames: productsDetails.map(product => product.name),
      });
      return {
        message: 'Pedido processado com sucesso',
        orderId: order.id,
        emailPreview,
      };
    } catch (error) {
      // O pedido já foi salvo. Não o trate como se não tivesse sido criado.
      logger.error(`Pedido ${order.id} salvo, mas a notificação falhou: ${String(error)}`);
      return {
        message: 'Pedido processado, mas a notificação não pôde ser enviada',
        orderId: order.id,
        emailPreview: false,
      };
    }
  }
}
