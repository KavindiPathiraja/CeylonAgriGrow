import express from 'express';
import mongoose from 'mongoose'; 
import { Farmers } from '../models/Farmers.js';

const router = express.Router();

// Route for saving a new Farmer
router.post('/', async (req, res) => {
  try {
    const { FarmerName, ContactNo, Email, Address, Password, image } = req.body;

    if (!FarmerName || !ContactNo || !Email || !Address || !Password || !image) {
      return res.status(400).send({
        message: 'Send all required fields: FarmerName, ContactNo, Email, Address, Password, image',
      });
    }

    const newFarmer = { FarmerName, ContactNo, Email, Address, Password, image };
    const farmer = await Farmers.create(newFarmer);

    return res.status(201).send(farmer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all Farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await Farmers.find({});
    return res.status(200).json({
      count: farmers.length,
      data: farmers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting a single Farmer by ID
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const farmer = await Farmers.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    return res.status(200).json(farmer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting a Farmer by Email
router.get('/email/:Email', async (req, res) => {
  try {
    const { Email } = req.params;

    const farmer = await Farmers.findOne({ Email });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    return res.status(200).json(farmer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a Farmer by ID or FarmerID
router.patch('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let farmer;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      farmer = await Farmers.findByIdAndUpdate(identifier, req.body, { new: true });
    } else {
      farmer = await Farmers.findOneAndUpdate({ FarmerID: identifier }, req.body, { new: true });
    }

    if (!farmer) return res.status(404).send('Farmer not found');
    return res.status(200).send(farmer);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error updating farmer: ' + error.message });
  }
});

// Route for deleting a Farmer by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Farmers.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    return res.status(200).send({ message: 'Farmer deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Farmer login
router.post('/login', async (req, res) => {
  try {
    const { FarmerID, Password } = req.body;

    if (!FarmerID || !Password) {
      return res.status(400).json({ message: 'FarmerID and Password are required' });
    }

    const farmer = await Farmers.findOne({ FarmerID });
    if (!farmer) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (Password !== farmer.Password) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }

    res.status(200).json(farmer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for getting a single Farmer by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Farmer ID' });
        }

        const farmer = await Farmers.findById(id);
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        return res.status(200).json(farmer);
    } catch (error) {
        console.log("Error fetching farmer by ID:", error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get('/:identifier', async (request, response) => {
  try {
      // Extracting the identifier from the request parameters
      const { identifier } = request.params;

      // Checking if the provided identifier is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(identifier)) {
          // Fetching a farmer from the database based on the ID
          const FarmerID = await Farmers.findById(identifier);
          if (FarmerID) {
              // Sending the fetched farmer as a JSON response if found by ID
              return response.status(200).json(FarmerID);
          }
      }

      // If the provided identifier is not a valid ObjectId, try searching by register number
      const farmerByFarmerID = await Farmers.findOne({ FarmerID: identifier });
      if (farmerByFarmerID) {
          // Sending the fetched farmer as a JSON response if found by  number
          return response.status(200).json(farmerByFarmerID);
      }

      // If no farmer found by either ID or  number, send a 404 Not Found response
      return response.status(404).json({ message: 'farmer not found' });
  } catch (error) {
      // Handling errors and sending an error response with detailed error message
      console.error(error);
      response.status(500).send({ message: 'Error fetching farmer: ' + error.message });
  }
});

export default router;
