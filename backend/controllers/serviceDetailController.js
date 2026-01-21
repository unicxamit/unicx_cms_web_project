import ServiceDetails from "../models/serviceDetail.js";
import Service from "../models/service.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
// export const createServiceDetails = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       service,
//       sections = []
//     } = req.body;

//     // Validate required fields (optional but recommended)
//     if (!title) {
//       return res.status(400).json({
//         status: false,
//         message: "Title is required"
//       });
//     }

//     // Ensure sections is always an array
//     const formattedSections = Array.isArray(sections)
//       ? sections
//       : [sections];

//     const newService = await ServiceDetails.create({
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       service,
//       sections: formattedSections
//     });

//     res.status(201).json({
//       status: true,
//       message: "Service details created successfully",
//       data: newService
//     });
//   } catch (error) {
//     console.error("Create ServiceDetails Error:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error"
//     });
//   }
// };

// GET ALL SERVICE DETAILS
export const getAllServiceDetails = async (req, res) => {
  try {
    const services = await ServiceDetails.find()
      .populate("service")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Service details fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Get All Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// GET SERVICE DETAILS BY ID
export const getServiceDetailsById = async (req, res) => {
  try {
    const service = await ServiceDetails.findById(req.params.id).populate(
      "service"
    );

    if (!service)
      return res.status(404).json({ status: false, message: "Not found" });

    res.status(200).json({ status: true, data: service });
  } catch (error) {
    console.error("Get By Id Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// GET BY SERVICE ID
export const getServiceDetailsByService = async (req, res) => {
  try {
    const service = await ServiceDetails.find({
      service: req.params.serviceId,
    }).populate("service", "name");

    res.status(200).json({
      status: true,
      service,
    });
  } catch (error) {
    console.error("Get By Service Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// UPDATE SERVICE DETAILS
// export const updateServiceDetails = async (req, res) => {
//   try {
//     const service = await ServiceDetails.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!service)
//       return res.status(404).json({ status: false, message: "Not found" });

//     res
//       .status(200)
//       .json({ status: true, message: "Updated successfully", data: service });
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// };

// DELETE SERVICE DETAILS
export const deleteServiceDetails = async (req, res) => {
  try {
    const service = await ServiceDetails.findByIdAndDelete(req.params.id);

    if (!service)
      return res.status(404).json({ status: false, message: "Not found" });

    res.status(200).json({ status: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// create servicedetails api
// export const createServiceDetail = async (req, res) => {
//   try {
//     const { service } = req.body;

//     // prevent duplicate
//     const exist = await ServiceDetails.findOne({ service });
//     if (exist) {
//       return res.status(400).json({
//         status: false,
//         message: "ServiceDetails already exists",
//       });
//     }

//     const serviceDetails = await ServiceDetails.create(req.body);

//     res.status(201).json({
//       status: true,
//       message: "ServiceDetails created",
//       serviceDetails,
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// };

// export const createServiceDetail = async (req, res) => {
//   try {
//     const {
//       service,
//       name,
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       sections
//     } = req.body;

//     // 🔒 prevent duplicate
//     const exist = await ServiceDetails.findOne({ service });
//     if (exist) {
//       return res.status(400).json({
//         status: false,
//         message: "ServiceDetails already exists"
//       });
//     }

//     // 🔥 handle sections + images
//     let createdSections = [];

//     if (sections) {
//       const parsedSections = JSON.parse(sections);

//       createdSections = await Promise.all(
//         parsedSections.map(async (section, index) => {
//           let imageUrl = "";

//           const file = req.files?.find(
//             (f) => f.fieldname === `sectionImage_${index}`
//           );

//           if (file) {
//             const uploadedImage = await uploadImageCloudinary(file);
//             imageUrl = uploadedImage?.url || "";
//           }

//           return {
//             sectionTitle: section.sectionTitle,
//             sectionDescription: section.sectionDescription,
//             sectionImage: imageUrl
//           };
//         })
//       );
//     }

//     // 🔥 create document
//     const serviceDetails = await ServiceDetails.create({
//       service,
//       name,
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       sections: createdSections
//     });

//     res.status(201).json({
//       status: true,
//       message: "ServiceDetails created successfully",
//       serviceDetails
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Server error"
//     });
//   }
// };

// export const createServiceDetail = async (req, res) => {
//   try {
//     const {
//       service,
//       name,
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       sections,
//     } = req.body;

//     const exist = await ServiceDetails.findOne({ service });
//     if (exist) {
//       return res.status(400).json({
//         status: false,
//         message: "ServiceDetails already exists",
//       });
//     }

//     let createdSections = [];

//     if (sections) {
//       const parsedSections = JSON.parse(sections);

//       createdSections = await Promise.all(
//         parsedSections.map(async (section, index) => {
//           // 🔥 get all files for this section
//           const files = req.files?.filter(
//             (f) => f.fieldname === `images_${index}`
//           );

//           let imageUrls = [];

//           if (files && files.length > 0) {
//             for (const file of files) {
//               const uploaded = await uploadImageCloudinary(file);
//               if (uploaded?.url) {
//                 imageUrls.push(uploaded.url);
//               }
//             }
//           }

//           return {
//             sectionTitle: section.sectionTitle,
//             sectionDescription: section.sectionDescription,
//             images: imageUrls,
//           };
//         })
//       );
//     }

//     const serviceDetails = await ServiceDetails.create({
//       service,
//       name,
//       title,
//       description,
//       metaKeyword,
//       metaDescription,
//       sections: createdSections,
//     });

//     res.status(201).json({
//       status: true,
//       message: "ServiceDetails created successfully",
//       serviceDetails,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Server error",
//     });
//   }
// };
// ================= this is my firs kf==========


export const createServiceDetail = async (req, res) => {
  try {
    const { name, title, description, metaKeyword, metaDescription, service, sections,category,subcategory} = req.body;
 if (!service) {
      return res.status(400).json({
        status: false,
        message: "Service ID is required",
      });
    }

    // -------------------- FETCH SERVICE --------------------
    const serviceData = await Service.findById(service).populate("category", "name")
  .populate("subcategory", "name");
console.log(serviceData,"servicecdk")
    if (!serviceData) {
      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }
  
 const exist = await ServiceDetails.findOne({ service });

    // Check images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    let imageUrls = [];

    // ✅ Handle multiple images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedImage = await uploadImageCloudinary(file);
        return uploadedImage?.url;
      });

      imageUrls = await Promise.all(uploadPromises);
    }
    // Parse sections if sent as JSON string
    let parsedSections = [];
    if (sections) {
      // sections can be sent as JSON string from frontend
      parsedSections = typeof sections === "string" ? JSON.parse(sections) : sections;
    }

    // Create ServiceDetails
    // const serviceDetails = await ServiceDetails.create({
    //   name:name || serviceData.name,
    //   title,
    //   description,
    //   metaKeyword,
    //   metaDescription,
    //   service: [service],
    //   category:category || serviceData.category?.name || "",
    //   subcategory:subcategory || serviceData.subcategory?.name || "",
    //   // service: typeof service === "string" ? JSON.parse(service) : service, 
    //   sections: parsedSections,
    //   images:imageUrls, // array of URLs from Cloudinary
    // });
    const serviceDetails = await ServiceDetails.create({
  name: name || serviceData.name,
  title,
  description,
  metaKeyword,
  metaDescription,

  service: [service],

  // ✅ array se name nikaalo
  category:
    category ||
    (Array.isArray(serviceData.category) && serviceData.category.length > 0
      ? serviceData.category[0].name
      : ""),

  subcategory:
    subcategory ||
    (Array.isArray(serviceData.subcategory) && serviceData.subcategory.length > 0
      ? serviceData.subcategory[0].name
      : ""),

  sections: parsedSections,
  images: imageUrls,
});


    res.status(201).json({
      status: true,
      message: "ServiceDetails created successfully",
      serviceDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




// updated code for updation
// export const updateServiceDetail = async (req, res) => {
//   try {
//     const { serviceId } = req.params;
//     const { name, title, description, metaKeyword, metaDescription, sections } =
//       req.body;

//     const serviceDetails = await ServiceDetails.findOne({ service: serviceId });
//     if (!serviceDetails)
//       return res
//         .status(404)
//         .json({ status: false, message: "ServiceDetails not found" });

//     const parsedSections = sections ? JSON.parse(sections) : [];

//     const updatedSections = await Promise.all(
//       parsedSections.map(async (sec, index) => {
//         let imageUrl = serviceDetails.sections[index]?.sectionImage || "";

//         const file = req.files?.find(
//           (f) => f.fieldname === `sectionImage_${index}`
//         );
//         if (file) {
//           const uploaded = await uploadImageCloudinary(file); // ✅ now defined
//           if (uploaded?.secure_url) imageUrl = uploaded.secure_url;
//         }

//         return {
//           sectionTitle: sec.sectionTitle,
//           sectionDescription: sec.sectionDescription,
//           image: imageUrl,
//         };
//       })
//     );

//     serviceDetails.name = name ?? serviceDetails.name;
//     serviceDetails.title = title ?? serviceDetails.title;
//     serviceDetails.description = description ?? serviceDetails.description;
//     serviceDetails.metaKeyword = metaKeyword ?? serviceDetails.metaKeyword;
//     serviceDetails.metaDescription =
//       metaDescription ?? serviceDetails.metaDescription;
//     serviceDetails.sections = updatedSections;

//     await serviceDetails.save();

//     res.json({
//       status: true,
//       message: "ServiceDetails updated successfully",
//       serviceDetails,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// };


export const updateServiceDetail = async (req, res) => {
  try {
    const { serviceId } = req.params;
  // const serviceData = await Service.findById(serviceId);

    // if (!serviceData) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "Service not found",
    //   });
    // }
    
    const serviceDetails = await ServiceDetails.findOne({ service: serviceId });
    if (!serviceDetails)
      return res.status(404).json({ status: false, message: "ServiceDetails not found" });

    console.log(serviceDetails,"service details")
    const {
      title,
      description,
      metaKeyword,
      metaDescription,
      sections,
      removeImages // optional array of image URLs to remove
    } = req.body;

    // 1️⃣ Update text fields
    // if (name) serviceData.name = name;
    if (title) serviceDetails.title = title;
    if (description) serviceDetails.description = description;
    if (metaKeyword) serviceDetails.metaKeyword = metaKeyword;
    if (metaDescription) serviceDetails.metaDescription = metaDescription;
    // if (service) serviceDetails.service = typeof service === "string" ? JSON.parse(service) : service;
    // if(service) serviceDetails.service=[service];
    if (sections) serviceDetails.sections = typeof sections === "string" ? JSON.parse(sections) : sections;

    // 2️⃣ Handle existing images
    let finalImages = serviceDetails.images || [];

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

    // 4️⃣ Assign back to serviceDetails
    serviceDetails.images = finalImages;

    await serviceDetails.save();
console.log(serviceDetails,"serviceDetails updated")
    res.json({
      status: true,
      message: "ServiceDetails updated successfully",
      serviceDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};