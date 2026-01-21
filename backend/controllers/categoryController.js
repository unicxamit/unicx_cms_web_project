import Category from "../models/category.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"; // optional if using image upload

// Create a new category
export const createCategory = async (req, res, next) => {
  try {
    const { name, status, order_index } = req.body;

    const category = await Category.create({
      name,
      status,
      order_index: order_index || 0,
     
    });

    res.status(201).json({
      status: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("Create category error:", error);
    next(error);
  }
};

// Get all categories (sorted by order_index)
export const getAllCategories = async (req, res, next) => {
  try {
    const category = await Category.find()
      .sort({ order_index: 1, createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "All categories retrieved successfully",
      category,
    });
  } catch (error) {
    console.log("Get all categories error:", error);
    next(error);
  }
};


// Get all categories (sorted by order_index and status)
export const getAllCategoriesStatus = async (req, res, next) => {
  try {
    const category = await Category.find({status:"active"}).select("names status order_index")
      .sort({ order_index: 1, createdAt: -1 }).lean();

    res.status(200).json({
      status: true,
      message: "All categories retrieved successfully",
      category,
    });
  } catch (error) {
    console.log("Get all categories error:", error);
    next(error);
  }
};

// Get single category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: false, message: "Category not found" });
    }

    res.status(200).json({
      status: true,
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    console.log("Get single category error:", error);
    next(error);
  }
};

// Update category
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: false, message: "Category not found" });
    }

    const updatedData = {
      name: req.body.name || category.name,
      status: req.body.status || category.status,
      order_index: req.body.order_index !== undefined ? req.body.order_index : category.order_index,
      
    };



    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log("Update category error:", error);
    next(error);
  }
};

// Delete category
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ status: false, message: "Category not found" });
    }

    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Delete category error:", error);
    next(error);
  }
};

// Update order_index of categories (e.g., after drag-and-drop)

export const updateCategoryOrder = async (req, res) => {
  try {
    const { categories } = req.body;

    console.log("req.body 👉", req.body);

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Categories array required",
      });
    }

    // 🔥 Bulk update operations
    const bulkOps = categories.map((cat) => ({
      updateOne: {
        filter: { _id: cat._id },
        update: { $set: { order_index: cat.order_index } },
      },
    }));

    const bulkResult = await Category.bulkWrite(bulkOps);

    // 🔥 Fetch updated categories
    const updatedCategoryIds = categories.map((c) => c._id);

    const updatedCategories = await Category.find({
      _id: { $in: updatedCategoryIds },
    }).sort({ order_index: 1 }); // optional sorting
console.log(updatedCategories,"updatedcategories");
    res.status(200).json({
      status: true,
      message: "Category order updated successfully",
      summary: {
        matched: bulkResult.matchedCount,
        modified: bulkResult.modifiedCount,
      },
      updatedCategories, // ✅ ACTUAL UPDATED DATA
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};




export const deleteAllCategories = async (req, res, next) => {
  try {
    const result = await Category.deleteMany({});  // deletes all documents

    res.status(200).json({
      success: true,
      message: "All categories deleted successfully",
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.log("Delete all categories error:", error);
    next(error);
  }
};

// update status
export const updateCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      status: true,
      message: "Category status updated",
      category,
    });

  } catch (error) {
    res.status(500).json({ status:false, message:"Server Error" });
  }
};
