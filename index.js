const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

const userRoute = require(newFunction())
const userActivity = require('./routes/activity')

// Generate documentation from code
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to Dexlab user services',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], 
};


const openapiSpecification = swaggerJsDoc(options);

app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use(bodyParser.json())

app.use('/user', userRoute);
app.use('/activity', userActivity);

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});

function newFunction() {
  return './routes/user';
}