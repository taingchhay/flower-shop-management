import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const OrderItem = sequelize.define('OrderItem', {
    orderId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'orders',
        key: 'id'
        }
    },
    flowerId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'flowers',
        key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
  tableName: 'order_items',
  timestamps: false
});

export default OrderItem;