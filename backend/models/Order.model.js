import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        }
    },
    shippingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'shipping_addresses',
        key: 'id'
        }
    },
    paymentMethod: {
        type: DataTypes.ENUM('qr_code', 'credit_card', 'cash_on_delivery'),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending'
    },
    orderStatus: {
        type: DataTypes.ENUM('processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'processing'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    shippingFee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
        tableName: 'orders',
        timestamps: true
});

export default Order;