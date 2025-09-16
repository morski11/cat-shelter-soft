import http from 'http';
import { catsHtml } from './src/cats.js'

let server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(catsHtml);
    }
    res.end();
});


server.listen(5000);
console.log('Server is listening of port 5000...');
