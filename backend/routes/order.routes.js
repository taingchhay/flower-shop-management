import express from 'express';

import { createOrder, getOrders, getRecentOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrders);
router.get('/recent-order/:id', getRecentOrders);

export default router;