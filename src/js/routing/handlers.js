"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = {
    /**
     * Doesn't do anything except for returning status code 200
     * Just for saying 'Hey, I'm still alive!'
     */
    ping: (data, callback) => {
        callback(200);
    },
    /**
     * Returns a welcome message
     */
    hello: (data, callback) => {
        callback(200, {
            welcome: 'Welcome to this RESTful API!',
            what: 'This is an API I built in the Node.js Master Class. This hello route was made for the Homework Assignment #1.',
            course: 'pirple.thinkific.com',
            course_info: "It's quite expensive but a good choice. You get taught all things you need for working with Node.js. If you can't afford that price, there's even a scholarship.",
            github: '[repo]'
        });
    },
    /**
     * 404 Not Found; Is returned if the url you inputted does not exist
     */
    notFound: (data, callback) => {
        callback(404);
    }
};
