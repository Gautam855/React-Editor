const multer = require('multer');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { generateReactProject } = require('./generateProject.js');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/public/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, 'copy.png'); // Save all uploaded files as copy.png
    }
});
const upload = multer({ storage: storage });

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // React frontend
}));
app.use(bodyParser.json());

// Function to clean output directory
function cleanOutputDirectory(outputDir) {
    try {
        fs.rmSync(outputDir, { recursive: true, force: true });
        console.log('Output directory cleaned successfully.');
    } catch (err) {
        console.error('Error cleaning output directory:', err);
    }
}

// Endpoint to generate the project
app.post('/generate-project', upload.single('imageFile'), (req, res) => {
    const userData = {
        name: req.body.name,
        description: req.body.description,
        navItems: JSON.parse(req.body.navItems),
        imageFile: req.file // This will contain information about the uploaded file
    };

    // Update the output path to point to a specific zip file
const outputPath = path.join(__dirname, 'output', 'react-project.zip');


    // Log file information for debugging
    if (req.file) {
        console.log('Uploaded file:', req.file);
    } else {
        console.error('No file uploaded');
        return res.status(400).send('No file uploaded');
    }

    // Clean the output directory
    cleanOutputDirectory(outputPath);

    // Proceed with project generation

    generateReactProject(userData, outputPath, res);
});

// Serve the output folder for direct access
app.use('/output', express.static(path.join(__dirname, 'output')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
