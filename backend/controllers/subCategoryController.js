import SubCategory from "../models/subCategory.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// CREATE SUBCATEGORY
export const createSubCategory = async (req, res) => {
  try {
    const { name, order_index, category, status } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "SubCategory name is required",
      });
    }

   
    const subCategory = await SubCategory.create({
      name,
     
      order_index,
      category,
      status,
    });

    res.status(201).json({
      status: true,
      message: "SubCategory created successfully",
      subCategory,
    });
  } catch (error) {
    console.error("Create SubCategory Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("category", "name")
      .sort({ order_index: 1 });

    res.status(200).json({
      status: true,
      message: "SubCategories fetched successfully",
      subCategories,
    });
  } catch (error) {
    console.error("Get All Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({
      category: req.params.categoryId,
    })
      .populate("category", "name")
      .sort({ order_index: 1 });

    res.status(200).json({
      status: true,
      message: "SubCategories fetched successfully",
      subCategories,
    });
  } catch (error) {
    console.error("Get By Category Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id)
      .populate("category", "name");

    if (!subCategory)
      return res.status(404).json({ status: false, message: "Not found" });

    res.status(200).json({ status: true, data: subCategory });
  } catch (error) {
    console.error("Get Single Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category", "name");

  // let imageUrl = subCategory.image;
  //   if (req.file) {
  //     const uploadedImage = await uploadImageCloudinary(req.file);
  //     imageUrl = uploadedImage?.url || imageUrl;
  //   }

    if (!subCategory)
      return res.status(404).json({ status: false, message: "Not found" });

    res.status(200).json({
      status: true,
      message: "SubCategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory)
      return res
        .status(404)
        .json({ status: false, message: "SubCategory not found" });

    res.status(200).json({
      status: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
// update subactegory status
export const updateSubCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
console.log(req.body,"status updata")
    const subcategoryStatus = await SubCategory.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
console.log(subcategoryStatus,"status updated")
    res.json({
      status: true,
      message: "subcategoryStatus status updated",
      subcategoryStatus,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};


// updateorder_index
export const updateSubCategoryOrder = async (req, res) => {
  try {
    const { items } = req.body;
console.log(items,"subcategory_orderIndex");
    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ status: false, message: "Items required" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order_index: item.order_index } },
      },
    }));

    const result = await SubCategory.bulkWrite(bulkOps);

    const updated = await SubCategory.find(
      { _id: { $in: items.map(i => i._id) } }
    ).sort({ order_index: 1 });

    res.json({
      status: true,
      message: "SubCategory order updated",
      result,
      updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
