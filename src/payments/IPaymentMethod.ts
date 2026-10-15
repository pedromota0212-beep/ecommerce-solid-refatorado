export interface PaymentDetails {
  cardNumber?: string;
  cvv?: string;
  [key: string]: unknown;
}

export interface IPaymentMethod {
  process(details: PaymentDetails): Promise<void>;
}
