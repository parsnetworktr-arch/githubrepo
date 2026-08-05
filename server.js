const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 10000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

http.createServer((request, response) => {
  const target = request.url === '/' ? 'index.html' : decodeURIComponent(request.url).replace(/^\/+/, '');
  const file = path.join(root, target);

  if (!file.startsWith(root)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    } else {
      const ext = path.extname(file).toLowerCase();
      const contentType = mimeTypes[ext] || 'text/plain; charset=utf-8';
      response.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      response.end(data);
    }
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`MultiAI web server is running on port ${PORT}`);
});
