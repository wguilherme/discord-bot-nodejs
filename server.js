const http = require('http');
const ngrok = require('ngrok');

const port = 8080;
const server = http.createServer((req, res) => {
    res.end('Hello, World!');
});

server.listen(port, async (err) => {
    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${port}`);

    const url = await ngrok.connect(port);

    console.log('pass',url)
});
