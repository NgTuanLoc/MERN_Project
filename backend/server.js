import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectMongoDB from "./config/config.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/erorrMiddleware.js";

dotenv.config();
connectMongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => res.send("Techshop api is working !"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!`)
);
