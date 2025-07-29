import models from '../models/index.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await models.Order.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['id', 'username', 'email']
                },
                {
                    model: models.ShippingAddress,
                    attributes: ['id', 'city', 'country', 'commune', 'province', 'street']
                }
            ]
        });

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, error: "Failed to fetch orders" });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await models.Order.findByPk(id);
        if (order) {
            await order.update({ orderStatus: status });
            return res.status(200).json({ success: true, message: "Order status updated successfully" });
        }

        return res.status(404).json({ success: false, message: "Order not found" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};

export const updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    try {
        const order = await models.Order.findByPk(id);
        if (order) {
            await order.update({ paymentStatus });
            return res.status(200).json({ success: true, message: "Payment status updated successfully" });
        }

        return res.status(404).json({ success: false, message: "Order not found" });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ error: "Failed to update payment status" });
    }
};

export const getOrderItems = async (req, res) => {
    const { id } = req.params;

    try {
        const orderItems = await models.OrderItem.findAll({
            where: {
                orderId: id
            },
            include: [
                {
                    model: models.Flower,
                    attributes: ['id', 'name', 'price']
                }
            ]
        });

        return res.status(200).json({ success: true, data: orderItems });
    } catch (error) {
        console.error("Error fetching order items:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};