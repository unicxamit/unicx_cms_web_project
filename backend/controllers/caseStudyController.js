import CaseStudy from "../models/caseStudy.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"; // uncomment if using image upload

// Create a new CaseStudy
// export const createCaseStudy = async (req, res, next) => {
//   try {
//     const { title, client_name, Description, Additional_Details, status, categoryId } = req.body;

//     let imageUrl = "";
//     if (req.file) {
//       const uploadedImage = await uploadImageCloudinary(req.file);
//       imageUrl = uploadedImage?.url || "";
//     }

//     const caseStudy = await CaseStudy.create({
//       title,
//       client_name,
//       Description,
//       Additional_Details,
//       status,
//       categoryId,
//       image: imageUrl,
//     });

//     res.status(201).json({
//       status: true,
//       message: "CaseStudy created successfully",
//       caseStudy,
//     });
//   } catch (error) {
//     console.log("Create CaseStudy error:", error);
//     next(error);
//   }
// };

export const createCaseStudy = async (req, res, next) => {
  try {
    const {
      title,
      client_name,
      Description,
      Additional_Details,
      status,
      categoryId,
    } = req.body;

    let imageUrls = [];

    // ✅ Handle multiple images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedImage = await uploadImageCloudinary(file);
        return uploadedImage?.url;
      });

      imageUrls = await Promise.all(uploadPromises);
    }
    console.log(imageUrls, "images url");
    const caseStudy = await CaseStudy.create({
      title,
      client_name,
      Description,
      Additional_Details,
      status,
      categoryId,
      images: imageUrls,
    });

    res.status(201).json({
      status: true,
      message: "CaseStudy created successfully",
      caseStudy,
    });
  } catch (error) {
    console.log("Create CaseStudy error:", error);
    next(error);
  }
};

// Get all CaseStudies
export const getAllCaseStudieswithcategory = async (req, res, next) => {
  try {
    const caseStudies = await CaseStudy.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "categoryId",
        select: "name", // only return the category name
      });
    res.status(200).json({
      status: true,
      message: "All CaseStudies retrieved successfully",
      caseStudies,
    });
  } catch (error) {
    console.log("Get all CaseStudies error:", error);
    next(error);
  }
};

// Get a single CaseStudy by ID
export const getCaseStudyById = async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id).populate(
      "categoryId"
    );
    if (!caseStudy) {
      return res
        .status(404)
        .json({ status: false, message: "CaseStudy not found" });
    }

    res.status(200).json({
      status: true,
      message: "CaseStudy retrieved successfully",
      caseStudy,
    });
  } catch (error) {
    console.log("Get single CaseStudy error:", error);
    next(error);
  }
};

// Update a CaseStudy
// export const updateCaseStudy = async (req, res, next) => {
//   try {
//     const caseStudy = await CaseStudy.findById(req.params.id);
//     if (!caseStudy) {
//       return res
//         .status(404)
//         .json({ status: false, message: "CaseStudy not found" });
//     }

//     // Handle optional image update
//     let imageUrl = caseStudy.image;
//     if (req.file) {
//       const uploadedImage = await uploadImageCloudinary(req.file);
//       imageUrl = uploadedImage?.url || imageUrl;
//     }

//     const updatedData = {
//       title: req.body.title || caseStudy.title,
//       client_name: req.body.client_name || caseStudy.client_name,
//       Description: req.body.Description || caseStudy.Description,
//       Additional_Details:
//         req.body.Additional_Details || caseStudy.Additional_Details,
//       status: req.body.status || caseStudy.status,
//       categoryId: req.body.categoryId || caseStudy.categoryId,
//       image: imageUrl,
//     };

//     const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.status(200).json({
//       status: true,
//       message: "CaseStudy updated successfully",
//       updatedCaseStudy,
//     });
//   } catch (error) {
//     console.log("Update CaseStudy error:", error);
//     next(error);
//   }
// };

export const updateCaseStudy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      client_name,
      Description,
      Additional_Details,
      status,
      categoryId,
      removeImages, // array of image URLs
    } = req.body;

    const caseStudy = await CaseStudy.findById(id);

    if (!caseStudy) {
      return res.status(404).json({
        status: false,
        message: "CaseStudy not found",
      });
    }

    /* ==============================
       1️⃣ EXISTING IMAGES
    ============================== */

    let finalImages = caseStudy.images || [];

    // 🗑 Remove images
    if (removeImages) {
      const imagesToRemove = Array.isArray(removeImages)
        ? removeImages
        : JSON.parse(removeImages);

      finalImages = finalImages.filter((img) => !imagesToRemove.includes(img));
    }

    /* ==============================
       2️⃣ NEW IMAGE UPLOAD
    ============================== */

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploaded = await uploadImageCloudinary(file);
        return uploaded?.url;
      });

      const newImages = await Promise.all(uploadPromises);
      finalImages.push(...newImages);
    }

    /* ==============================
       3️⃣ UPDATE DATA
    ============================== */

    caseStudy.title = title ?? caseStudy.title;
    caseStudy.client_name = client_name ?? caseStudy.client_name;
    caseStudy.Description = Description ?? caseStudy.Description;
    caseStudy.Additional_Details =
      Additional_Details ?? caseStudy.Additional_Details;
    caseStudy.status = status ?? caseStudy.status;
    caseStudy.categoryId = categoryId ?? caseStudy.categoryId;
    caseStudy.images = finalImages;

    await caseStudy.save();

    res.status(200).json({
      status: true,
      message: "CaseStudy updated successfully",
      caseStudy,
    });
  } catch (error) {
    console.log("Update CaseStudy error:", error);
    next(error);
  }
};

// Delete a CaseStudy
export const deleteCaseStudy = async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ status: false, message: "CaseStudy not found" });
    }

    res.status(200).json({
      status: true,
      message: "CaseStudy deleted successfully",
    });
  } catch (error) {
    console.log("Delete CaseStudy error:", error);
    next(error);
  }
};

// update status
// export const updateCaseStudyStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const category = await CaseStudy.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     res.json({
//       status: true,
//       message: "CaseStudy status updated",
//       category,
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, message: "Server Error" });
//   }
// };


export const updateCaseStudyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        status: false,
        message: "ID and status are required",
      });
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!caseStudy) {
      return res.status(404).json({
        status: false,
        message: "CaseStudy not found",
      });
    }

    res.json({
      status: true,
      message: "CaseStudy status updated",
      caseStudy,
    });
  } catch (error) {
    console.error("Update CaseStudy Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
