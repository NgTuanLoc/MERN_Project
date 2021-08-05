import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(process.env.MONGO_URI);
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
