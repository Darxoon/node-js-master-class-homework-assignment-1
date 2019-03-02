"use strict";
/*
* Name: index.js
* Description: Entry file for application
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies 
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const string_decoder_1 = require("string_decoder");
const router_1 = require("./routing/router");
const handlers_1 = require("./routing/handlers");
const handlerData_1 = __importDefault(require("./routing/handlerData"));
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
// Instantiate the HTTP server
const httpServer = http_1.default.createServer((req, res) => {
    unifiedServer(req, res);
});
// Start the server
httpServer.listen(config_1.default.httpPort, () => {
    console.log('The HTTP server ist listening on port ', config_1.default.httpPort, ' in ', config_1.default.envName, ' mode now.');
});
// Instantiate the HTTPS server
const httpsServerOptions = {
    key: fs_1.default.readFileSync(__dirname + '/https/key.pem'),
    cert: fs_1.default.readFileSync(__dirname + '/https/cert.pem')
};
console.log(httpsServerOptions.key);
const httpsServer = https_1.default.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res);
});
// Start the server
httpsServer.listen(config_1.default.httpsPort, () => {
    console.log('The HTTPS server ist listening on port ', config_1.default.httpsPort, ' in ', config_1.default.envName, ' mode now.');
});
// All the server logic for both of the http and https server
let unifiedServer = (req, res) => {
    // Get the URL and parse it 
    let parsedUrl = url_1.default.parse(req.url || '', true);
    // Get the path from the URL 
    let path = parsedUrl.pathname || '';
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get the query string as an object 
    let queryStringObject = parsedUrl.query;
    // Get the HTTP method
    let method = (req.method || '').toLowerCase();
    // Get the headers as an object 
    let header = req.headers;
    // Get the payload, if any
    let decoder = new string_decoder_1.StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        // Choose the handler this request should go to. If not found, use the 404 not found handler
        let chosenHandler = router_1.router[trimmedPath] || handlers_1.handlers.notFound;
        // Construct the data object to send to the handler 
        let data = new handlerData_1.default(trimmedPath, queryStringObject, method, header, buffer);
        // Route the request to the handler specified in the router 
        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200 
            statusCode = statusCode || 200;
            // Use the payload called back by the handler, or default to an empty object 
            payload = payload || {};
            // Convert the payload into a string 
            let payloadString = JSON.stringify(payload);
            // Send the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            // Log the request path
            console.log('Request revieved on path: ', trimmedPath);
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
};
