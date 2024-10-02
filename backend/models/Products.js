import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
    ProductNo : {
        type: String,
        unique: true
    },
    ProductName: {
        type: String,
        required: true,
    },
    image: { 
        type: String,  
    
    },
    Description: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Quantity: {
        type: String,
        required: true,
    },
    SellingPrice: {
        type: String,
        required: true,
    },
    FarmerName: {
        type: String,
        required: true,
    },
    FarmerEmail: {
        type: String,
        required: true,
    },

    }
);

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true},
    seq: { type: Number, default: 1 }
});

const PCounterr = mongoose.model('PCounterr', counterSchema);

productSchema.pre('save', async function (next) {
    try{
        if (this.isNew) {
            const doc = await PCounterr.findOneAndUpdate(
                { _id: 'ProductNo ' }, 
                { $inc: { seq: 1 } }, 
                { new: true, upsert: true });
            this.ProductNo  = 'P' + doc.seq; // Modified to 'ProductNo '
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Products = mongoose.model('Products' ,productSchema);