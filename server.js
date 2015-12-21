const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const hostname = '127.0.0.1';
const port = 1337;

// Connection URL
var url = 'mongodb://ds061454.mongolab.com:61454/mdb01';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    say();
    db.close();
});

function say() {
    console.log('Lolo');
}

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});