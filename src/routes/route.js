import apiHandlerControllers from "../controllers/apihandlers.controller.js";
import express from "express";
import asyncHandler from "../utils/asyncHandler.utility.js";
import middlewares from "../middlewares/apihandlers.middlewares.js";

const mainRouter  = express()
apiHandlerControllers


mainRouter.post("/bfhl", asyncHandler(middlewares.postmiddlware),  asyncHandler(apiHandlerControllers.posthandler))

mainRouter.get("/bfhl", asyncHandler(apiHandlerControllers.gethandler))



export default mainRouter