import { IPaymentMethod, PaymentDetails } from './IPaymentMethod';
import logger from '../lib/logger';

export class PixPayment implements IPaymentMethod {
  async process(_details: PaymentDetails): Promise<void> {
    // Simulação didática: não há integração com gateway Pix real.
    logger.info('Processando pagamento via Pix...');
  }
}
