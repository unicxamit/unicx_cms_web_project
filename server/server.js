const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();


// Middleware
app.use(cors({
    origin: 'https://unicx.in' // Replace with your actual frontend domain
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


// File upload middleware (Applied only once here)
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Increased to 50MB for potential large images/content
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true // Enable debugging
}));

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const sectionsDir = path.join(uploadsDir, 'sections');
const caseStudiesDir = path.join(uploadsDir, 'case_studies'); // Ensure case studies directory is also created here

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

if (!fs.existsSync(sectionsDir)) {
  fs.mkdirSync(sectionsDir, { recursive: true });
  console.log('Created sections directory');
}

if (!fs.existsSync(caseStudiesDir)) { // Ensure this directory exists
  fs.mkdirSync(caseStudiesDir, { recursive: true });
  console.log('Created case_studies directory');
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route for server health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Add a dedicated endpoint for file uploads
app.post('/upload-section-image', (req, res) => {
  console.log('Received upload request');
  console.log('Files in request:', req.files);
  
  // Check if file exists in the request
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.image;
  console.log('File info:', { name: file.name, size: file.size, mimetype: file.mimetype });
  
  // Generate unique filename
  const filename = `section_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const filepath = path.join(sectionsDir, filename);
  
  console.log('Saving file to:', filepath);
  
  file.mv(filepath, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }
    
    const relativePath = `/uploads/sections/${filename}`;
    console.log('File saved successfully. Path:', relativePath);
    
    res.status(200).json({
      filename,
      path: relativePath
    });
  });
});

const db = require("../server/database"); // Assuming '../server/database' correctly initializes your DB connection
require('../server/db')(app, db); // This is where db.js routes are mounted

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
