const  http = require('http');

const server = http.createServer((req, res) =>{
    res.writeHead(200, { 'content-type': 'text/plain'});

    if(req.url === '/') {
        res.end('WELCOME TO HOME PAGE');
    }
    else if(req.url === '/contact'){
        res.end('THIS IS CONATCT PAGE');
    }
    else{
        res.end('404 PAGE NOT FOUND');
    }
});

server.listen(3101,() =>{
    console.log("Server running at http://localhost:3101");
})