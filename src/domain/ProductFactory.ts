import { IProduct } from './IProduct';
import { PhysicalProduct } from './PhysicalProduct';
import { DigitalProduct } from './DigitalProduct';

export interface ProductData {
  id: number;
  name: string;
  type: string;
  price: number;
}

export class ProductFactory {
  static createProduct(data: ProductData): IProduct {
    switch (data.type) {
      case 'physical':
        return new PhysicalProduct(data.id, data.name, data.price);
      case 'digital':
        return new DigitalProduct(data.id, data.name, data.price);
      default:
        throw new Error(`Tipo de produto não suportado: ${data.type}`);
    }
  }
}
