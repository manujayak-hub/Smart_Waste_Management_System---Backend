import mongoose from "mongoose";
import {Logger} from "../Utilities/Logger.js"
import "dotenv/config"

let MONGO_URL = process.env.MONGO_URL

const MongoConnect = () => {
    mongoose.connect(MONGO_URL)
    .then(()=>{
        Logger.info("DB connected Successfully")
    })
    .catch((err)=>{
        Logger.error(err.message)
    })
} 

export default MongoConnect;