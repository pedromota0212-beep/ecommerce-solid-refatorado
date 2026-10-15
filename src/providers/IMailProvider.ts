export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailResult {
  previewUrl: string | false;
}

export interface IMailProvider {
  sendMail(message: MailMessage): Promise<MailResult>;
}
