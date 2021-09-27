require("express-async-errors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const { sequelize, User, Post} =require('./models')

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
app.use(express.json())

require("./src/middlewares/pre-route.middleware")(app);

// API routes
app.use("/api", require("./src/routes"));


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDoc));

// Ping route for testing connection
app.get("/", (req, res) => res.status(200).send(`

<h1>Hello users !<h1/>
<h1>click on this <a href="/docs">link<a/> to get  documentation on the blog post api !<a href="/docs">click me<a/></h1> 


`));
require("./src/middlewares/error.middleware")(app);
const port = process.env.PORT
app.listen(port,async()=>{
    console.log(`server running on port ${port}`)
    await sequelize.authenticate()

})