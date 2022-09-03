import AdminUserSchema from "./AdminUserSchema.js";

// insert user
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

export const sirKinam2 = (filter) => {
  return AdminUserSchema.find(filter);
};

// update user

export const updateOneAdminUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};

// find a use

export const findOneAdminUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};
