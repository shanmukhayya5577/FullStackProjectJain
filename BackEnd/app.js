const express = require('express');
const app = express();


//importing app middleware function
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//importing cors middleware
const cors = require('cors');
app.use(cors());

require('dotenv').config();
require('./Database');

//importing Router middleware
const studentsRoute = require('./studentsRouter/studentsRouter');
app.use('/',studentsRoute);


app.get('/',(req,res,next)=>{
    res.send('Wel come to NodeJS')
});
module.exports = app;
