import http from 'http';
import { cats } from './src/cats.js';
import fs from 'fs/promises';

let server = http.createServer(async (req, res) => {
    if (req.url == "/") {
        //const catsData = await fs.readFile('src/cats.js', {encoding: "utf-8"});
        const homeHtml = await homeView();
        res.writeHead(200, { "content-type": "text/html" });
        res.write(homeHtml);
    }
    else if (req.url == "/content/styles/site.css") {
        const siteCss = await fs.readFile('content/styles/site.css');
        res.writeHead(214, { "content-type": "text/css" })
        res.write(siteCss);
    }
    else if (req.url == "/cats/add-breed") {
        const addBreedHtml = await addBreedView();
        res.writeHead(200, { "content-type": "text/html" });
        res.write(addBreedHtml);
    }
    res.end();
});


async function homeView() {
    const html = await fs.readFile(`views/home/index.html`, { encoding: "utf-8" });
    return html;
}

async function addBreedView() {
    const html = await fs.readFile(`views/addBreed.html`, { encoding: "utf-8" });
    return html;
}


server.listen(5000);
console.log('Server is listening of port 5000...');
