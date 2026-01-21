// api.js
import axios from 'axios';

const api = axios.create({
  // Change this baseURL to your local backend server URL
  // When deploying, you'll change this to your deployed backend URL (e.g., 'https://api.unicx.in')
  baseURL: 'https://api.unicx.in', // Changed for local development
  headers: {
    'Content-Type': 'application/json'
  }
});

// Categories API
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('API Error fetching categories:', error);
    throw error;
  }
};

export const addCategory = async (name) => {
  try {
    const response = await api.post('/add-category', { name });
    return response.data;
  } catch (error) {
    console.error('API Error adding category:', error.response || error);
    throw error;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await api.put(`/update-category/${id}`, { name });
    return response.data;
  } catch (err) {
    console.error('Update Error:', err.response?.data || err);
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/delete-category/${id}`);
    return response.data;
  } catch (err) {
    console.error('Delete Error:', err.response?.data || err);
    throw err;
  }
};

// Subcategories API
export const addSubCategory = async (data) => {
  try {
    const response = await api.post('/add-subcategory', data);
    return response.data;
  }  catch (error) {
    console.error('API Error adding subcategory:', error.response || error);
    throw error;
  }
};

export const getSubCategories = async () => {
  try {
    const response = await api.get('/subcategories');
    return response.data;
  } catch (error) {
    console.error('API Error fetching subcategories:', error);
    throw error;
  }
};

export const updateSubCategory = async (id, data) => {
  try {
    const response = await api.put(`/update-subcategory/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('API Error updating subcategory:', error.response || error);
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await api.delete(`/delete-subcategory/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error deleting subcategory:', error.response || error);
    throw error;
  }
};

// Users API
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('API Error fetching users:', error);
    throw error;
  }
};

// Sub-Sub-Categories API
export const getSubSubCategories = async () => {
    try {
      const response = await api.get('/subsubcategories');
      return response.data;
    } catch (error) {
      console.error('API Error fetching sub-sub-categories:', error);
      throw error;
    }
  };

  export const addSubSubCategory = async (data) => {
    try {
      const response = await api.post('/add-subsubcategory', data);
      return response.data;
    } catch (error) {
      console.error('API Error adding sub-sub-category:', error.response || error);
      throw error;
    }
  };

  export const updateSubSubCategory = async (id, data) => {
    try {
      const response = await api.put(`/update-subsubcategory/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('API Error updating sub-sub-category:', error.response || error);
      throw error;
    }
  };

  export const deleteSubSubCategory = async (id) => {
    try {
      const response = await api.delete(`/delete-subsubcategory/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error deleting sub-sub-category:', error.response || error);
      throw error;
    }
  };


// api.js
export const getSubSubCategoryById = async (id) => {
  try {
    const response = await api.get(`/subsubcategories/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error fetching sub-sub-category by ID:', error);
    throw error;
  }
};

export const searchItems = async (query) => {
  try {
    const response = await api.get('/api/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('API Error searching items:', error);
    throw error;
  }
};

export const getSubSubCategory = async (id) => {
  try {
    const response = await axios.get(`/subsubcategories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser= async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('API Error logging in:', error);
    throw error;
  }
};

// Case Study API
export const addCaseStudy = async (data) => {
  try {
    const response = await api.post('/add-casestudy', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error adding case study:', error.response || error);
    throw error;
  }
};

export const getCaseStudies = async () => {
  try {
    const response = await api.get('/case-studies');
    return response.data;
  } catch (error) {
    console.error('API Error fetching case studies:', error);
    throw error;
  }
};

export const getCaseStudyById = async (id) => {
  try {
    const response = await api.get(`/case-studies/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error fetching case study by ID:', error);
    throw error;
  }
};

export const updateCaseStudy = async (id, data) => {
  try {
    // For file uploads, change Content-Type to multipart/form-data
    const response = await api.put(`/update-casestudy/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error updating case study:', error.response || error);
    throw error;
  }
};

export const deleteCaseStudy = async (id) => {
  try {
    const response = await api.delete(`/delete-casestudy/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error deleting case study:', error.response || error);
    throw error;
  }
};

export const uploadSectionImage = async (imageData) => {
  try {
    const response = await api.post('/upload-section-image', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading section image:', error);
    throw error;
  }
};

// NEW FAQ API FUNCTIONS
export const addFAQ = async (data) => {
  try {
    const response = await api.post('/add-faq', data);
    return response.data;
  } catch (error) {
    console.error('API Error adding FAQ:', error.response?.data || error);
    throw error;
  }
};

export const getFAQs = async () => {
  try {
    const response = await api.get('/faqs');
    return response.data;
  } catch (error) {
    console.error('API Error fetching FAQs:', error);
    throw error;
  }
};

export const getFAQById = async (id) => {
  try {
    const response = await api.get(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error fetching FAQ by ID:', error);
    throw error;
  }
};

export const updateFAQ = async (id, data) => {
  try {
    const response = await api.put(`/update-faq/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('API Error updating FAQ:', error.response?.data || error);
    throw error;
  }
};

export const deleteFAQ = async (id) => {
  try {
    const response = await api.delete(`/delete-faq/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error deleting FAQ:', error.response?.data || error);
    throw error;
  }
};

// NEW BLOG API FUNCTIONS
export const addBlog = async (data) => {
  try {
    const response = await api.post('/add-blog', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error adding blog:', error.response?.data || error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.error('API Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error fetching blog by ID:', error);
    throw error;
  }
};

export const updateBlog = async (id, data) => {
  try {
    const response = await api.put(`/update-blog/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error updating blog:', error.response?.data || error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/delete-blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error deleting blog:', error.response?.data || error);
    throw error;
  }
};


export default api;
