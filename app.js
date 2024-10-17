import express, { response } from "express"
import { Logger }  from "./src/Utilities/Logger.js"
import cors from "cors"
import MongoConnect from "./src/Configurations/DB_Connection.js"
import "dotenv/config"

import UserRoute from './src/Routes/UserRoute.js'
import Schedule_Router from "./src/Routes/ScheduleRoute.js"
import PamentRoute from './src/Routes/PaymentRoute.js'
import userpay from './src/Routes/UserPayRoute.js'


const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173', 
optionsSuccessStatus: 200} ))

//middleware
app.use(express.json())

app.use((req,res,next) => {
console.log(req.path,req.method)
next()
})  

//routes
app.use('/auth',UserRoute)
app.use('/schedule',Schedule_Router)
app.use('/api/payments', PamentRoute);
app.use('/api/userpay', userpay);



app.listen(PORT , ()=>{
    Logger.info("Connected via Port " + PORT)
    MongoConnect()
})