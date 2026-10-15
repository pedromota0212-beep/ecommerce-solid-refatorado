import { IProduct } from './IProduct';

export class PhysicalProduct implements IProduct {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
  ) {}

  calculateFreight(quantity: number): number {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('A quantidade deve ser um inteiro positivo');
    }
    // Regra do enunciado: R$ 10,00 de frete por item físico do carrinho.
    // Para uma linha com quantity > 1, cobra-se uma única taxa de R$ 10,00.
    return 10;
  }
}
