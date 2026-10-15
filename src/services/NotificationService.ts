import { IMailProvider } from '../providers/IMailProvider';

export interface OrderNotification {
  customer: string;
  orderId: number;
  total: number;
  productNames: string[];
}

export class NotificationService {
  constructor(private readonly mailProvider: IMailProvider) {}

  async orderConfirmed(data: OrderNotification): Promise<string | false> {
    const { customer, orderId, total, productNames } = data;
    const itemsHtml = productNames.map(name => `<li>${this.escapeHtml(name)}</li>`).join('');
    const result = await this.mailProvider.sendMail({
      to: customer,
      subject: `Confirmação do Pedido #${orderId}`,
      text: `Olá, seu pedido #${orderId} no valor de R$ ${total.toFixed(2)} foi confirmado.`,
      html: `<h1>Pedido Confirmado!</h1>
        <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
        <p>Total: <strong>R$ ${total.toFixed(2)}</strong></p>
        <ul>${itemsHtml}</ul>`,
    });
    return result.previewUrl;
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[char] as string));
  }
}
