import express from 'express';
import { PrismaClient } from '@prisma/client';
import { OrderController } from './controllers/OrderController';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';
import { EtherealMailProvider } from './providers/EtherealMailProvider';
import { NotificationService } from './services/NotificationService';
import { OrderService } from './services/OrderService';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const orderRepository = new PrismaOrderRepository(prisma);
const productRepository = new PrismaProductRepository(prisma);
const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);
const orderService = new OrderService(orderRepository, productRepository, notificationService);
const orderController = new OrderController(orderService);

app.post('/orders', orderController.processOrder);

export default app;
