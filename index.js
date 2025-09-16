import http from 'http';
import { cats } from './src/cats.js';
import fs from 'fs/promises';

let server = http.createServer( async (req, res) => {
    if (req.url == "/") {
        //const catsData = await fs.readFile('src/cats.js', {encoding: "utf-8"});
        const catHtml = await fs.readFile(`views/home/index.html`);
        res.writeHead(200, { "content-type": "text/html" });
        res.write(catHtml);
    }
    else if (req.url == "/content/styles/site.css") {
        const siteCss = await fs.readFile('content/styles/site.css'); 
        res.writeHead(214, { "content-type": "text/css" })
        res.write(siteCss);
    }
    res.end();
});


server.listen(5000);
console.log('Server is listening of port 5000...');
