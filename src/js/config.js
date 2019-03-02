"use strict";
/*
 * Name: config.ts
 * Description: Create and export configuration variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Environment class
class Environment {
    constructor(httpPort, httpsPort, envName) {
        this.httpPort = httpPort;
        this.httpsPort = httpsPort;
        this.envName = envName;
    }
}
// Container for all the environments 
let environments = {};
// Staging (default) environment 
// Production environment 
environments.staging = new Environment(3000, 3001, 'staging');
environments.production = new Environment(5000, 5001, 'production');
// Determine which environment was passed as a command line argument
let currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';
// Check if current Environment is one of the environments above, if not, set to staging
exports.default = environments[currentEnvironment] || environments.staging;
