const http = require('http');
const path = require('path');
const fs = require('fs');

// Create HTTP server
const server = http.createServer((req, res) => {

    // Home route
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Welcome to Web App Demo');
        return;
    }

    // Serve static files from /public
    const filePath = path.join(__dirname, 'public', req.url);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();

        const mimeTypes = {
            '.html': 'text/html',
            '.css':  'text/css',
            '.js':   'application/javascript',
            '.png':  'image/png',
            '.jpg':  'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif':  'image/gif'
        };

        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    // 404 handler
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

