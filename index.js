import express from 'express'
import {config} from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'


import userRoutes from "./src/routes/user.routes.js"
import connectDatabase from "./src/config/database.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJsDoc = require('./swagger.json')


const app = express();
const port = process.env.PORT || 2000
const host = process.env.HOST || "localhost"


//Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
// app.use("/public", express.static(path.join(__dirname, "uploads")));



connectDatabase();

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc,false,{docExpansion:"none"}))



//routes
app.use(userRoutes);
app.use((req,res)=>{
    res.send("Welcome to supamenu Documentation");
})

app.listen(port,()=>{
console.log(`listening in port ${port}`)
})