import { IProduct } from './IProduct';

export class DigitalProduct implements IProduct {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
  ) {}

  calculateFreight(_quantity: number): number {
    return 0;
  }
}
