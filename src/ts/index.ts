/* 
* Name: index.js
* Description: Entry file for application
* 
*/

// Dependencies 

import http, { IncomingMessage, ServerResponse, IncomingHttpHeaders } from 'http';
import https from 'https';
import url, { UrlWithParsedQuery } from 'url';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';
import { router } from './routing/router';
import { handlers } from './routing/handlers';
import { ParsedUrlQuery } from 'querystring';
import HandlerData from './routing/handlerData';
import { Handler } from './routing/handlerType';
import config from './config';
import fs from 'fs';


// Instantiate the HTTP server
const httpServer: http.Server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
    unifiedServer(req, res);
});
// Start the server
httpServer.listen(config.httpPort, () => {
    console.log('The HTTP server ist listening on port ', config.httpPort, ' in ', config.envName, ' mode now.');
});


// Instantiate the HTTPS server
const httpsServerOptions = {
    key: fs.readFileSync(__dirname + '/https/key.pem'), 
    cert: fs.readFileSync(__dirname + '/https/cert.pem')
};
console.log(httpsServerOptions.key);
const httpsServer: https.Server = https.createServer(httpsServerOptions, (req: IncomingMessage, res: ServerResponse): void => {
    unifiedServer(req, res);
});
// Start the server
httpsServer.listen(config.httpsPort, () => {
    console.log('The HTTPS server ist listening on port ', config.httpsPort, ' in ', config.envName, ' mode now.');
});
// All the server logic for both of the http and https server

let unifiedServer = (req: IncomingMessage, res: ServerResponse) => {
    // Get the URL and parse it 

    let parsedUrl: UrlWithParsedQuery = url.parse(req.url || '', true);

    // Get the path from the URL 

    let path: string = parsedUrl.pathname || '';
    let trimmedPath: string = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object 

    let queryStringObject: ParsedUrlQuery = parsedUrl.query;

    // Get the HTTP method

    let method: string = (req.method||'').toLowerCase();

    // Get the headers as an object 

    let header: IncomingHttpHeaders = req.headers;

    // Get the payload, if any

    let decoder: NodeStringDecoder = new StringDecoder('utf-8');
    let buffer: string = '';
    req.on('data', (data: any) => {
        buffer += decoder.write(data);
    });
    req.on('end', (): void => {
        buffer += decoder.end();

        // Choose the handler this request should go to. If not found, use the 404 not found handler

        let chosenHandler: Handler = router[trimmedPath] || handlers.notFound;

        // Construct the data object to send to the handler 

        let data = new HandlerData (
            trimmedPath, 
            queryStringObject, 
            method, 
            header, 
            buffer
        );

        // Route the request to the handler specified in the router 

        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200 

            statusCode = statusCode || 200;

            // Use the payload called back by the handler, or default to an empty object 

            payload = payload || {};

            // Convert the payload into a string 

            let payloadString: string = JSON.stringify(payload);

            // Send the response

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path

            console.log('Request revieved on path: ', trimmedPath);
            console.log('Returning this response: ', statusCode, payloadString);

        });

    });
}

