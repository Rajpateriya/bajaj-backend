import dataprocessing from "./dataprocessing.services.js";

class apiHnadlerServices{



    static async postService(data, file_b64){
        const numbers = data.filter((item) => !isNaN(item)).map(Number);
        const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
        const highestLowerCase = await dataprocessing.getAllAlphabates(alphabets)
        const isPrime = await dataprocessing.getIsPrime(numbers)
        const fileProcessing = await dataprocessing.fileHandler(file_b64)


        return {
            numbers,
            alphabets,
            highest_alphabet: highestLowerCase,
            is_prime: isPrime,
            file_processing: fileProcessing
        }
    }

}


export default apiHnadlerServices