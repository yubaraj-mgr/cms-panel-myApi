import express from "express";
import { categoryValidation } from "../middlewares/joi-validation/joiValidation.js";
import {
  getCategory,
  getCategoryById,
  postCategory,
} from "../model/categories/categoryModel.js";
import slugify from "slugify";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = _id ? await getCategoryById(_id) : await getCategory();
    res.json({
      status: "success",
      message: "listing all the categories",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", categoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const result = await postCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "new category added successfully",
          result,
        })
      : res.json({
          status: "error",
          message: "Please check your data before posting",
        });
  } catch (error) {
    next(error);
  }
});

// Update category

router.put("/", (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
