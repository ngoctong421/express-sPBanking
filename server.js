//Define Dependencies
const http = require('http');
const app = require('./app');

//Define port
const port = process.env.PORT || 8000;

//Create a server
const server = http.createServer(app);

//Listen a port
server.listen(port, () => {
    console.log('Hello! Im a bank server ! Im working on port ' + port);
});
