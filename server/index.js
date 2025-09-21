const express = require('express');
const { connectDb } = require('./config/dbConnection');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000


app.get('/',(req,res) => {
     res.send('<h1>Bharat Darshan</h1>');
})
connectDb()


app.listen(PORT,() => {
    console.log(`Server Chalu Ho Gya😊 on Port ${PORT}`);
});