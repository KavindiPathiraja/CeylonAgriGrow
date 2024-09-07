import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  landarea: {
    type: String,  // Changed to String
    required: true,
  },
  distancewater: {
    type: String,  // Changed to String
    required: true,
  },
  soiltype: {
    type: String,  // Changed to String
    required: true,
  },
  soilph: {
    type: String,  // Changed to String
    required: true,
  },
  rainfall: {
    type: String,  // Changed to String
    required: true,
  },
  pastCrop: {
    type: String,
    required: true,
  },
  labour: {
    type: Number,
    required: true,
  },
  dateOfPlanting: {
    type: Date,
    required: true,
  },
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
