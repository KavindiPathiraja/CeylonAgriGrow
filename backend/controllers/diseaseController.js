import fs from 'fs';
import path from 'path';
import Disease from '../models/diseaseModel.js'; // Assuming 'User' is a misnamed 'Disease' model

// Add a new disease
const addDisease = async (req, res) => {
    try {
        const { DiseaseName,Type, CropType, Information, Remedy } = req.body;
        const photo = req.file.filename;

        const newDisease = new Disease({
            DiseaseName,
            Type,
            CropType,
            photo,
            Information,
            Remedy
        });

        await newDisease.save();
        res.json('Disease Added');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

// Get all diseases
const getAllDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find();
        if (!diseases.length) {
            return res.status(404).json('No diseases found');
        }

        const diseasesWithImageUrls = diseases.map(disease => ({
            ...disease.toObject(),
            photo: disease.photo ? `http://localhost:5556/images/${disease.photo}` : null
        }));

        res.json(diseasesWithImageUrls);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

// Get a disease by ID
const getDiseaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const disease = await Disease.findById(id);
        if (!disease) {
            return res.status(404).json('Disease not found');
        }

        const diseaseWithImageUrl = {
            ...disease.toObject(),
            photo: disease.photo ? `http://localhost:5556/images/${disease.photo}` : null
        };

        res.json(diseaseWithImageUrl);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

// Delete a disease by ID
const deleteDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDisease = await Disease.findByIdAndDelete(id);

        if (!deletedDisease) {
            return res.status(404).json('Disease not found');
        }

        if (deletedDisease.photo) {
            const imagePath = path.join(__dirname, '..', 'images', deletedDisease.photo);
            fs.unlink(imagePath, err => {
                if (err) console.error('Error deleting image file:', err);
            });
        }

        res.json('Disease deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

// Update a disease by ID

// Update a disease by ID
const updateDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const { DiseaseName, CropType, Information, Remedy, Type } = req.body;
        const photo = req.file ? req.file.filename : null; // Ensure multer is capturing the file

        const disease = await Disease.findById(id);
        if (!disease) {
            return res.status(404).json('Disease not found');
        }

        // Updating fields
        if (DiseaseName) disease.DiseaseName = DiseaseName;
        if (Type) disease.Type = Type;
        if (CropType) disease.CropType = CropType;
        if (Information) disease.Information = Information;
        if (Remedy) disease.Remedy = Remedy;

        // Handle the photo update
        if (photo) {
            // Remove the old photo
            if (disease.photo) {
                const oldImagePath = path.join(__dirname, '..', 'images', disease.photo);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                } else {
                    console.warn('Old image file not found:', oldImagePath);
                }
            }
            disease.photo = photo;
        }

        await disease.save();
        res.json('Disease updated successfully');
    } catch (err) {
        console.error('Error updating disease:', err);
        res.status(400).json('Error: ' + err.message);
    }
};

export default {
    addDisease,
    getAllDiseases,
    getDiseaseById,
    deleteDisease,
    updateDisease
}