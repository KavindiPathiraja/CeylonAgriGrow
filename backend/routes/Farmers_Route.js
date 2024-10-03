import express from 'express';
import mongoose from 'mongoose';
import { Farmers } from '../models/Farmers.js';

const router = express.Router();

// Route for saving a new Farmer
router.post('/', async (req, res) => {
    try {
        // Check if the email already exists
        const existingFarmer = await Farmers.findOne({ Email: req.body.Email });
        if (existingFarmer) {
            return res.status(400).send('Already Registered Farmer. Log In');
        }

        const newFarmer = new Farmers({
            FarmerName: req.body.FarmerName,
            ContactNo: req.body.ContactNo,
            Email: req.body.Email,
            Address: req.body.Address,
            Password: req.body.Password,
            image: req.body.image
        });

        const savedFarmer = await newFarmer.save();
        res.status(201).send(savedFarmer);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).send('Duplicate FarmerID. Please try again.');
        }
        res.status(500).send({ message: error.message });
    }
});

// Route for getting all Farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmers.find();
        res.send(farmers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for getting a single Farmer by ID or FarmerID
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        // Check if the identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const farmerByID = await Farmers.findById(identifier);
            if (farmerByID) {
                return res.status(200).json(farmerByID);
            }
        }

        // If not a valid ObjectId, try searching by FarmerID
        const farmerByFarmerID = await Farmers.findOne({ FarmerID: identifier });
        if (farmerByFarmerID) {
            return res.status(200).json(farmerByFarmerID);
        }

        return res.status(404).json({ message: 'Farmer not found' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching Farmer: ' + error.message });
    }
});

// Route for updating a Farmer by ID or FarmerID
router.patch('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        // Check if the identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const farmer = await Farmers.findByIdAndUpdate(identifier, req.body, { new: true });
            if (!farmer) return res.status(404).send('Farmer not found');
            return res.status(200).send(farmer);
        }

        // If not a valid ObjectId, try searching by FarmerID
        const farmerByFarmerID = await Farmers.findOneAndUpdate({ FarmerID: identifier }, req.body, { new: true });
        if (!farmerByFarmerID) return res.status(404).send('Farmer not found');
        return res.status(200).send(farmerByFarmerID);
        
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error updating Farmer: ' + error.message });
    }
});

// Route for deleting a Farmer by ID
router.delete('/:id', async (req, res) => {
    try {
        const farmer = await Farmers.findByIdAndDelete(req.params.id);
        if (!farmer) return res.status(404).send('Farmer not found');
        res.send({ message: 'Farmer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
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
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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
        console.error(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;
