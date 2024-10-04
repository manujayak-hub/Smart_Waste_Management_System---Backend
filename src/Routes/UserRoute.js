import express from 'express'

import UserController from '../Controllers/UserController.js'

const UserRoute = express.Router()

// login route
UserRoute.post('/login', UserController.loginUser)

// signup route
UserRoute.post('/signup', UserController.signupUser)

// In your routes
UserRoute.post('/logout', UserController.logoutUser);


export default  UserRoute;