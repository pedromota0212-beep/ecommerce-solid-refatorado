export interface IProduct {
  id: number;
  name: string;
  price: number;
  calculateFreight(quantity: number): number;
}
