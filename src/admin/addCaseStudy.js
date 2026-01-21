/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Sidebar from '../layouts/sidebar';
import {
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaFileAlt as CaseStudyIcon,
  FaTags as SubCategoryIcon,
  FaBoxes as SubSubCategoryIcon,
  FaEdit, // Import for edit icon
  FaTrash // Import for delete icon
} from 'react-icons/fa';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Import all necessary API functions and the default api instance
import api, { addCaseStudy, getCategories, getCaseStudies, updateCaseStudy, deleteCaseStudy } from '../api';

function CaseStudyManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [caseStudyImage, setCaseStudyImage] = useState(null); // State for the image file
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // To display existing image when editing
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [caseStudies, setCaseStudies] = useState([]); // State to store fetched case studies
  const [editingCaseStudyId, setEditingCaseStudyId] = useState(null); // Tracks the ID of the case study being edited

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
    { path: '/admin/add-casestudy', name: 'Manage Case Studies', icon: <CaseStudyIcon /> },
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
    setDescription('');
    setClientName('');
    setCategoryId('');
    setAdditionalDetails('');
    setCaseStudyImage(null);
    setCurrentImageUrl('');
    setEditingCaseStudyId(null);
  };

  // Fetch categories and case studies on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const caseStudiesData = await getCaseStudies();
        setCaseStudies(caseStudiesData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setErrorMessage('Failed to load initial data.');
      }
    };
    fetchInitialData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Fetch case studies whenever a change occurs (add/update/delete)
  const refreshCaseStudies = async () => {
    try {
      const data = await getCaseStudies();
      setCaseStudies(data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setErrorMessage('Failed to load case studies.');
    }
  };

  const handleImageChange = (e) => {
    setCaseStudyImage(e.target.files[0]);
    // Clear currentImageUrl when a new file is selected, as the new file will replace it
    setCurrentImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous messages
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('client_name', clientName);
      formData.append('category_id', parseInt(categoryId));
      formData.append('additional_details', additionalDetails);

      if (caseStudyImage) {
        formData.append('image', caseStudyImage); // Append the new image file
      } else if (currentImageUrl && editingCaseStudyId) {
        // If no new image is selected but we are editing, send the old URL
        // The backend expects 'image_url' for existing images if no new file is provided.
        formData.append('image_url', currentImageUrl);
      }

      let response;
      if (editingCaseStudyId) {
        // Update existing case study
        response = await updateCaseStudy(editingCaseStudyId, formData);
        setSuccessMessage(response.message || 'Case Study updated successfully!');
      } else {
        // Add new case study
        response = await addCaseStudy(formData);
        setSuccessMessage(response.message || 'Case Study added successfully!');
      }

      resetForm(); // Clear form fields
      refreshCaseStudies(); // Refresh the list of case studies

    } catch (error) {
      console.error('Error submitting case study:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to save case study. Please try again.');
    }
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudyId(caseStudy.id);
    setTitle(caseStudy.title);
    setDescription(caseStudy.description);
    setClientName(caseStudy.client_name);
    setCategoryId(caseStudy.category_id.toString()); // Ensure it's a string for select input
    setAdditionalDetails(caseStudy.additional_details);
    setCurrentImageUrl(caseStudy.image_url ? `${api.defaults.baseURL}${caseStudy.image_url}` : ''); // Set current image for preview with full URL
    setCaseStudyImage(null); // Clear file input so user can choose a new one
  };

  const handleDeleteClick = (id) => {
    setModalMessage('Are you sure you want to delete this case study? This action cannot be undone.');
    setModalAction(() => async () => {
      try {
        const response = await deleteCaseStudy(id);
        setSuccessMessage(response.message);
        refreshCaseStudies(); // Refresh the list
      } catch (error) {
        console.error('Error deleting case study:', error);
        setErrorMessage(error.response?.data?.message || 'Failed to delete case study. Please try again.');
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
        .case-study-table th, .case-study-table td {
            white-space: nowrap; /* Prevent text wrapping in table cells */
            overflow: hidden;
            text-overflow: ellipsis; /* Add ellipsis for overflow */
            max-width: 150px; /* Adjusted max-width for better fit */
        }
        .case-study-table td.description-cell {
          max-width: 250px; /* Allow more width for description */
        }
        .case-study-table td.additional-details-cell {
          max-width: 300px; /* Allow more width for additional details */
        }
        .case-study-image {
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
          <h4 className="mb-0 fw-semibold fs-4">Case Study Management</h4>
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

                {/* Form for adding/editing case studies */}
                <form onSubmit={handleSubmit} className="mb-4">
                  <h5 className="mb-3">{editingCaseStudyId ? 'Edit Case Study' : 'Add New Case Study'}</h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter case study title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Enter case study description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter client name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="caseStudyImage" className="form-label">Upload Case Study Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="caseStudyImage"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {currentImageUrl && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <img src={currentImageUrl} alt="Current Case Study" className="case-study-image" />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="additionalDetailsEditor" className="form-label">Additional Details (e.g., challenges, solutions, results)</label>
                    <ReactQuill
                      theme="snow"
                      value={additionalDetails}
                      onChange={setAdditionalDetails}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter additional details here..."
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

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    {editingCaseStudyId ? 'Update Case Study' : 'Add Case Study'}
                  </button>
                  {editingCaseStudyId && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>

                {/* Display existing case studies */}
                <h5 className="mb-3 mt-5">Existing Case Studies</h5>
                {caseStudies.length > 0 ? (
                  <div className="table-container">
                    <table className="table table-bordered table-hover case-study-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Client Name</th>
                          <th>Category</th>
                          <th>Additional Details</th> {/* Added new column header */}
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caseStudies.map((cs) => (
                          <tr key={cs.id}>
                            <td>{cs.id}</td>
                            <td>{cs.title}</td>
                            <td className="description-cell">{cs.description}</td>
                            <td>{cs.client_name}</td>
                            <td>{cs.category_name}</td>
                            <td className="additional-details-cell" dangerouslySetInnerHTML={{ __html: cs.additional_details }}></td> {/* Render HTML content */}
                            <td>
                              {cs.image_url ? (
                                <img src={`${api.defaults.baseURL}${cs.image_url}`} alt={cs.title} className="case-study-image" />
                              ) : (
                                <img src="https://placehold.co/80x50/e0e0e0/555555?text=No+Image" alt="No Image" className="case-study-image" />
                              )}
                            </td>
                            <td className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => handleEdit(cs)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteClick(cs.id)}
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
                  <p>No case studies found. Add one using the form above!</p>
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

export default CaseStudyManagement;
