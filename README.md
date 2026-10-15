# E-commerce — Refatoração com SOLID

Projeto de refatoração de um sistema de e-commerce desenvolvido em TypeScript, Node.js, Express e Prisma, aplicando os princípios SOLID para melhorar a organização, a manutenção e a extensibilidade do código.

## Objetivos

- Separar responsabilidades entre as camadas da aplicação.
- Desacoplar regras de negócio de detalhes de infraestrutura.
- Facilitar a inclusão de novas formas de pagamento.
- Representar produtos físicos e digitais com comportamentos específicos.
- Organizar o acesso ao banco de dados e o envio de notificações.

## Princípios SOLID aplicados

### SRP — Responsabilidade Única

O processamento dos pedidos foi separado em componentes com responsabilidades específicas, como `OrderService`, `NotificationService`, repositórios e provedores de e-mail.

### OCP — Aberto/Fechado

As formas de pagamento utilizam a interface `IPaymentMethod`, com implementações específicas para cartão de crédito e Pix.

### LSP — Substituição de Liskov

Os produtos físicos e digitais implementam a interface `IProduct`, permitindo que sejam utilizados por meio de um contrato comum.

### ISP — Segregação de Interfaces

As interfaces foram separadas por finalidade, como `IProductRepository`, `IOrderRepository` e `IMailProvider`.

### DIP — Inversão de Dependência

As regras de negócio utilizam abstrações para acesso a produtos, pedidos e pagamentos, reduzindo o acoplamento com implementações concretas.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Nodemailer
- Ethereal Email

## Como executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Gerar o cliente Prisma

```bash
npm run prisma:generate
```

### 3. Executar as migrações do banco

```bash
npm run prisma:migrate
```

### 4. Popular o banco de dados

```bash
npm run prisma:seed
```

### 5. Iniciar o servidor

```bash
npm run dev
```

O servidor ficará disponível em `http://localhost:3000`.

## Endpoint de pedidos

A aplicação disponibiliza o endpoint:

`POST /orders`

Exemplo de corpo da requisição:

```json
{
  "customer": "teste@example.com",
  "items": [
    {
      "productId": 1,
      "quantity": 1
    }
  ],
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardNumber": "1234567812345678",
    "cvv": "123"
  }
}
```

O processamento depende dos produtos cadastrados no banco de dados. O envio de e-mail utiliza o Ethereal Email para testes.

## Testes realizados

- Verificação de tipos com `npx tsc --noEmit`.
- Inicialização do servidor Express.
- Processamento de pedido pela API.
- Verificação da conexão SMTP e envio de e-mail de teste.

## Observação

Este projeto foi desenvolvido para fins acadêmicos, com foco na aplicação dos princípios SOLID e na melhoria da estrutura do código.