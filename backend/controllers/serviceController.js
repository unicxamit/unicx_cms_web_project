import mongoose from "mongoose";
import Service from "../models/service.js";

export const createService = async (req, res) => {
  try {
    const { name, status, order_index, category, subcategory } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Service name is required",
      });
    }

    const service = await Service.create({
      name,
      status,
      order_index,
      category,
      subcategory,
    });

    res.status(201).json({
      status: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ order_index: 1 });

    res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    console.error("Get All Services Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.findById({
      category: req.params.categoryId,
    })
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ order_index: 1 });

    res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Get Services By Category Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getServicesBysubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid subcategory ID",
      });
    }

    // ✅ CORRECT QUERY
    const services = await Service.find({
      subcategory: subcategoryId,
    })
      .populate("subcategory", "name")
      .sort({ order_index: 1 });

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    console.error("Get Services By SubCategory Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// export const getServicesBySubCategory = async (req, res) => {
//   try {
//     const { subcategoryId } = req.params;

//     // 1️⃣ First check if subcategory exists
//     const subcategory = await SubCategory.findById(subcategoryId);

//     if (!subcategory) {
//       return res.status(404).json({
//         status: false,
//         message: "Subcategory not found",
//       });
//     }

//     // 2️⃣ Then fetch services using subcategory _id
//     const services = await Service.find({
//       subcategory: subcategory._id,
//     })
//       .populate("subcategory", "name")
//       .sort({ order_index: 1 });

//     // 3️⃣ Response
//     res.status(200).json({
//       status: true,
//       message: "Services fetched successfully",
//       subcategory: {
//         _id: subcategory._id,
//         name: subcategory.name,
//       },
//       data: services,
//     });
//   } catch (error) {
//     console.error("Get Services By Subcategory Error:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error",
//     });
//   }
// };
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: true,
      data: service,
    });
  } catch (error) {
    console.error("Get Service Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// status update service
export const updateServiceyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      status: true,
      message: "service status updated",
      service,
    });

  } catch (error) {
    res.status(500).json({ status:false, message:"Server Error" });
  }
};

// search api 


export const searchServices = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const services = await Service.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }).populate("category", "name");

    res.status(200).json({
      status: true,
      message: "Services searched successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// filter api 


export const filterServices = async (req, res) => {
  try {
    const { status, category } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    const services = await Service.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Services filtered successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// update serviceOrderIndex 
export const updateServiceOrder = async (req, res) => {
  try {
    const { items } = req.body;
console.log(items,"service order data")
    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ status: false, message: "Items required" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order_index: item.order_index } },
      },
    }));

    const result = await Service.bulkWrite(bulkOps);
console.log(result,"upade status")
    const updated = await Service.find(
      { _id: { $in: items.map(i => i._id) } }
    ).sort({ order_index: 1 });
console.log(updated,'servidciekdk')
    res.json({
      status: true,
      message: "Service order updated",
      result,
      updated,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// export const updateServiceOrder = async (req, res) => {
//   try {
//     const { items } = req.body;

//     console.log("Service order payload:", items);

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "Items array is required",
//       });
//     }

//     // 🔒 Validate IDs
//     const invalid = items.find(i => !i._id);
//     if (invalid) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid service id found",
//       });
//     }

//     const bulkOps = items.map(item => ({
//       updateOne: {
//         filter: { _id: item._id },
//         update: { $set: { order_index: item.order_index } },
//       },
//     }));

//     await Service.bulkWrite(bulkOps);

//     res.json({
//       status: true,
//       message: "Service order updated successfully",
//     });
//   } catch (err) {
//     console.error("SERVICE ORDER ERROR:", err);
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
