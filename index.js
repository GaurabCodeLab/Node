require('dotenv').config();
const express = require('express');
const productRouter = require('./routes/product');
const mongoose = require('mongoose');

// Database connection:-
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("database connected");
}
main().catch(err => console.log(err));

const server = express();
server.use(express.static(process.env.PUBLIC_DIR));
server.use(express.json());
server.use('/products', productRouter.router);

server.listen(process.env.PORT, ()=>{
    console.log("server is running");
})