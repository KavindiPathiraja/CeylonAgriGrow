import express from "express";
import cors from "cors";

import {
    AddNewCrop,
    UpdateCrop,
    DeleteCrop,
    getAllCrops,
    getSingleCrops
} from "../controllers/cropController.js";

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.post("/addCrop", AddNewCrop);
router.get("/myCrops", getAllCrops);
router.get("/myCrop/:id", getSingleCrops);
router.put("/crop/update/:id", UpdateCrop)
router.delete("/crop/delete/:id", DeleteCrop);

export default router;
