import express from "express";
import dotenv from "dotenv";

import connectMongoDB from "./config/config.js";
import productRoutes from "./routes/productRoute.js";
import { notFound, errorHandler } from "./middleware/erorrMiddleware.js";

dotenv.config();
connectMongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!`)
);
