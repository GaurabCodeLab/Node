const express = require('express');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const server = express();

server.use(express.json());
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.listen(8080, ()=>{
    console.log("server is running");
})