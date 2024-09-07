import express from 'express';
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import diseaseRouter from './routes/diseaseRoute.js';
import path from 'path';
import cropRoutes from './routes/selectRoute.js'

// Importing routes
import Products_Route from './routes/Products_Route.js';



// Creating an instance of the Express application
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Using routes for endpoints
app.use('/products', Products_Route);




// Connecting to the MongoDB database
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/diseases', diseaseRouter);
app.use('/images', express.static(path.join('images')));
app.use('/api', cropRoutes);
