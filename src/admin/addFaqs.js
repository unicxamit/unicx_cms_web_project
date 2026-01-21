/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Sidebar from '../layouts/sidebar';
import {
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaQuestionCircle as FAQIcon,
  FaTags as SubCategoryIcon,
  FaBoxes as SubSubCategoryIcon,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

// Import all necessary API functions
import { getCategories, addFAQ, getFAQs, updateFAQ, deleteFAQ } from '../api';

function FAQManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [faqs, setFAQs] = useState([]); // State to store fetched FAQs
  const [editingFAQId, setEditingFAQId] = useState(null); // Tracks the ID of the FAQ being edited

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/add-category', name: 'Add Category', icon: <CategoryIcon /> },
    { path: '/admin/add-subcategory', name: 'Add SubCategory', icon: <SubCategoryIcon /> },
    { path: '/admin/add-subsubcategory', name: 'Add SubSubCategory', icon: <SubSubCategoryIcon /> },
    { path: '/admin/manage-faqs', name: 'Manage FAQs', icon: <FAQIcon /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Function to reset the form fields
  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setCategoryId('');
    setEditingFAQId(null);
  };

  // Fetch categories and FAQs on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        await refreshFAQs(); // Fetch FAQs after categories
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setErrorMessage('Failed to load initial data.');
      }
    };
    fetchInitialData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Fetch FAQs from API
  const refreshFAQs = async () => {
    try {
      const data = await getFAQs();
      setFAQs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setErrorMessage('Failed to load FAQs.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!question.trim() || !answer.trim() || !categoryId) {
        setErrorMessage('Please fill in all required fields (Question, Answer, Category).');
        return;
    }

    try {
      const faqData = {
        question: question,
        answer: answer,
        category_id: parseInt(categoryId),
      };

      let response;
      if (editingFAQId) {
        // Update existing FAQ using API
        response = await updateFAQ(editingFAQId, faqData);
        setSuccessMessage(response.message || 'FAQ updated successfully!');
      } else {
        // Add new FAQ using API
        response = await addFAQ(faqData);
        setSuccessMessage(response.message || 'FAQ added successfully!');
      }

      resetForm(); // Clear form fields
      await refreshFAQs(); // Refresh the list of FAQs from the API

    } catch (error) {
      console.error('Error submitting FAQ:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to save FAQ. Please try again.');
    }
  };

  const handleEdit = (faq) => {
    setEditingFAQId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategoryId(faq.category_id.toString()); // Ensure it's a string for select input
  };

  const handleDeleteClick = (id) => {
    setModalMessage('Are you sure you want to delete this FAQ? This action cannot be undone.');
    setModalAction(() => async () => {
      try {
        const response = await deleteFAQ(id); // Delete FAQ using API
        setSuccessMessage(response.message);
        await refreshFAQs(); // Refresh the list from the API
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        setErrorMessage(error.response?.data?.message || 'Failed to delete FAQ. Please try again.');
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
        .faq-table th, .faq-table td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px; /* Adjusted max-width for FAQ columns */
        }
        .faq-table td.question-cell, .faq-table td.answer-cell {
          max-width: 300px; /* Allow more width for question and answer */
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
          <h4 className="mb-0 fw-semibold fs-4">FAQ Management</h4>
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

                {/* Form for adding/editing FAQs */}
                <form onSubmit={handleSubmit} className="mb-4">
                  <h5 className="mb-3">{editingFAQId ? 'Edit FAQ' : 'Add New FAQ'}</h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter FAQ question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="answerTextarea" className="form-label">Answer</label>
                    <textarea
                      className="form-control"
                      id="answerTextarea"
                      rows="7" // Increased rows for better visibility
                      placeholder="Enter FAQ answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    ></textarea>
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
                    {editingFAQId ? 'Update FAQ' : 'Add FAQ'}
                  </button>
                  {editingFAQId && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>

                {/* Display existing FAQs */}
                <h5 className="mb-3 mt-5">Existing FAQs</h5>
                {faqs.length > 0 ? (
                  <div className="table-container">
                    <table className="table table-bordered table-hover faq-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq) => (
                          <tr key={faq.id}>
                            <td>{faq.id}</td>
                            <td className="question-cell">{faq.question}</td>
                            <td className="answer-cell">{faq.answer}</td>
                            <td>{faq.category_name}</td>
                            <td className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => handleEdit(faq)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteClick(faq.id)}
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
                  <p>No FAQs found. Add one using the form above!</p>
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

export default FAQManagement;
