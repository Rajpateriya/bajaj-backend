import dotenv from "dotenv"
dotenv.config()




 const corsOptions = {
    origin : "*",
}








 const envProvider = {
    DBURI : process.env.DB_URI,
    PORT : process.env.PORT,

}


export {corsOptions, envProvider}





