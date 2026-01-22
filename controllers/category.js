const Category = require("../models/category");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");


async function allCategory(req, res) {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ categories, success: true, massgae: "All Category Fetched.." });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


async function deleteCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }

    //  delete image from Cloudinary
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    // delete category from DB
    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.error(" DELETE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createCategory(req, res) {
  try {
     const { name} = req.body;
 
     // check if all names are exist
     if (!name ) {
       return res.status(400).json({
         message: "Category Name required",
       });
     }
 
     // check if file presebt
     if (!req.file) {
       return res.status(400).json({ message: "Image required" });
     }
 
    
     // Get upload link from cloud
     const uploadResult = await cloudinary.uploader.upload(req.file.path);
 
     const category = await Category.create({
       name,
       image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
     });
 
     // delete local file
     fs.unlink(req.file.path, () => {});
 
     return res.status(201).json({
       success: true,
       message: "Category Created",
       category,
     });
   } catch (error) {
     console.error(" CREATE Category ERROR:", error);
 
     if (req.file?.path) {
       fs.unlink(req.file.path, () => {});
     }
 
     return res.status(500).json({
       success: false,
       message: error.message,
     });
   }
}


async function toggleHideCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    //  Hide product
    category.hide = !category.hide;
    await category.save();

    return res.status(200).json({
      success: true,
      message: `catCgory ${category.hide ? "hidden" : "visible"} succesfully`,
      category,
    });
  } catch (error) {
    console.error(" Toggle Hide ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
    allCategory,
    createCategory,
    deleteCategory,
    toggleHideCategory,
}