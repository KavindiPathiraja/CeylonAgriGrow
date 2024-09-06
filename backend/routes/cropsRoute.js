import express from 'express'
import Crop from '../models/cropModel.js';


const router =express.Router();

//Route to Save a new cropform
router.post('/addcrops', async (request, response) => {
    try {
        if (request.body.province == null ||
            request.body.district == null ||
            request.body.landarea == null ||
            request.body.distancewater == null ||
            request.body.soiltype == null ||
            request.body.soilph == null ||
            request.body.rainfall == null ||
            request.body.pastCrop == null ||
            request.body.labour == null ||
            request.body.dateOfPlanting == null
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

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
            dateOfPlanting:request.body.dateOfPlanting
        };

        const crop = await Crop.create(newCrop);
        return response.status(201).send(crop);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
//Route to get one  crop detail from database by id
router.get('/getcrops/:id', async (request,response)=>{
    try{
        const { id } = request.params;
        const crops =await Crop.findById(id);
        if(!crops){
            return response.status(200).json(crops);

        }
        response.status(200).json(crops);
}catch(error){

        response.status(500).send({message:'Internal server error'});
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
        return response.status(404).json({message: 'Crop detail updated successfully'});

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