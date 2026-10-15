import { IPaymentMethod, PaymentDetails } from './IPaymentMethod';
import logger from '../lib/logger';

export class CreditCardPayment implements IPaymentMethod {
  async process(details: PaymentDetails): Promise<void> {
    if (typeof details.cardNumber !== 'string' || details.cardNumber.length < 4) {
      throw new Error('Dados de cartão inválidos');
    }
    if (typeof details.cvv !== 'string' || details.cvv.length === 0) {
      throw new Error('CVV inválido');
    }
    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)}`);
    // Simulação de gateway preservada conforme o projeto didático.
    if (details.cvv === '000') throw new Error('Cartão recusado');
  }
}
