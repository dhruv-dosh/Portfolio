require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'package'))); // Serving static files from the package folder

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Path to your index.html file
});

// Handle form POST request
app.post('/contact', (req, res) => {
    const { name, email, subject, description } = req.body;

    // Validate input fields
    if (!name || !email || !subject || !description) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Respond back to the frontend (no email sending here)
    return res.status(200).json({ message: 'Form data received, proceed with EmailJS' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
