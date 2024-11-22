import express, { urlencoded } from "express";
import cors from "cors";
import { errorHandler } from "./utils/error.utility.js";
import { corsOptions } from "./constants.js";
import mainRouter from "./routes/route.js";




const app = express()



app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true}))
app.use(cors(corsOptions))




app.use("/", mainRouter)



// for middleware error handling
app.use(errorHandler);



export {app}