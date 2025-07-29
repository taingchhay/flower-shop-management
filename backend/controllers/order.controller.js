import models from '../models/index.js';
import { Op } from 'sequelize';

export const createOrder = async (req, res) => {
    const { userId, shippingAddressId, cartItems, totalPrice } = req.body;

    if (!userId || !shippingAddressId || !cartItems || cartItems.length === 0 || totalPrice <= 0) {
        return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    try {
        const order = await models.Order.create({
            userId,
            shippingAddressId,
            paymentMethod: 'qr_code',
            paymentStatus: 'pending',
            orderStatus: 'processing',
            subtotal: totalPrice,
            shippingFee: 5.99,
            tax: totalPrice * 0.08,
            total: totalPrice + 5.99 + (totalPrice * 0.08)
        });

        if (order) {
            const orderItems = cartItems.map(item => {
                return {
                    orderId: order.id,
                    flowerId: item.flower.id,
                    quantity: item.quantity,
                    unitPrice: item.flower.price,
                    totalPrice: item.flower.price * item.quantity
                };
            });

            await models.OrderItem.bulkCreate(orderItems);

            // Clear the user's cart after order creation
            await models.Cart.destroy({
                where: {
                    userId: userId
                }
            });

            return res.status(201).json({ success: true, message: "Order created successfully", orderId: order.id });
        }

        return res.status(400).json({ success: false, message: "Failed to create order" });

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await models.Order.findAll({
            where: { 
                userId: id,
                orderStatus: { [Op.ne]: 'cancelled' }
            },
            include: [
                {
                    model: models.OrderItem,
                    include: [models.Flower]
                },
                models.ShippingAddress
            ]
        });

        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getRecentOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const recentOrders = await models.Order.findAll({
            where: {
                userId: id,
                orderStatus: { [Op.ne]: 'cancelled' }
            },
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [
                {
                    model: models.OrderItem,
                    include: [models.Flower]
                }
            ]
        });

        return res.status(200).json({ success: true, data: recentOrders });
    } catch (error) {
        console.error("Error fetching recent orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};