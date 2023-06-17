import express from 'express'
import {config} from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc  from "swagger-jsdoc";
import userRoutes from "./src/routes/user.routes.js"
import connectDatabase from "./src/config/database.js"

const app = express();
const port = process.env.PORT || 2000
const host = process.env.HOST || "localhost"


//Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
// app.use("/public", express.static(path.join(__dirname, "uploads")));



connectDatabase();

//swagger documentation part
const swaggerOptions = {
    swaggerDefinition :{
        info:{
            title:"Supamenu v1.0.0 Documentation",
            version:"1.0.0",
            description:"Supamenu for restaurants"
        },

        schemes:[process.env.NODE_ENV === "production" ? "https":"http"],
        host:"localhost",
        basePath:"/api",
        SecurityDefinitions:{
            bearerAuth:{
                name:"Authorization",
                type:"apiKey",
                scheme:"bearer",
                in:"header"
            }

        }
    },
      apis:[ ".src/controllers/**/*.js",".src/models/**/*.js",".src/routes/**/*.js"]

};


const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.get('/documentationSwagger',(req,res)=>{
    res.setHeader("Content-Type","application/json")
    res.send(swaggerDoc)
})
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc,false,{docExpansion:"none"}))



//routes
app.use(userRoutes);
app.use((req,res)=>{
    res.send("Welcome to supamenu Documentation");
})

app.listen(port,()=>{
console.log(`listening in port ${port}`)
})

