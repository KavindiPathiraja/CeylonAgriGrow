import mongoose from "mongoose";

const farmerSchema = mongoose.Schema(
    {
    FarmerID : {
        type: String,
        unique: true
    },
    FarmerName: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },

    }
);

const counterSchema = mongoose.Schema({
    _id: { type: String, required: true},
    seq: { type: Number, default: 1 }
});

const FCounterr = mongoose.model('FCounterr', counterSchema);

farmerSchema.pre('save', async function (next) {
    try{
        if (this.isNew) {
            const doc = await FCounterr.findOneAndUpdate(
                { _id: 'FarmerID ' }, 
                { $inc: { seq: 1 } }, 
                { new: true, upsert: true });
            this.FarmerID  = 'FarmerID' + doc.seq; // Modified to 'FarmerID '
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Farmers = mongoose.model('Farmers' ,farmerSchema);