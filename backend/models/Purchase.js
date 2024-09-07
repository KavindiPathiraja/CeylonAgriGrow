import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema(
    {
    PurchaseNo : {
        type: String,
        unique: true
    }, 
    ProductNo : {
        type: String,
        required: true
    },
    ProductName: {
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
    TotalPrice: {
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

const PuCounterr = mongoose.model('PuCounterr', counterSchema);

purchaseSchema.pre('save', async function (next) {
    try{
        if (this.isNew) {
            const doc = await PuCounterr.findOneAndUpdate(
                { _id: 'PurchaseNo ' }, 
                { $inc: { seq: 1 } }, 
                { new: true, upsert: true });
            this.PurchaseNo  = 'Purchase' + doc.seq; // Modified to 'PurchaseNo '
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Purchase = mongoose.model('Purchase' ,purchaseSchema);