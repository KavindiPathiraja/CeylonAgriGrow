import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  province: {
    type: String,
    required:true
  },
  district: {
    type: String,
    required:true
  },
  landarea: {
    type: Boolean,
    required:true
  },
  distancewater: {
    type: Boolean,
    required:true
  },
  soiltype: {
    type: Boolean,
    required:true
  },
  soilph: {
    type: Boolean,
    required:true
  },
  rainfall: {
    type: Boolean,
    required:true
  },
  pastCrop: {
    type: String,
    required:true
  },
  labour: {
    type: Number,
    required:true
  },
  dateOfPlanting: {
    type: Date,
    required:true
  }
});

const Crop = mongoose.model('Crop', cropSchema);

// Change to default export
export default Crop;
