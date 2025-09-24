import cors from "cors"
import "dotenv/config"
import express, { response } from "express"
import FeedbackRouter from "./src/Routes/FeedbackRouter.js"
import { Logger }  from "./src/Utilities/Logger.js"
import MongoConnect from "./src/Configurations/DB_Connection.js"
import PamentRoute from './src/Routes/PaymentRoute.js'
import ReportRouter from "./src/Routes/ReportRoute.js"; 
import ScheduleRouter from "./src/Routes/ScheduleRoute.js"
import Type_Router from "./src/Routes/TypeRoute.js"
import userpay from './src/Routes/UserPayRoute.js'
import UserRoute from './src/Routes/UserRoute.js'
import WasteCollect_Router from "./src/Routes/WasteCollectRoute.js"
import { wasteLimiter } from "./src/Middleware/rateLimiter.js";


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

app.use('/schedule',ScheduleRouter);

app.use('/api/payments', PamentRoute);
app.use('/api/userpay', userpay);




app.use('/feedback', FeedbackRouter);
app.use('/reports', ReportRouter);

// Waste Collection route with rate limiter
app.use('/WasteCollection', wasteLimiter, WasteCollect_Router);
app.use('/type',Type_Router)


app.listen(PORT , ()=>{
    Logger.info("Connected via Port " + PORT)
    MongoConnect()
})


export default app; 