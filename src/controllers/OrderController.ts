import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  processOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      const clientErrors = [
        'Carrinho vazio',
        'E-mail do cliente inválido',
        'Dados de pagamento inválidos',
        'Método de pagamento não suportado',
      ];
      if (message.startsWith('Produto ') && message.endsWith(' não encontrado')) {
        return res.status(400).json({ error: message });
      }
      if (message.includes('quantidade devem') || clientErrors.includes(message)) {
        return res.status(400).json({ error: message });
      }
      if (message === 'Cartão recusado') {
        return res.status(402).json({ error: message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  };
}
