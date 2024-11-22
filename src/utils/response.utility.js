import { StatusCodeUtility } from "./statuscode.utility.js"

export const ResponseHandler = (statusCode = StatusCodeUtility.Success, data = null, response) =>{

  return response.status(statusCode).json(data)
}