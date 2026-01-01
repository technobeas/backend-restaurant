const Product = require("../models/product");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
// const { findById } = require("../models/user");

async function allProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ products, success: true, massgae: "All Products Fetched.." });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, description, category } = req.body;
    console.log("req.body : ", req.body);
    // check if all names are exist
    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Name, price and category are required",
      });
    }

    // check if file presebt
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // Get upload link from cloud
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    // delete local file
    fs.unlink(req.file.path, () => {});

    return res.status(201).json({
      success: true,
      message: "Product Created",
      product,
    });
  } catch (error) {
    console.error(" CREATE PRODUCT ERROR:", error);

    if (req.file?.path) {
      fs.unlink(req.file.path, () => {});
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    //  delete image from Cloudinary
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    // delete product from DB
    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(" DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function toggleHideProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    //  Hide product
    product.isHide = !product.isHide;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${product.isHide ? "hidden" : "visible"} succesfully`,
      product,
    });
  } catch (error) {
    console.error(" Toggle Hide ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function togglePopularProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    //  toggle popular product
    product.isPopular = !product.isPopular;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${
        product.isPopular ? "marked popular" : "removed from popular"
      }`,
      product,
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
  allProducts,
  createProduct,
  deleteProduct,
  toggleHideProduct,
  togglePopularProduct,
};
