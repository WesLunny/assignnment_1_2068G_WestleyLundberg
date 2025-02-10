import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';



//controller
import hotelsController from './controllers/hotels.js';

//app start
const app = express();

//body parser config
app.use(bodyParser.json());

//dot env config
dotenv.config();
//swagger config
const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotels API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/*.js'] // where to find api methods (controllers)
};

const openapiSpecification = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//mongoose setup db connection


mongoose.connect(process.env.DB,{})
.then((res)=>console.log('connected to db'))
.catch((err) => console.log(`Connection failed: ${err}`));

//url dispatching
app.use('/api/v1/hotels', hotelsController);

//start up on port 3000
app.listen(3000, ()=> {
    console.log('Express API running on port 3000')
});