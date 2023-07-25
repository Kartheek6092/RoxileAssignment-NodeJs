const express = require("express");
const http = require('http');
const json = require('json')


const app = express();
app.use(express.json());

const getData = async () => {
    const url = `https://s3.amazonaws.com/roxiler.com/product_transaction.json`;
    const response = await http.request(url)
    const data = await response.json()
    return data
};

let transactionData = null

const initializingDb = async () => {
    const data = await getData()
    transactionData = data
}

initializingDb()

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/fetch') {
        res.statusCode = 200;
        app.listen(3000, () => {
            console.log("listening on port: 3000",)
        })
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello!');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(3000);

//API 1
app.get("/fetch/:id", async (req, res) => {
    const { month } = request.query;
    const url = `https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${month}`;
    const response = await http.request(url)
    const data = await response.json()
    return res.status(response.statusCode).json({ message:'successfull fetch of transactions for', body: data});


});

module.exports = app;