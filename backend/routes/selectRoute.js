// routes/crop.routes.js
import express from 'express';
import Crop from '../models/diseaseModel.js'; // Adjust the path as needed

const router = express.Router();

// Route to get distinct crop types
router.route('/crop-types').get(async (req, res) => {
    try {
        const cropTypes = await Crop.distinct('CropType'); // Fetch distinct crop types
        res.json(cropTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch crop types' });
    }
});

export default router;
