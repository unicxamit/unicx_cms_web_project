// api.js
import axios from "axios";

const api = axios.create({
  // Change this baseURL to your local backend server URL
  // When deploying, you'll change this to your deployed backend URL (e.g., 'https://api.unicx.in')
  baseURL: "http://localhost:5000/api/v1"
  // baseURL:"https://curves-councils-coffee-ecology.trycloudflare.com/api/v1"  ,
  // headers: { 'Content-Type': 'application/json' }
});

// Categories API
export const getCategories = async () => {
  try {
    const response = await api.get("/category/getAllcategory");
    // console.log(response, "response categorydata");
    return response.data; // 👈 returns backend JSON
  } catch (error) {
    console.error("API Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await api.post("/category/create-category", data);
    // console.log(response, "categorycreate response");
    return response.data;
  } catch (error) {
    console.error("API Error adding category:", error.response || error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/category/update-category/${id}`, data);

    return response.data;
  } catch (err) {
    console.error("Update Error:", err.response?.data || err);
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/category/delete-category/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete Error:", err.response?.data || err);
    throw err;
  }
};

// update status
export const updateCategoryStatus = async (id, status) => {
  try {
    const response = await api.patch(`/category/update-status/${id}`, {
      status,
    });
    return response.data;
  } catch (err) {
    console.error("Delete Error:", err.response?.data || err);
    throw err;
  }
};

// Subcategories API
export const addSubCategory = async (data) => {
  try {
    const response = await api.post("/subcategory/create-subCategory", data);
    // console.log(response, "create subcategory");
    return response.data;
  } catch (error) {
    console.error("API Error adding subcategory:", error.response || error);
    throw error;
  }
};

// serviceDetails
export const addServiceDetails = async (data) => {
  try {
    const response = await api.post(
      "/servicedetails/create-service-details",
      data
    );
    console.log(response, "create servicedetails");
    return response.data;
  } catch (error) {
    console.error("API Error adding subcategory:", error.response || error);
    throw error;
  }
};
// get serviceDetailsByserviceId
export const getServiceDetailsByserviceId = async (serviceId) => {
  try {
    const response = await api.get(`/servicedetails/by-service/${serviceId}`);
    console.log(response, "get servicedetailshjlopj");
    return response.data;
  } catch (error) {
    console.error("API Error adding subcategory:", error.response || error);
    throw error;
  }
};
// updateservicedetailsById
export const updateServiceDetails = async (serviceId, data) => {
  try {
    const response = await api.put(
      `/servicedetails/updateService_detailsById/${serviceId}`,
      data
    );
    console.log(response, "update service details ");
    return response.data;
  } catch (error) {
    console.error("API Error adding subcategory:", error.response || error);
    throw error;
  }
};
export const updateSubCategorystatus = async (id, status) => {
  try {
    const response = await api.patch(`/subcategory/subcategory/status/${id}`, {
      status,
    });
    // console.log(response,"status updated")
    return response.data;
  } catch (error) {
    console.error("API Error adding subcategory:", error.response || error);
    throw error;
  }
};
export const getSubCategories = async () => {
  try {
    const response = await api.get("/subcategory/getAllSubcategory");
    // console.log(response, "getsubcategory");
    return response.data;
  } catch (error) {
    console.error("API Error fetching subcategories:", error);
    throw error;
  }
};
export const getSubCategoriesByCategoryId = async (catgoryId) => {

  try {
    const response = await api.get(`/subcategory/getSubCategory/category/${catgoryId}`);
    // console.log(response, "getsubcategory By category Id");
    return response.data;
  } catch (error) {
    console.error("API Error fetching subcategories:", error);
    throw error;
  }
};
export const getserviceBysubCategoryId = async (subcategoryId) => {
  
  try {
    const response = await api.get(`/service/getservice/${subcategoryId}`);
    // console.log(response, "getserviceBy subcategory by");
    return response.data;
  } catch (error) {
    console.error("API Error fetching subcategories:", error);
    throw error;
  }
};
// updatecategory order_index 
export const updateCategoryOrder_index = async (payload) => {
  try {
    console.log("Sending payload 👉", payload);

    const response = await api.put(
      "/category/reorder/category",     // ✅ URL
      {
        categories: payload,       // ✅ BODY
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("update order response", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "Update Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// subCategory orderIndex
export const updateSubCategoryOrder_index = async (payload) => {
  try {
    console.log("Sending payload 👉", payload);

    const response = await api.put(
      "/subcategory/reorder/subcategory",    
      {
        items: payload,       // ✅ BODY
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("update order response", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "Update Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// service order index
export const updateserviceOrder_index = async (payload) => {
  try {
    console.log("Sending payload 👉", payload);

    const response = await api.put(
      "/service/reorder/service",     // ✅ URL
      {
        items: payload,       // ✅ BODY
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("update order response", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "Update Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};
export const updateSubCategory = async (id, data) => {
  try {
    const response = await api.put(
      `/subcategory/update-subcategory/${id}`,
      data
    );
    console.log(response, "update subcategory");
    return response.data;
  } catch (error) {
    console.error("API Error updating subcategory:", error.response || error);
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await api.delete(`/subcategory/delete-subcategory/${id}`);
    // console.log(response,"responsde daa elel")
    return response.data;
  } catch (error) {
    console.error("API Error deleting subcategory:", error.response || error);
    throw error;
  }
};

// Users API
export const getUsers = async () => {
  try {
    const response = await api.get("/auth/find-all");
  
    return response.data;
  } catch (error) {
    console.error("API Error fetching users:", error);
    throw error;
  }
};

// Sub-Sub-Categories API
export const getSubSubCategories = async () => {
  try {
    const response = await api.get("/service/getAllServices");
    // console.log(response, "category servuce response data");
    return response.data;
  } catch (error) {
    console.error("API Error fetching sub-sub-categories:", error);
    throw error;
  }
};

export const addSubSubCategory = async (data) => {
  try {
    const response = await api.post("/service/add-service", data);
    return response.data;
  } catch (error) {
    console.error(
      "API Error adding sub-sub-category:",
      error.response || error
    );
    throw error;
  }
};

export const updateSubSubCategory = async (id, data) => {
  try {
    const response = await api.put(`/service/update-service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "API Error updating sub-sub-category:",
      error.response || error
    );
    throw error;
  }
};

export const updateSubSubCategoryStatus = async (id, status) => {
  try {
    const response = await api.patch(`/service/update-status/${id}`, {
      status,
    });
    console.log(response, "respoknse data");
    return response.data;
  } catch (error) {
    console.error(
      "API Error updating sub-sub-category:",
      error.response || error
    );
    throw error;
  }
};
export const deleteSubSubCategory = async (id) => {
  try {
    const response = await api.delete(`/service/delete-service/${id}`);
    console.log(response, "response data");
    return response.data;
  } catch (error) {
    console.error(
      "API Error deleting sub-sub-category:",
      error.response || error
    );
    throw error;
  }
};

// api.js
export const getSubSubCategoryById = async (id) => {
  try {
    const response = await api.get(`/service/getserviceById/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error fetching sub-sub-category by ID:", error);
    throw error;
  }
};

export const searchItems = async (query) => {
  try {
    const response = await api.get("/api/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("API Error searching items:", error);
    throw error;
  }
};

export const getSubSubCategory = async (id) => {
  try {
    const response = await axios.get(`/service/getAllServices/${id}`);
    console.log(response, "get subsubcaate");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("API Error logging in:", error);
    throw error;
  }
};

// Case Study API
export const addCaseStudy = async (data) => {
  try {
    const response = await api.post("/casestudy/create-casestudy", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "create case study");
    return response.data;
  } catch (error) {
    console.error("API Error adding case study:", error.response || error);
    throw error;
  }
};

export const getCaseStudies = async () => {
  try {
    const response = await api.get("/casestudy/getAllcasestudy");
    console.log(response, "casestudy studydata");
    return response.data;
  } catch (error) {
    console.error("API Error fetching case studies:", error);
    throw error;
  }
};

export const getCaseStudyById = async (id) => {
  try {
    const response = await api.get(`/casestudy/getcasestudyById/${id}`);
    console.log(response,"single casestudy")
    return response.data;
  } catch (error) {
    console.error("API Error fetching case study by ID:", error);
    throw error;
  }
};

export const updateCaseStudy = async (id, data) => {
  try {
    // For file uploads, change Content-Type to multipart/form-data
    const response = await api.put(`/casestudy/update-casestudy/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "update respons data");
    return response.data;
  } catch (error) {
    console.error("API Error updating case study:", error.response || error);
    throw error;
  }
};

// export const updateCaseStudyStatus = async (id, status) => {
//   try {
//     // For file uploads, change Content-Type to multipart/form-data
//     const response = await api.patch(
//       `/casestudy/update-status/${id}`,
//       { status },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log(response, "response data");
//     return response.data;
//   } catch (error) {
//     console.error("API Error updating case study:", error.response || error);
//     throw error;
//   }
// };
export const updateCaseStudyStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/casestudy/update-status/${id}`,
      { status } // ✅ JSON body
    );

    console.log(response, "response data");
    return response.data;
  } catch (error) {
    console.error("API Error updating case study:", error.response || error);
    throw error;
  }
};

export const deleteCaseStudy = async (id) => {
  try {
    const response = await api.delete(`/casestudy/delete-casestudy/${id}`);
    console.log(response, "deletecase study");
    return response.data;
  } catch (error) {
    console.error("API Error deleting case study:", error.response || error);
    throw error;
  }
};

export const uploadSectionImage = async (imageData) => {
  try {
    const response = await api.post("/upload-section-image", imageData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading section image:", error);
    throw error;
  }
};

// NEW FAQ API FUNCTIONS
export const addFAQ = async (data) => {
  try {
    const response = await api.post("/faq/create-faq", data);
    return response.data;
  } catch (error) {
    console.error("API Error adding FAQ:", error.response?.data || error);
    throw error;
  }
};

export const getFAQs = async () => {
  try {
    const response = await api.get("/faq/getAllFaq");
    console.log(response, "faq response data");
    return response.data;
  } catch (error) {
    console.error("API Error fetching FAQs:", error);
    throw error;
  }
};

export const getFAQById = async (id) => {
  try {
    const response = await api.get(`/faq/getFaq/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error fetching FAQ by ID:", error);
    throw error;
  }
};

