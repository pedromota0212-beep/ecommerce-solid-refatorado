import nodemailer from 'nodemailer';
import { getMailClient } from '../lib/mail';
import { IMailProvider, MailMessage, MailResult } from './IMailProvider';
import logger from '../lib/logger';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(message: MailMessage): Promise<MailResult> {
    const mailer = await getMailClient();
    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      ...message,
    });
    const previewUrl = nodemailer.getTestMessageUrl(info) || false;
    logger.info(`Email enviado: ${previewUrl || 'sem URL de visualização'}`);
    return { previewUrl };
  }
}
