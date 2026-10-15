import { IPaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { PixPayment } from './PixPayment';

export class PaymentMethodFactory {
  static create(method: string): IPaymentMethod | null {
    switch (method) {
      case 'credit_card':
        return new CreditCardPayment();
      case 'pix':
        return new PixPayment();
      default:
        return null;
    }
  }
}
