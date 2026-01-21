/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Sidebar from '../layouts/sidebar';
import {
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaRss as BlogIcon, // Changed from CaseStudyIcon to BlogIcon
  FaTags as SubCategoryIcon,
  FaBoxes as SubSubCategoryIcon,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Import all necessary API functions and the default api instance
// Assuming these API functions are now for blogs
import api, { addBlog, getCategories, getBlogs, updateBlog, deleteBlog } from '../api';

function BlogManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState(''); // Renamed from description
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState(''); // Renamed from additionalDetails
  const [blogImage, setBlogImage] = useState(null); // Renamed from caseStudyImage
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // To display existing image when editing
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]); // Renamed from caseStudies
  const [editingBlogId, setEditingBlogId] = useState(null); // Renamed from editingCaseStudyId
  const [tags, setTags] = useState(''); // New state for tags

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // States for custom confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null); // Function to call on confirm

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/add-category', name: 'Add Category', icon: <CategoryIcon /> },
    { path: '/admin/add-subcategory', name: 'Add SubCategory', icon: <SubCategoryIcon /> },
    { path: '/admin/add-subsubcategory', name: 'Add SubSubCategory', icon: <SubSubCategoryIcon /> },
    { path: '/admin/manage-blogs', name: 'Manage Blogs', icon: <BlogIcon /> }, // Updated path and name
  ];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Function to reset the form fields
  const resetForm = () => {
    setTitle('');
    setShortDescription('');
    setCategoryId('');
    setContent('');
    setBlogImage(null);
    setCurrentImageUrl('');
    setEditingBlogId(null);
    setTags(''); // Reset tags field
  };

  // Fetch categories and blogs on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        await refreshBlogs(); // Fetch blogs after categories
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setErrorMessage('Failed to load initial data.');
      }
    };
    fetchInitialData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Fetch blogs whenever a change occurs (add/update/delete)
  const refreshBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setErrorMessage('Failed to load blogs.');
    }
  };

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
    // Clear currentImageUrl when a new file is selected, as the new file will replace it
    setCurrentImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous messages
    setErrorMessage('');

    if (!title.trim() || !shortDescription.trim() || !content.trim() || !categoryId) {
      setErrorMessage('Please fill in all required fields (Title, Short Description, Content, Category).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('short_description', shortDescription); // Changed field name
      formData.append('category_id', parseInt(categoryId));
      formData.append('content', content); // Changed field name
      formData.append('tags', tags); // Append tags

      if (blogImage) {
        formData.append('image', blogImage); // Append the new image file
      } else if (currentImageUrl && editingBlogId) {
        // Only append image_url if no new image is selected and we are editing
        formData.append('image_url', currentImageUrl.replace(api.defaults.baseURL, '')); // Send relative path back
      }

      let response;
      if (editingBlogId) {
        // Update existing blog
        response = await updateBlog(editingBlogId, formData);
        setSuccessMessage(response.message || 'Blog updated successfully!');
      } else {
        // Add new blog
        response = await addBlog(formData);
        setSuccessMessage(response.message || 'Blog added successfully!');
      }

      resetForm(); // Clear form fields
      refreshBlogs(); // Refresh the list of blogs

    } catch (error) {
      console.error('Error submitting blog:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to save blog. Please try again.');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setShortDescription(blog.short_description); // Updated field name
    setCategoryId(blog.category_id.toString()); // Ensure it's a string for select input
    setContent(blog.content); // Updated field name
    setTags(blog.tags || ''); // Populate tags field
    setCurrentImageUrl(blog.image_url ? `${api.defaults.baseURL}${blog.image_url}` : ''); // Set current image for preview with full URL
    setBlogImage(null); // Clear file input so user can choose a new one
  };

  const handleDeleteClick = (id) => {
    setModalMessage('Are you sure you want to delete this blog? This action cannot be undone.');
    setModalAction(() => async () => {
      try {
        const response = await deleteBlog(id);
        setSuccessMessage(response.message);
        refreshBlogs(); // Refresh the list
      } catch (error) {
        console.error('Error deleting blog:', error);
        setErrorMessage(error.response?.data?.message || 'Failed to delete blog. Please try again.');
      } finally {
        setShowConfirmModal(false); // Close the modal
      }
    });
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const handleModalClose = () => {
    setShowConfirmModal(false);
    setModalAction(null);
  };

  return (
    <>
      <style>
        {`
        .quill .ql-editor {
          min-height: 250px;
          height: auto;
          max-height: 400px;
          overflow-y: auto;
        }
        .quill {
            height: auto;
        }
        .message-box {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
        }
        .message-box.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message-box.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .action-buttons button {
          margin-right: 5px;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 0.9em;
        }
        .action-buttons .edit-btn {
          background-color: #007bff;
          color: white;
        }
        .action-buttons .delete-btn {
          background-color: #dc3545;
          color: white;
        }
        .table-container {
          overflow-x: auto;
        }
        .blog-table th, .blog-table td {
            white-space: nowrap; /* Prevent text wrapping in table cells */
            overflow: hidden;
            text-overflow: ellipsis; /* Add ellipsis for overflow */
            max-width: 150px; /* Adjusted max-width for better fit */
        }
        .blog-table td.short-description-cell {
          max-width: 250px; /* Allow more width for description */
        }
        .blog-table td.content-cell {
          max-width: 300px; /* Allow more width for content */
        }
        .blog-table td.tags-cell { /* New class for tags column */
          max-width: 150px;
        }
        .blog-image {
          width: 80px;
          height: auto;
          border-radius: 5px;
          object-fit: cover; /* Ensures image covers the area nicely */
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }
        .modal-content-custom {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .modal-content-custom h5 {
          margin-bottom: 20px;
          color: #333;
        }
        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        .modal-buttons button {
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .modal-buttons .confirm-btn {
          background-color: #dc3545;
          color: white;
          border: none;
        }
        .modal-buttons .cancel-btn {
          background-color: #6c757d;
          color: white;
          border: none;
        }
        `}
      </style>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-5"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? '250px' : '80px',
          width: sidebarOpen ? 'calc(100% - 240px)' : 'calc(100% - 80px)',
          zIndex: 1030,
          transition: 'left 0.3s ease, width 0.3s ease',
        }}
      >
        <div className="container-fluid">
          <h4 className="mb-0 fw-semibold fs-4">Blog Management</h4>
        </div>
      </nav>

      <div className="d-flex" style={{ paddingTop: '20px' }}>
        <Sidebar isOpen={sidebarOpen} menuItems={menuItems} toggleSidebar={toggleSidebar} />

        <div
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? '250px' : '80px',
            padding: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-12">
                {successMessage && (
                  <div className="message-box success">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="message-box error">
                    {errorMessage}
                  </div>
                )}

                {/* Form for adding/editing blogs */}
                <form onSubmit={handleSubmit} className="mb-4">
                  <h5 className="mb-3">{editingBlogId ? 'Edit Blog' : 'Add New Blog'}</h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Enter short description/excerpt"
                      rows="3"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="blogImage" className="form-label">Upload Blog Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="blogImage"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {currentImageUrl && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <img src={currentImageUrl} alt="Current Blog" className="blog-image" />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contentEditor" className="form-label">Blog Content</label>
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter blog content here..."
                      className="form-control-quill"
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags (comma-separated)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                      
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    {editingBlogId ? 'Update Blog' : 'Add Blog'}
                  </button>
                  {editingBlogId && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>

                {/* Display existing blogs */}
                <h5 className="mb-3 mt-5">Existing Blogs</h5>
                {blogs.length > 0 ? (
                  <div className="table-container">
                    <table className="table table-bordered table-hover blog-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Short Description</th>
                          <th>Category</th>
                          <th>Content</th>
                          <th>Tags</th> {/* New column header for tags */}
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((blog) => (
                          <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td>{blog.title}</td>
                            <td className="short-description-cell">{blog.short_description}</td>
                            <td>{blog.category_name}</td>
                            <td className="content-cell" dangerouslySetInnerHTML={{ __html: blog.content }}></td> {/* Render HTML content */}
                            <td className="tags-cell">{blog.tags}</td> {/* Display tags */}
                            <td>
                              {blog.image_url ? (
                                <img src={`${api.defaults.baseURL}${blog.image_url}`} alt={blog.title} className="blog-image" />
                              ) : (
                                <img src="https://placehold.co/80x50/e0e0e0/555555?text=No+Image" alt="No Image" className="blog-image" />
                              )}
                            </td>
                            <td className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => handleEdit(blog)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteClick(blog.id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No blogs found. Add one using the form above!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content-custom">
            <h5>{modalMessage}</h5>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={modalAction}>Confirm</button>
              <button className="cancel-btn" onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogManagement;
