import http from 'http';
import { catsHtml } from './src/cats.js'
import { css } from './src/siteCss.js';

let server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(catsHtml);
    }
    else if (req.url == "/content/styles/site.css") {
        res.writeHead(214, { "content-type": "text/css" })
        res.write(css);
    }
    res.end();
});


server.listen(5000);
console.log('Server is listening of port 5000...');
