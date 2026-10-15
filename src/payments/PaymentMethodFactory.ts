import { IPaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { DebitCardPayment } from './DebitCardPayment';
import { PixPayment } from './PixPayment';

export class PaymentMethodFactory {
  static create(method: string): IPaymentMethod | null {
    switch (method) {
      case 'credit_card':
        return new CreditCardPayment();
      case 'debit_card':
        return new DebitCardPayment();
      case 'pix':
        return new PixPayment();
      default:
        return null;
    }
  }
}