import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    DiseaseName: {
        type: String,
        required: true,
        trim: true
    }, 
    Type:{
        type: String
    },
    CropType:{
        type: String
    },
    photo: {
        type: String
    },

    Information: {
        type: String
    },
    Remedy:{
        type: String
    }

});

const Disease = mongoose.model('Diseases', diseaseSchema);



export default Disease;