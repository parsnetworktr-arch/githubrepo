const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
http.createServer((request, response) => {
  const target = request.url === '/' ? 'index.html' : decodeURIComponent(request.url).replace(/^\/+/, '');
  const file = path.join(root, target);
  if (!file.startsWith(root)) { response.writeHead(403); response.end(); return; }
  fs.readFile(file, (error, data) => {
    response.writeHead(error ? 404 : 200, { 'Content-Type': file.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(error ? 'Not found' : data);
  });
}).listen(8002, '127.0.0.1', () => console.log('MultiAI is running on http://127.0.0.1:8002'));
