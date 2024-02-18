const fs = require('fs');

const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
const products = data.products;

exports.getAllProducts = (req, res)=>{
    res.status(200).json(products);
}

exports.getProduct = (req, res)=>{
    const id = req.params.id;
    const product = products.find((value)=>{
        return id == value.id
    });
    res.status(200).json(product);
}

exports.createProduct = (req, res)=>{
    const product = req.body;
    products.push(product);
    res.status(201).json(product);
}

exports.deleteProduct = (req, res)=>{
    const id = req.params.id;
    const productIndex = products.findIndex((value)=>{
        return value.id == id
    });
    const product = products.splice(productIndex, 1);
    res.status(200).json(product);
}

exports.replaceProduct = (req, res)=>{
    const id = req.params.id;
    const product = req.body;
    const productIndex = products.findIndex((value)=>{
        return id == value.id;
    });
    products.splice(productIndex, 1, {...product, id : id});
    res.status(200).json(products[productIndex]);
}

exports.updateProduct = (req, res)=>{
    const id = req.params.id;
    const updatedProduct = req.body;
    const productIndex = products.findIndex((value)=>{
        return id == value.id;
    });
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...updatedProduct});
    res.status(200).json(products[productIndex]);
}


