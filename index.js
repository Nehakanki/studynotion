const express = require('express');
const app = express();

require('dotenv').config();

//define Port
PORT = process.env.PORT || 4000


//middle ware to parse json
app.use(express.json());


const connectDb = require('./config/database');
connectDb.connect();

app.listen(PORT, ()=>{
    console.log(`App listen at ${PORT} port`);
})
