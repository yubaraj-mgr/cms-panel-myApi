import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "First name can't be loogert than 20 charactersic"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [20, "First name can't be loogert than 20 charactersic"],
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      maxLength: [50, "First name can't be loogert than 50 charactersic"],
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      maxLength: [15, "First name can't be loogert than 15 charactersic"],
    },
    address: {
      type: String,
      maxLength: [100, "First name can't be loogert than 100 charactersic"],
      default: "n/a",
    },
    dob: {
      type: Date,
      default: null,
    },
    emailValidationCode: {
      type: String,
      default: "",
    },
    refreshJwt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", adminUserSchema);
