import apiHnadlerServices from "../services/apiHandlers.services.js"
import { ResponseHandler } from "../utils/response.utility.js";
import { StatusCodeUtility } from "../utils/statuscode.utility.js";

class apiHandlerControllers{



    static async posthandler(request, response, next){
     const {data, file_b64} = request.body
     const processedResponse = await apiHnadlerServices.postService(data, file_b64)



     const userId = `raj_pateriya_${10072001}`;
       const {file_valid,
            file_mime_type,
            file_size_kb
        } = processedResponse.file_processing


     const responseData = {
        is_success: true,
        user_id: userId,
        email: "pateriyaraj@gmail.com",
        roll_number: "0101CS211100",
        numbers: processedResponse.numbers,
        alphabets: processedResponse.alphabets,
        highest_lowercase_alphabet: processedResponse.highest_alphabet,
        is_prime_found: processedResponse.is_prime,
        file_valid,
        file_mime_type,
        file_size_kb
    }
    return ResponseHandler(StatusCodeUtility.Success, responseData, response)
    }


    static async gethandler(request, response, next){
        const responseData = {
            operation_code: 1
        }
        return ResponseHandler(StatusCodeUtility.Success, responseData, response)
    }



}



export default apiHandlerControllers