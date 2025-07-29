import express from 'express';

import { getAllOrders, updateOrderStatus, getOrderItems, updatePaymentStatus } from '../controllers/adminOrder.controller.js';
import { getAllFlowers, updateFlower, addFlower, deleteFlower } from '../controllers/adminFlower.controller.js';

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/orders/:id/items', getOrderItems);
router.put('/orders/:id/status', updateOrderStatus);
router.put('/orders/:id/payment-status', updatePaymentStatus);

router.get('/flowers', getAllFlowers);
router.put('/flowers/:id', updateFlower);
router.post('/flowers', addFlower);
router.delete('/flowers/:id', deleteFlower);

export default router;