import http from 'http';
import { arr } from './src/cats.js';
import fs from 'fs/promises';

let server = http.createServer(async (req, res) => {
    if (req.method == 'POST') {
        let body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const params = new URLSearchParams(body);
            const cat = Object.fromEntries(params.entries());
            arr.push(cat);
            res.writeHead(302, { "location": "/" });

            res.end();
        })
        return;
    }
    if (req.url == "/") {
        const homeHtml = await homeView();
        const cats = arr.map(c => catTemplate(c)).join("\n");
        res.writeHead(200, { "content-type": "text/html" });
        res.write(homeHtml.replace("{{kotki}}", cats));
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
    else if (req.url == "/cats/add-cat") {
        const httmlAddCat = await addCatView();
        res.writeHead(200, { "content-type": "text/html" });
        res.write(httmlAddCat);
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

async function addCatView() {
    const html = await fs.readFile(`views/addCat.html`, { encoding: "utf-8" });
    return html;
}


function catTemplate(cat) {
    return `
    <li>
                    <img src="${cat.imageUrl}" alt="Black Cat">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}.</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="">Change Info</a></li>
                        <li class="btn delete"><a href="">New Home</a></li>
                    </ul>
                </li>
                `
}

server.listen(5000);
console.log('Server is listening of port 5000...');
