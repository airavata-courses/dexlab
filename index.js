const path = require('path')
const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors')

const staticPath = path.join(__dirname, '/frontend/build')
app.use(express.static(staticPath))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoute = require('./routes/user')
const userActivity = require('./routes/activity')
const radarData = require('./routes/radar')

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

app.use(bodyParser.json())
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: '*'
  }
));

app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))
app.use('/user', userRoute);
app.use('/activity', userActivity);
app.use('/radar', radarData);

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/frontend/build/')});
});

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});