const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const port = 5000;
mongoose
  .connect("mongodb://127.0.0.1:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected out");
  })
  .catch((err) => {
    console.log(err);
  });

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const products = new mongoose.model("Product", ProductSchema);

app.post("/api/v1/addProduct/new", async (req, res) => {
  const product = await products.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

app.get("/api/v1/getAllProduct", async (req, res) => {
  const getProducts = await products.find();
  res.status(200).json({
    success: true,
    getProducts,
  });
});

app.put("/api/v1/product/:id", async (req, res) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    res.status(501).json({
      success: false,
      message: "product is not found !",
    });
  }
  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

app.delete("/api/v1/product/:id", async (req, res) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    res.status(501).json({
      success: false,
      message: "product is not found !",
    });
  }
  product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});
app.get("/", async (req, res) => {
  const get = await res.send("hello world");
  console.log(get);
});
app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
