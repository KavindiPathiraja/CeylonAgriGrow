import express from 'express';
import { Purchase } from '../models/Purchase.js';

const router = express.Router();

// Route for creating a new Purchase
router.post('/', async (request, response) => {
  try {
    const { ProductNo, ProductName, Quantity, SellingPrice, TotalPrice, FarmerEmail } = request.body;

    // Validating required fields
    if (!ProductNo || !ProductName || !Quantity || !SellingPrice || !TotalPrice || !FarmerEmail) {
      return response.status(400).send({
        message: 'Please send all required fields: ProductNo, ProductName, Quantity, SellingPrice, TotalPrice, FarmerEmail',
      });
    }

    // Creating the new purchase object
    const newPurchase = {
      ProductNo,
      ProductName,
      Quantity,
      SellingPrice,
      TotalPrice,
      FarmerEmail,
    };

    const purchase = await Purchase.create(newPurchase);

    return response.status(201).send(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all purchases
router.get('/', async (request, response) => {
  try {
    const purchases = await Purchase.find({});

    return response.status(200).json({
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting a specific purchase by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const purchase = await Purchase.findById(id);

    if (!purchase) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).json(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a purchase
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { ProductNo, ProductName, Quantity, SellingPrice, TotalPrice, FarmerEmail } = request.body;

    // Validating required fields
    if (!ProductNo || !ProductName || !Quantity || !SellingPrice || !TotalPrice || !FarmerEmail) {
      return response.status(400).send({
        message: 'Please send all required fields: ProductNo, ProductName, Quantity, SellingPrice, TotalPrice, FarmerEmail',
      });
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedPurchase) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send(updatedPurchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a purchase
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletedPurchase = await Purchase.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving Purchases based on search criteria, pagination, and sorting
router.get('/searchPurchases', async (req, res) => {
  try {
    const { page = 1, limit = 7, search = "", sort = "PurchaseNo" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { PurchaseNo: { $regex: new RegExp(search, 'i') } },
        { ProductNo: { $regex: new RegExp(search, 'i') } },
        { ProductName: { $regex: new RegExp(search, 'i') } },
        { Quantity: { $regex: new RegExp(search, 'i') } },
        { SellingPrice: { $regex: new RegExp(search, 'i') } },
        { TotalPrice: { $regex: new RegExp(search, 'i') } },
        { FarmerEmail: { $regex: new RegExp(search, 'i') } },
      ],
    };

    const purchases = await Purchase.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ count: purchases.length, data: purchases });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

export default router;
