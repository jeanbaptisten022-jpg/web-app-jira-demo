const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage Route
app.get('/', (req, res) => {
    res.send('Welcome to the Web App Demo — Home Page');
});

// About Route
app.get('/about', (req, res) => {
    res.send('About Page: This is a demo application using Express.js.');
});

// API Example Route
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the Express API' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

