import categorySchema from "./categorySchema.js";

export const postCategory = (data) => {
  return categorySchema(data).save();
};

export const getCategory = () => {
  return categorySchema.find();
};

export const getCategoryById = (_id) => {
  return categorySchema.findById(_id);
};
