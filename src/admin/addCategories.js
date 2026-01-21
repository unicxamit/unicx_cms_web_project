import React, { useState, useEffect } from 'react';
import Sidebar from '../layouts/sidebar';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../api';
import {
  FaBars,
  FaTimes,
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaTags as SubCategoryIcon,
   FaFileAlt as CaseStudyIcon,
  FaBoxes as SubSubCategoryIcon,
} from 'react-icons/fa';

function AddCategories() {
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/add-category', name: 'Add Category', icon: <CategoryIcon /> },
    { path: '/admin/add-subcategory', name: 'Add SubCategory', icon: <SubCategoryIcon /> },
    { path: '/admin/add-subsubcategory', name: 'Add SubSubCategory', icon: <SubSubCategoryIcon /> },
    { path: '/admin/add-casestudy', name: 'Add Case Study', icon: <CaseStudyIcon /> }, // New menu item
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setMessage('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage('Please enter a category name.');
      return;
    }

    try {
      setLoading(true);
      if (editId) {
        const res = await updateCategory(editId, name);
        setMessage(res.message);
      } else {
        const res = await addCategory(name);
        setMessage(res.message);
      }

      setName('');
      setEditId(null);
      await fetchCategories();
    } catch (err) {
      setMessage('Error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const res = await deleteCategory(id);
      setMessage(res.message);
      await fetchCategories();
    } catch (err) {
      setMessage('Failed to delete category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          <h4 className="mb-0 fw-semibold fs-4">Category Management</h4>
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
              <div className="col-lg-10 col-xl-8">
                <h2 className="mb-4 mt-5 text-center">
                  {editId ? 'Update Category' : 'Add New Category'}
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn ${editId ? 'btn-warning' : 'btn-primary'} w-100`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : editId ? (
                      'Update Category'
                    ) : (
                      'Add Category'
                    )}
                  </button>
                </form>

                {message && (
                  <div
                    className={`alert ${
                      message.toLowerCase().includes('success')
                        ? 'alert-success'
                        : 'alert-danger'
                    }`}
                  >
                    {message}
                  </div>
                )}

                <h3 className="mt-4">Category List</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="3" className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) : categories.length > 0 ? (
                        categories.map((cat) => (
                          <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>
                              <button
                                onClick={() => handleEdit(cat)}
                                className="btn btn-warning btn-sm me-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(cat.id)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No categories found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategories;