import Sequelize from "sequelize";

//  Order model.
const Order =  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: Sequelize.INTEGER,
        required: true,
        //ref: 'User'
    },
	shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
	paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
    },
    itemsPrice: {
        type: Sequelize.STRING,
        allowNull: false
    },
	taxPrice: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingPrice: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    orderItems: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

export default Order

/* import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true 
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order */