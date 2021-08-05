import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectMongoDB from './config/config.js'


dotenv.config();
connectMongoDB()
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!`)
);
