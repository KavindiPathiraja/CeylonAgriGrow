import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    CropID: String,
    CropName: String,
    ScientificName: String,
    Location: String,
    CropArea: String,
    SoilpHLevel: String,
    IrrigationType: String,
    Img: String,
    GrowthStage: String,
    SoilType: String,
    RainFall: String,
    Temperature: String,
}, {
    timestamps: true
});

const Cropsf = mongoose.model("Cropsf", cropSchema);

export default Cropsf;
