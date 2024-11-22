import { StatusCodeUtility } from "./statuscode.utility.js"

export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statuscode = statusCode
    }
}



export const errorHandler = (error, request, response, next) =>{
    console.log(error)
    const message = error?.message || "Internal Server Error" ;
    const statusCode = error?.statuscode || StatusCodeUtility.InternalServerError

    return response.status(statusCode).json({
        message,
    })

}