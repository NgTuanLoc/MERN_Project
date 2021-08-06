import colors from "colors";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/config.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const sampleProduct = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProduct);
    console.log("Data Imported !".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error} !`.red.inverse);
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Removed !".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error} !`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  removeData();
} else {
  importData();
}
