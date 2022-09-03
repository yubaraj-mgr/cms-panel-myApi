import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  status: {
    type: String,
    default: "inactive",
  },
  name: {
    type: String,
    require: true,
    maxLength: 50,
  },
  //   May be look for documentaion
  slug: {
    type: String,
    require: true,
    unique: true,
    index: 1,
    maxLength: 50,
    // trim is for white space
    trim: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
});

export default mongoose.model("Categories", categorySchema);