export const updateFAQ = async (id, data) => {
  try {
    const response = await api.put(`/faq/update-faq/${id}`, data);

    return response.data;
  } catch (error) {
    console.error("API Error updating FAQ:", error.response?.data || error);
    throw error;
  }
};

export const updateFAQStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/faq/update-status/${id}`,
      { status } // ✅ send object
    );
    console.log(response, "updatestatus data");
    return response.data;
  } catch (error) {
    console.error("API Error updating FAQ:", error.response?.data || error);
    throw error;
  }
};

export const deleteFAQ = async (id) => {
  try {
    const response = await api.delete(`/faq/delete-Faq/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error deleting FAQ:", error.response?.data || error);
    throw error;
  }
};

// NEW BLOG API FUNCTIONS
export const addBlog = async (data) => {
  try {
    const response = await api.post("/blog/create-blogs", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(response, "create blogs");
    return response.data;
  } catch (error) {
    console.error("API Error adding blog:", error.response?.data || error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await api.get("/blog/getAllBlog");
    // console.log(response, "response blogsdata");/
    return response.data;
  } catch (error) {
    console.error("API Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/getBlogById/${id}`);
    // console.log(response,"response single blog  data");
    return response.data;
  } catch (error) {
    console.error("API Error fetching blog by ID:", error);
    throw error;
  }
};

export const updateBlog = async (id, data) => {
  try {
    const response = await api.put(`/blog/update-blog/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });
    console.log(response, "update blogs ");
    return response.data;
  } catch (error) {
    console.error("API Error updating blog:", error.response?.data || error);
    throw error;
  }
};

export const updateBlogStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/blog/update-status/${id}`,
      { status }
      //   {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', // Important for file uploads
      //   },
      // }
    );
    console.log(response, "updatestatusBlogs blogs");
    return response.data;
  } catch (error) {
    console.error("API Error updating blog:", error.response?.data || error);
    throw error;
  }
};
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/delete-blog/${id}`);
    console.log(response, "delete blogs");
    return response.data;
  } catch (error) {
    console.error("API Error deleting blog:", error.response?.data || error);
    throw error;
  }
};

export default api;
