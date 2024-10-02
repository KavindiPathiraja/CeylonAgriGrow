import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import DiseaseController from '../controllers/diseaseController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('photo'), DiseaseController.addDisease);
//router.route('/all').get(DiseaseController.getAllDiseases);
router.route('/:id').get(DiseaseController.getDiseaseById);
router.route('/:id').delete(DiseaseController.deleteDisease);
router.route('/:id').put(upload.single('photo'), DiseaseController.updateDisease);
router.put('/:id', upload.single('photo'), DiseaseController.updateDisease);
router.route('/crop/:cropType').get(DiseaseController.getDiseasesByCropType);


export default router;
