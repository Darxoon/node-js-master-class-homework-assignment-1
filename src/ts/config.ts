/*
 * Name: config.ts 
 * Description: Create and export configuration variables 
 */ 

// Environment class

class Environment {
    httpPort: number;
    httpsPort: number;
    envName: string;
    constructor(httpPort: number, httpsPort: number, envName: string) {
        this.httpPort = httpPort;
        this.httpsPort = httpsPort;
        this.envName = envName;
    }
}

// Container for all the environments 
let environments: {[name: string]: Environment} = {};

// Staging (default) environment 
// Production environment 

environments.staging = new Environment(3000, 3001, 'staging');
environments.production = new Environment(5000, 5001, 'production');

// Determine which environment was passed as a command line argument

let currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';

// Check if current Environment is one of the environments above, if not, set to staging

export default environments[currentEnvironment] || environments.staging; 

