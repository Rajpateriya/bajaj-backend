const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fileType = require('file-type');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Helper function to process file
const processFile = async (file) => {
    try {
        if (!file || !file.buffer) {
            return { 
                valid: false,
                error: "No file provided" 
            };
        }

        // Get file type using file-type package
        const fileInfo = await fileType.fromBuffer(file.buffer);
        
        // Get file extension from original name if file-type fails
        const originalExtension = path.extname(file.originalname).toLowerCase();
        
        // Handle text-based files that file-type might not detect
        const textBasedExtensions = new Set(['.txt', '.js', '.html', '.css', '.json']);
        const isTextBased = textBasedExtensions.has(originalExtension);

        let mimeType;
        if (fileInfo) {
            mimeType = fileInfo.mime;
        } else if (isTextBased) {
            // Map common text-based extensions to MIME types
            const mimeTypes = {
                '.txt': 'text/plain',
                '.js': 'application/javascript',
                '.html': 'text/html',
                '.css': 'text/css',
                '.json': 'application/json'
            };
            mimeType = mimeTypes[originalExtension] || 'text/plain';
        } else {
            return { valid: false, error: "Unknown file type" };
        }

        return {
            valid: true,
            mimeType: mimeType,
            sizeKb: Math.ceil(file.buffer.length / 1024).toString(),
            originalName: file.originalname
        };
    } catch (error) {
        console.error('File processing error:', error);
        return { 
            valid: false,
            error: "File processing failed" 
        };
    }
};

// Middleware to validate headers
const validateHeaders = (req, res, next) => {
    req.user_id = req.headers["user_id"] || "unknown_user";
    req.email = req.headers["email"] || "unknown_email";
    req.roll_number = req.headers["roll_number"] || "unknown_roll_number";
    req.filename = req.headers["filename"] || "unknown_file";
    next();
};

// Process array data
const processArrayData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highest_lowercase = "";
    let prime_found = false;

    // Process input data
    for (const item of data) {
        if (!isNaN(item)) {
            numbers.push(item);
            if (isPrime(Number(item))) {
                prime_found = true;
            }
        } else if (item.length === 1 && isNaN(item)) {
            alphabets.push(item);
            if (item >= "a" && item <= "z" && (!highest_lowercase || item > highest_lowercase)) {
                highest_lowercase = item;
            }
        }
    }

    return {
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : [],
        is_prime_found: prime_found
    };
};

// GET endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST endpoint with file upload and data processing
app.post("/bfhl", validateHeaders, upload.single('file'), async (req, res) => {
    try {
        let fileInfo = { valid: false };
        const data = req.body.data ? (Array.isArray(req.body.data) ? req.body.data : JSON.parse(req.body.data)) : [];

        // Process file (either from multer or base64)
        if (req.file) {
            // Process uploaded file
            fileInfo = await processFile(req.file);
        } else if (req.body.file_b64) {
            // Process base64 file
            try {
                const buffer = Buffer.from(req.body.file_b64, "base64");
                const tempFile = {
                    buffer: buffer,
                    originalname: req.filename || 'uploaded_file'
                };
                fileInfo = await processFile(tempFile);
            } catch (error) {
                console.error('Base64 processing error:', error);
                fileInfo = { valid: false, error: "Invalid base64 data" };
            }
        }

        // Process array data
        const arrayResults = processArrayData(data);

        // Construct response
        const response = {
            is_success: true,
            user_id: req.user_id,
            email: req.email,
            roll_number: req.roll_number,
            ...arrayResults,
            file_valid: fileInfo.valid
        };

        // Add file information if file was valid
        if (fileInfo.valid) {
            response.file_mime_type = fileInfo.mimeType;
            response.file_size_kb = fileInfo.sizeKb;
            response.filename = fileInfo.originalName;
        }

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});