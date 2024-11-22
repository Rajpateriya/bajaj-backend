import { CustomError } from "../utils/error.utility.js"
import { StatusCodeUtility } from "../utils/statuscode.utility.js"


class middlewares{
    static async postmiddlware(request, response, next){
        
       const {data, file_b64} = request.body
       if(!data || !file_b64){
         throw new CustomError("Invalid Data",  StatusCodeUtility.BadRequest)
       }
       next()
    }
}


export default middlewares