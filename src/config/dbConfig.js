import mongoose from "mongoose";

export const dbConfig = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "there is no connection string availabe in process.en.MONGO_CLINET"
      );
    }
    const con = mongoose.connect(conStr);
    con && console.log("mongodb Connected");
  } catch (error) {
    error && console.log(error);
  }
};
