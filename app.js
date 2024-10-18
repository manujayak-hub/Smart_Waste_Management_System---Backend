import express, { response } from "express"
import { Logger }  from "./src/Utilities/Logger.js"
import cors from "cors"
import MongoConnect from "./src/Configurations/DB_Connection.js"
import "dotenv/config"

import UserRoute from './src/Routes/UserRoute.js'

import ScheduleRouter from "./src/Routes/ScheduleRoute.js"
import PamentRoute from './src/Routes/PaymentRoute.js'
import userpay from './src/Routes/UserPayRoute.js'


import ScheduleRouter from "./src/Routes/ScheduleRoute.js"
import PamentRoute from './src/Routes/PaymentRoute.js'
import userpay from './src/Routes/UserPayRoute.js'


import FeedbackRouter from "./src/Routes/FeedbackRouter.js"
import ReportRouter from "./src/Routes/ReportRoute.js"; 

import WasteCollect_Router from "./src/Routes/WasteCollectRoute.js"

import Type_Router from "./src/Routes/TypeRoute.js"

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

app.use('/schedule',ScheduleRouter)

app.use('/api/payments', PamentRoute);
app.use('/api/userpay', userpay);




app.use('/feedback', FeedbackRouter);
app.use('/reports', ReportRouter);

app.use('/WasteCollection',WasteCollect_Router)
app.use('/type',Type_Router)


app.listen(PORT , ()=>{
    Logger.info("Connected via Port " + PORT)
    MongoConnect()
})


export default app; 