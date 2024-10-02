// routes/geminiApi.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

// Route for AI disease prediction based on crop name and symptoms
router.post('/', async (req, res) => {
  try {
    const { cropName, symptoms } = req.body;

    // Validate inputs
    if (!cropName || !symptoms) {
      return res.status(400).json({ error: 'Both crop name and symptoms are required.' });
    }

    // Construct the user message combining the crop name and symptoms
    const userMessage = `The crop is ${cropName}, and the symptoms are: ${symptoms}. Can you predict the disease?.Please give me only names of the diseases in  the list manner without details in paragraphs.And provide "Here are some possible diseases based on your description" for every response and add number infront of the relavent disease.Add dot between the number and disease `;

    // Start chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optionally you can manage conversation history
    });

    // Send the user input (crop name and symptoms) to the AI model
    const result = await chatSession.sendMessage(userMessage);

    // Return the AI-generated prediction
    res.status(200).json({ diseasePrediction: result.response.text() });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate disease prediction' });
  }
});
// Function to clean the description from Markdown formatting
const cleanDescription = (text) => {
  return text
    .replace(/##/g, '') // Remove headings
    .replace(/[*_]{1,2}/g, '') // Remove bold/italic markers
    .replace(/(?:\r\n|\r|\n)/g, ' ') // Replace new lines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim(); // Trim leading/trailing whitespace
};

// Route for generating product descriptions using only the product name
router.post('/generate-description', async (req, res) => {
  try {
    const { productName } = req.body;

    // Validate input
    if (!productName) {
      return res.status(400).json({ error: 'Product name is required.' });
    }

    // Construct the user message for product description generation
    const userMessage = `Generate a product description for the product named "${productName}". Please provide a descriptive and engaging text suitable for marketing.`;

    // Start chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optionally you can manage conversation history
    });

    // Send the user input (product name) to the AI model
    const result = await chatSession.sendMessage(userMessage);

    // Clean the generated description
    const cleanedDescription = cleanDescription(result.response.text());

    // Return the AI-generated product description
    res.status(200).json({ productDescription: cleanedDescription });
  } catch (error) {
    console.error('Error generating product description:', error);
    res.status(500).json({ error: 'Failed to generate product description' });
  }
});
// Route for generating product descriptions using only the product name
router.post('/generate-description', async (req, res) => {
  try {
    const { productName } = req.body;

    // Validate input
    if (!productName) {
      return res.status(400).json({ error: 'Product name is required.' });
    }

    // Construct the user message for product description generation
    const userMessage = `Create a simple product description for "${productName}". Keep it concise, easy to read for farmers, and ensure it is strictly 20 words or fewer.`;
    
    // Start chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optionally you can manage conversation history
    });

    // Send the user input (product name) to the AI model
    const result = await chatSession.sendMessage(userMessage);

    // Clean the generated description
    const cleanedDescription = cleanDescription(result.response.text());

    // Return the AI-generated product description
    res.status(200).json({ productDescription: cleanedDescription });
  } catch (error) {
    console.error('Error generating product description:', error);
    res.status(500).json({ error: 'Failed to generate product description' });
  }
});

export default router;
