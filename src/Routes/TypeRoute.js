import express from 'express';
import TypeController from '../Controllers/TypeController.js'; 

const Type_Router = express.Router();

// Get all types
Type_Router.get('/view', TypeController.getAllType);

// Create a new type
Type_Router.post('/create', TypeController.createType);


export default Type_Router;
