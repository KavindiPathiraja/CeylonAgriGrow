import express from 'express';
import { Products } from '../models/Products.js';

const router = express.Router();

// Route for Save a new Products
router.post('/', async (request, response) => {
  try {
    if (
      
      !request.body.ProductName ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.SellingPrice ||
      !request.body.FarmerName ||
      !request.body.FarmerEmail

    ) {
      return response.status(400).send({
        message: 'Send all required fields:  ProductName, Category, Quantity, SellingPrice, FarmerName, FarmerEmail',
      });
    }
    const newProducts = {
      
      ProductName: request.body.ProductName,
      Category: request.body.Category,
      Quantity: request.body.Quantity,
      SellingPrice: request.body.SellingPrice,
      FarmerName: request.body.FarmerName,
      FarmerEmail: request.body.FarmerEmail,
    };

    const products = await Products.create(newProducts);

    return response.status(201).send(products);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Products from database
router.get('/', async (request, response) => {
  try {
    const products = await Products.find({});
    
    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get One Products from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const products = await Products.findById(id);

    return response.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an Products
router.put('/:id', async (request, response) => {
  try {
    if (
      
      !request.body.ProductName ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.SellingPrice ||
      !request.body.FarmerName ||
      !request.body.FarmerEmail 

    ) {
      return response.status(400).send({
        message: 'Send all required fields: ProductNo, ProductName, Category, Quantity, SellingPrice, FarmerName, FarmerEmail',
      });
    }

    const { id } = request.params;

    const result = await Products.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Products not found' });
    }

    return response.status(200).send({ message: 'Products updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an Products
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Products.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Products not found' });
    }

    return response.status(200).send({ message: 'Products deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving Products based on search criteria, pagination, and sorting
router.get("/searchProducts", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 7, search = "", sort = "ProductNo" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { ProductNo: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { ProductName: { $regex: new RegExp(search, 'i') } },
        { Category: { $regex: new RegExp(search, 'i') } },
        { Quantity: { $regex: new RegExp(search, 'i') } },
        { SellingPrice: { $regex: new RegExp(search, 'i') } },
        { FarmerName: { $regex: new RegExp(search, 'i') } },
        { FarmerEmail: { $regex: new RegExp(search, 'i') } },
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const products = await Products.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: products.length, data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


export default router;