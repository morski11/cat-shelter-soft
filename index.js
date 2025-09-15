import http from 'http';


let server = http.createServer( (req, res) => {
    res.write("asd");
    res.end();
});


server.listen(5000);
console.log('Server is listening of port 5000...');
