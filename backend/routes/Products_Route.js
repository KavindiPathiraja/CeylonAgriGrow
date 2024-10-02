import express from 'express';
import { Products } from '../models/Products.js';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google Generative AI
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
const router = express.Router();

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Route for saving a new product
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.ProductName ||
      !request.body.image ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.SellingPrice ||
      !request.body.FarmerName ||
      !request.body.FarmerEmail 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: ProductName, image, Category, Quantity, SellingPrice, FarmerName, FarmerEmail',
      });
    }

    let description;
    
    // Check if the farmer provided a description
    if (request.body.Description) {
      description = request.body.Description; // Use provided description
    } else {
      // Automatically generate the product description using the product name
      const userMessage = `Generate a marketing description for the product named "${request.body.ProductName}".`;
      
      // Start chat session
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      // Send the user input (product name) to the AI model
      const result = await chatSession.sendMessage(userMessage);
      description = result.response.text(); // Use the generated description
    }

    // Create a new product object
    const newProducts = {
      ProductName: request.body.ProductName,
      image: request.body.image,
      Description: description, // Use the determined description
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

// Route for getting all products from the database
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

// Route for getting one product from the database by ID
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

// Route for updating a product
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // Check if any required fields are missing
    if (
      !request.body.ProductName ||
      !request.body.image ||
      !request.body.Category ||
      !request.body.Quantity ||
      !request.body.SellingPrice ||
      !request.body.FarmerName ||
      !request.body.FarmerEmail 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: ProductName, image, Category, Quantity, SellingPrice, FarmerName, FarmerEmail',
      });
    }

    // Retrieve the existing product to check if a description is needed
    const existingProduct = await Products.findById(id);
    if (!existingProduct) {
      return response.status(404).json({ message: 'Product not found' });
    }

    let description;

    // Check if the farmer provided a description
    if (request.body.Description) {
      description = request.body.Description; // Use provided description
    } else {
      // Automatically generate the product description using the product name
      const userMessage = `Generate a marketing description for the product named "${request.body.ProductName}".`;

      // Start chat session
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      // Send the user input (product name) to the AI model
      const result = await chatSession.sendMessage(userMessage);
      description = result.response.text(); // Use the generated description
    }

    // Update the product with the new data, including the determined description
    const updatedProduct = {
      ...existingProduct._doc, // Retain existing data
      ...request.body,
      Description: description, // Use the determined description
    };

    const result = await Products.findByIdAndUpdate(id, updatedProduct, { new: true });

    return response.status(200).send({ message: 'Product updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for deleting a product
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Products.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving products based on search criteria, pagination, and sorting
router.get('/searchProducts', async (req, res) => {
  try {
    const { page = 1, limit = 7, search = '', sort = 'ProductNo' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {
      $or: [
        { ProductNo: { $regex: new RegExp(search, 'i') } },
        { image: { $regex: new RegExp(search, 'i') } },
        { Description: { $regex: new RegExp(search, 'i') } }, 
        { ProductName: { $regex: new RegExp(search, 'i') } },
        { Category: { $regex: new RegExp(search, 'i') } },
        { Quantity: { $regex: new RegExp(search, 'i') } },
        { SellingPrice: { $regex: new RegExp(search, 'i') } },
        { FarmerName: { $regex: new RegExp(search, 'i') } },
        { FarmerEmail: { $regex: new RegExp(search, 'i') } },
      ],
    };

    const products = await Products.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ count: products.length, data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

export default router;
