import Blog from "../models/blogs.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"; // optional if using images

// Create a new blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, short_description, content, tage, status, categoryId } =
      req.body;

    // console.log(req.files, "uploaded images");

    let imageUrls = [];

    // ✅ Handle multiple images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedImage = await uploadImageCloudinary(file);
        return uploadedImage?.url;
      });

      imageUrls = await Promise.all(uploadPromises);
    }
    // console.log(imageUrls, "imageUrls after upload");

    const blog = await Blog.create({
      title,
      short_description,
      content,
      tage,
      status,
      categoryId,
      images: imageUrls, // 👈 store array
    });

    res.status(201).json({
      status: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log("Create blog error:", error);
    next(error);
  }
};

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate({
      path: "categoryId",
      select: "name", // only category name
    });

    res.status(200).json({
      status: true,
      message: "All blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.log("Get all blogs error:", error);
    next(error);
  }
};

// Get single blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "categoryId",
      select: "name",
    }).sort({createdAt:-1});

    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }

    res.status(200).json({
      status: true,
      message: "Blog retrieved successfully",
      blog,
    });
  } catch (error) {
    console.log("Get single blog error:", error);
    next(error);
  }
};

// Update blog
// export const updateBlog = async (req, res, next) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Blog not found" });
//     }
// console.log("File:", req.file);
// console.log("Body:", req.body);

//     let imageUrl = blog.image;

//     // ✅ Remove image case
//     if (req.body.removeImage === "true") {
//       imageUrl = "";
//     }

//     // ✅ New image upload
//     if (req.file) {
//       const uploadedImage = await uploadImageCloudinary(req.file);
//       imageUrl = uploadedImage?.url || imageUrl;
//     }

//     const updatedData = {
//       title: req.body.title ?? blog.title,
//       short_description: req.body.short_description ?? blog.short_description,
//       content: req.body.content ?? blog.content,
//       tage: req.body.tage ?? blog.tage,
//       status: req.body.status ?? blog.status,
//       categoryId: req.body.categoryId ?? blog.categoryId,
//       image: imageUrl,
//     };

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.status(200).json({
//       status: true,
//       message: "Blog updated successfully",
//       updatedBlog,
//     });
//   } catch (error) {
//     console.log("Update blog error:", error);
//     next(error);
//   }
// };

// export const updateBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {
//       title,
//       short_description,
//       content,
//       tage,
//       status,
//       categoryId,
//       removeImages, // array of image URLs to delete
//     } = req.body;

//     const blog = await Blog.findById(id);
//     console.log(blog, "blog updated");
//     if (!blog) {
//       return res.status(404).json({
//         status: false,
//         message: "Blog not found",
//       });
//     }

//     //  Remove selected images
//     if (removeImages && removeImages.length > 0) {
//       blog.images = blog.images.filter((img) => !removeImages.includes(img));
//     }

//     //  Upload new images
//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map(async (file) => {
//         const uploaded = await uploadImageCloudinary(file);
//         return uploaded?.url;
//       });

//       const newImages = await Promise.all(uploadPromises);
//       blog.images.push(...newImages);
//     }
//     console.log(newImages, "newImages");
//     // 🔥 3. Update text fields
//     blog.title = title ?? blog.title;
//     blog.short_description = short_description ?? blog.short_description;
//     blog.content = content ?? blog.content;
//     blog.tage = tage ?? blog.tage;
//     blog.status = status ?? blog.status;
//     blog.categoryId = categoryId ?? blog.categoryId;

//     await blog.save();

//     res.status(200).json({
//       status: true,
//       message: "Blog updated successfully",
//       blog,
//     });
//   } catch (error) {
//     console.log("Update blog error:", error);
//     next(error);
//   }
// };
// export const updateBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const { title, short_description, content, tage, status, categoryId } =
//       req.body;

//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({
//         status: false,
//         message: "Blog not found",
//       });
//     }

//     /* ==============================
//        1️⃣ HANDLE IMAGE UPDATE
//     ============================== */

//     let updatedImages = blog.images; // default = existing images

//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map(async (file) => {
//         const uploaded = await uploadImageCloudinary(file);
//         return uploaded?.url;
//       });

//       updatedImages = await Promise.all(uploadPromises);
//     }

//     /* ==============================
//        2️⃣ UPDATE BLOG DATA
//     ============================== */

//     blog.title = title ?? blog.title;
//     blog.short_description = short_description ?? blog.short_description;
//     blog.content = content ?? blog.content;
//     blog.tage = tage ?? blog.tage;
//     blog.status = status ?? blog.status;
//     blog.categoryId = categoryId ?? blog.categoryId;
//     blog.images = updatedImages;

//     await blog.save();

//     res.status(200).json({
//       status: true,
//       message: "Blog updated successfully",
//       blog,
//     });
//   } catch (error) {
//     console.log("Update blog error:", error);
//     next(error);
//   }
// };

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      short_description,
      content,
      tage,
      status,
      categoryId,
      removeImages, // array of image URLs
    } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    /* ===============================
       1️⃣ HANDLE EXISTING IMAGES
    =============================== */

    let finalImages = blog.images || [];

    // 🗑 Remove selected images
    if (removeImages) {
      const imagesToRemove = Array.isArray(removeImages)
        ? removeImages
        : JSON.parse(removeImages);

      finalImages = finalImages.filter((img) => !imagesToRemove.includes(img));
    }

    /* ===============================
       2️⃣ HANDLE NEW IMAGE UPLOAD
    =============================== */

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploaded = await uploadImageCloudinary(file);
        return uploaded?.url;
      });

      const newImages = await Promise.all(uploadPromises);
      finalImages.push(...newImages); // 🔥 merge
    }

    /* ===============================
       3️⃣ UPDATE BLOG DATA
    =============================== */

    blog.title = title ?? blog.title;
    blog.short_description = short_description ?? blog.short_description;
    blog.content = content ?? blog.content;
    blog.tage = tage ?? blog.tage;
    blog.status = status ?? blog.status;
    blog.categoryId = categoryId ?? blog.categoryId;
    blog.images = finalImages;

    await blog.save();

    res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log("Update blog error:", error);
    next(error);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }

    res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Delete blog error:", error);
    next(error);
  }
};

// Get blogs by category
export const getBlogsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const blogs = await Blog.find({ categoryId })
      .populate({ path: "categoryId", select: "category_name" })
      .sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No blogs found for this category",
      });
    }

    res.status(200).json({
      status: true,
      message: "Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.log("Get blogs by category error:", error);
    next(error);
  }
};

export const updateBlogStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const FaqStatus = await Blog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      status: true,
      message: "Blog status updated",
      FaqStatus,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};
