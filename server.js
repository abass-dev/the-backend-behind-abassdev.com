const mysql = require('mysql2');
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const PORT = process.env.PORT || 5001

const app = express()
app.use(express.json())

const config = {
  host: process.env.NEXT_PUBLIC_HOST,
  user: process.env.NEXT_PUBLIC_DB_USERNAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE
};

const apiRoutes = express.Router()
const corsMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};



app.use('/api',corsMiddleware, apiRoutes);
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

apiRoutes.get('/react', (req, res) => {
    const connection = mysql.createConnection(config);
     connection.connect((error, reslut) => {
    if (error) throw error 
    connection.query("SELECT * FROM `all_in_one_tb` WHERE tech = 'ReactJs'", (err, response) => {
      if (err) throw err
      res.json(response)
      console.log(response);
    })
  })
  })
apiRoutes.get('/react-native', (req, res) => {
    const connection = mysql.createConnection(config);
     connection.connect((error, reslut) => {
    if (error) throw error 
    connection.query("SELECT * FROM `all_in_one_tb` WHERE tech = 'ReactNative'", (err, response) => {
      if (err) throw err
      res.json(response)
    })
  })
  })
apiRoutes.get('/php', (req, res) => {
    const connection = mysql.createConnection(config);
     connection.connect((error, reslut) => {
    if (error) throw error 
    connection.query("SELECT * FROM `all_in_one_tb` WHERE tech = 'PHP'", (err, response) => {
      if (err) throw err
      res.json(response)
    })
  })
  })

app.get('/', (req, res) => {
  
     res.json({status: '200', message: 'Welcome to the back-end behinds abassdev.com'})
//   fs.readFile('./index.html', 'utf-8', (error, data) => {
//     if (error) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('500 Internal Server Error');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     }
//  });
})

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))