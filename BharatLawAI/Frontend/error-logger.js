const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/log-error') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.appendFileSync('console-errors.log', body + '\n');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Error logged');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3001, () => {
  console.log('Error logger server running on port 3001');
});