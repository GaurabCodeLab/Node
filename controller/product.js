const model = require("../model/product");
const Product = model.Product;

exports.getAllProducts = async (req, res) => {
 try {
  // const products = await Product.find();
  const products = await Product.find({brand: "Apple", discountPercentage: {$gt: 15}});
  res.status(200).json(products);
 } catch (error) {
  res.status(400).json(error);
  console.log(error);
 }

};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
 try {
  // const product = await Product.findOne();
  // const product = await Product.findOne({rating: {$lte: 4}});
  const product = await Product.findById(id);
  res.status(200).json(product);
 } catch (error) {
  res.status(400).json(error);
  console.log("error wala block chala");
 }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: -899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
    });
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
    console.log("error hua hai", error);
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    // const replacedProduct = await Product.findOneAndReplace({_id: id}, req.body, {new: false});
    // const replacedProduct = await Product.findOneAndReplace({_id: id}, req.body, {new: true});
    // const replacedProduct = await Product.findOneAndReplace({title: "dasrath"}, req.body, {new: true, upsert: false});
    const replacedProduct = await Product.findOneAndReplace({title: "dasrath"}, req.body, {new: true, upsert: true});
    res.status(200).json(replacedProduct);
  } catch (error) {
    res.status(400).json(error);
    console.log("error wala block chala hai");
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
 try {
  // const updatedProduct = await Product.findOneAndUpdate({_id: id}, req.body, {new: false});
  // const updatedProduct = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
  const updatedProduct = await Product.findOneAndUpdate({title: "krishna"}, req.body, {new: true, upsert: true});
  res.status(200).json(updatedProduct);
 } catch (error) {
  res.status(400).json(error);
 }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({_id: id});
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
 
};
