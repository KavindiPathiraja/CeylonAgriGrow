import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        // required: true,
        // unique: true,
    },
    FarmerID: {
        type: String,
    },
    customerInfo: {
        FarmerName: { type: String, required: true },
        Email: { type: String, required: true },
        ContactNo: { type: String, required: true },
    },
    products: [
        {
            ProductNo: { type: String},
            ProductName: { type: String},
            image: { type: String},
            Description: { type: String},
            quantity: { type: Number},
            SellingPrice: { type: Number},
            FarmerName: { type: String},
            FarmerEmail: { type: String},
        },
    ],
    total: {
        type: Number,
    },
    deliveryInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    cardInfo: {
        cardNumber: { type: String },
        expiryDate: { type: String },
        cvv: { type: String },
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
