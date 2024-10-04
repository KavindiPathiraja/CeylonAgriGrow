import express from 'express'
import Crop from '../models/cropModel.js';
import { startChatSession } from '../geminiApi.js'; // Import the startChatSession function


const router =express.Router();
// Route to Save a new crop form and predict suitable crops
router.post('/addcrops', async (request, response) => {
  try {
    // Validate required fields
    const requiredFields = [
      'province', 'district', 'landarea', 'distancewater', 'soiltype',
      'soilph', 'rainfall', 'pastCrop', 'labour', 'dateOfPlanting'
    ];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response.status(400).send({ message: `Missing required field: ${field}` });
      }
    }

    // Create new crop object
    const newCrop = {
      province: request.body.province,
      district: request.body.district,
      landarea: request.body.landarea,
      distancewater: request.body.distancewater,
      soiltype: request.body.soiltype,
      soilph: request.body.soilph,
      rainfall: request.body.rainfall,
      pastCrop: request.body.pastCrop,
      labour: request.body.labour,
      dateOfPlanting: request.body.dateOfPlanting,
    };

    // Save the crop to the database
    const crop = await Crop.create(newCrop);

    // Construct the user message for crop prediction
    const userMessage = `Predict a suitable crop based on the following details: 
      Province: ${request.body.province}, 
      District: ${request.body.district}, 
      Land Area: ${request.body.landarea}, 
      Distance to Water: ${request.body.distancewater}, 
      Soil Type: ${request.body.soiltype}, 
      Soil pH: ${request.body.soilph}, 
      Rainfall: ${request.body.rainfall}, 
      Past Crop: ${request.body.pastCrop}, 
      Labour: ${request.body.labour}, 
      Date of Planting: ${request.body.dateOfPlanting}.
      Please provide three suitable crops in a list format.`;

    // Call the AI function for crop prediction
    const cropPrediction = await startChatSession(userMessage);

    // Save the crop prediction to the crop document
    crop.cropPrediction = cropPrediction;
    await crop.save();

    // Return the saved crop data along with the crop prediction
    return response.status(201).send({ crop, cropPrediction });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for saving predicted crops to a separate endpoint (if needed)
router.post('/savepredicted', async (request, response) => {
  try {
    const { predictedCrops } = request.body;

    if (!predictedCrops) {
      return response.status(400).send({ message: "No predicted crops provided" });
    }

    // Perform logic to save predicted crops here, if needed

    return response.status(200).send({ message: "Predicted crops saved successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});


//Route for get all crop details from database
router.get('/getallcrops', async (request,response)=>{
    try{
        const crops=await Crop.find({});
        return response.status(200).json(crops);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for Get One Crop from database by id
router.get('/getcrops/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // Fetch the crop from the database by ID
    const crop = await Crop.findById(id);

    // Check if the crop exists
    if (!crop) {
      return response.status(404).json({ message: 'Crop not found' });
    }

    // Return only the crop details without the cropPrediction field
    return response.status(200).json({
      crops: {
        province: crop.province,
        district: crop.district,
        landarea: crop.landarea,
        distancewater: crop.distancewater,
        soiltype: crop.soiltype,
        soilph: crop.soilph,
        rainfall: crop.rainfall,
        pastCrop: crop.pastCrop,
        labour: crop.labour,
        dateOfPlanting: crop.dateOfPlanting,
      },
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: 'Internal server error' });
  }
});



//Route to Update a crop
router.put('/upcrops/:id',async(request , response)=>{
    try{
        if(request.body.province == null ||
            request.body.district == null ||
            request.body.landarea == null ||
            request.body.distancewater == null ||
            request.body.soiltype == null ||
            request.body.soilph == null ||
            request.body.rainfall == null ||
            request.body.pastCrop == null ||
            request.body.labour == null ||
            request.body.dateOfPlanting == null

        ){
            return response.status(400).send({
                message:'Send all required fields'
            })
        }
        const {id } =request.params;
        const result =await Crop.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Crop detail not found'});
        }
        return response.status(200).send({message: 'Crop detail updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});

    }
});
//Delete student Data
router.delete("/deletecrops/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Use findByIdAndDelete with the id directly
      const result = await Crop.findByIdAndDelete(id);
      
      if (!result) {
        return res.status(404).send({ message: "Crop not found" });
      }
      
      res.status(200).send({ message: "Crop deleted successfully", result });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  export default router;