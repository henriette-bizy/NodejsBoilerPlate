import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/user.routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Management System",
        description: "Management System Documentation made with ❤ by Bizy",
        contact: {
            name: "Henriette Biziyaremye",
            email: "hopebiziyaremye@gmail.com"
        }
    },
    host: "localhost:2000",
    schemes: ['http', 'https'],
    produces: ['application/json'],
    tags: [
        {
            "name": "USER OPERATIONS",
            "description": "User Operations"
        } 
    ],
    definitions: {
        User: {
            firstName: "Gasaro",
            lastName: "Leila",
            email: "uwamgaleila@gmail.com",  
            password: "123456",
            role: "admin"
        }
    }
}
swaggerAutogen(outputFile, endpointsFiles, doc)