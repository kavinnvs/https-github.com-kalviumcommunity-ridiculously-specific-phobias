const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Products',
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: Object, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Shipped', 'Delivered','Cancelled'],
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Order', orderSchema);