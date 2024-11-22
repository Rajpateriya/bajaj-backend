class dataprocessing {

    static async getAllAlphabates(alpgabates){
        const highestLowercase = await alpgabates
        .filter((ch) => /^[a-z]$/.test(ch))
        .sort()
        .pop() || null;

        return highestLowercase
    }


    static async getIsPrime(numberList){
        const hasPrime =  numberList.some((num) => this.isPrime(num));
        return hasPrime
    }


    static isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    static async fileHandler(file_b64){
        let fileDetails = {
            file_valid: false,
            file_mime_type: null,
            file_size_kb: null,
        };

        if (file_b64) {
                const base64Regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,(.+)$/;
                const matches = file_b64.match(base64Regex);

                if (!matches) {
                   return fileDetails;
                }

                const mimeType = matches[1];
                const base64Data = matches[2];
                const buffer = Buffer.from(base64Data, 'base64');

                // Validate MIME type and size
                fileDetails = {
                    file_valid: true,
                    file_mime_type: mimeType,
                    file_size_kb: (buffer.length / 1024).toFixed(2), // Size in KB
                };
                return fileDetails;

           
        }

        return fileDetails
        
};

}

export default dataprocessing
