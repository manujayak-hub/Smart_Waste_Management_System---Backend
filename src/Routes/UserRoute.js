import express from 'express'

import UserController from '../Controllers/UserController.js'
import requireAuth from '../Middleware/UserAuth.js'
const UserRoute = express.Router()

// login route
UserRoute.post('/login', UserController.loginUser)

// signup route
UserRoute.post('/signup', UserController.signupUser)

// In your routes
UserRoute.post('/logout', UserController.logoutUser);

// Get user details (protected)
UserRoute.get('/me', requireAuth, UserController.getUserDetails);

UserRoute.get('/getAll', UserController.getAllUsers); 
export default  UserRoute;