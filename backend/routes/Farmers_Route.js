import express from 'express';
import { Farmers } from '../models/Farmers.js';

const router = express.Router();

// Route for saving a new Farmer
router.post('/', async (req, res) => {
  try {
    const { FarmerName, ContactNo, Email, Address, Password,image } = req.body;

    if (!FarmerName || !ContactNo || !Email || !Address || !Password || !image) {
      return res.status(400).send({
        message: 'Send all required fields: FarmerName, ContactNo, Email, Address, Password',
      });
    }

    const newFarmer = { FarmerName, ContactNo, Email, Address, Password,image };

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
router.get('/:id', async (req, res) => {
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

// Route for updating a Farmer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { FarmerName, ContactNo, Email, Address, Password,image } = req.body;

    if (!FarmerName || !ContactNo || !Email || !Address || !Password || !image) {
      return res.status(400).send({
        message: 'Send all required fields: FarmerName, ContactNo, Email, Address, Password',
      });
    }

    const result = await Farmers.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    return res.status(200).send({ message: 'Farmer updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a Farmer
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

router.post('/Login', async (request, response) => {
    try {
        const { Email, Password } = request.body;
        if (!Email || !Password) {
            return response.status(400).json({ message: 'Email and Password are required' });
        }
        const farmer = await Farmers.findOne({ Email });
        if (!farmer) {
            return response.status(404).json({ message: 'User not found' });
        }
        if (Password !== farmer.Password) {
            return response.status(401).json({ message: 'Incorrect Password' });
        }
        response.status(200).json(farmer);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
