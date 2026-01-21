import React, { useState, useEffect } from 'react';
import Sidebar from '../layouts/sidebar';
import {
  FaBars,
  FaTimes,
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaTags as SubCategoryIcon,
  FaBoxes as SubSubCategoryIcon,
} from 'react-icons/fa';
import {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategories,
} from '../api';

function AddSubCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/add-category', name: 'Add Category', icon: <CategoryIcon /> },
    { path: '/admin/add-subcategory', name: 'Add SubCategory', icon: <SubCategoryIcon /> },
    { path: '/admin/add-subsubcategory', name: 'Add SubSubCategory', icon: <SubSubCategoryIcon /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subCats, cats] = await Promise.all([
        getSubCategories(),
        getCategories(),
      ]);
      setSubCategories(subCats);
      setCategories(cats);
    } catch (err) {
      setMessage('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      if (editId) {
        const res = await updateSubCategory(editId, { name, category_id: categoryId });
        setMessage(res.message);
      } else {
        const res = await addSubCategory({ name, category_id: categoryId });
        setMessage(res.message);
      }

      setName('');
      setCategoryId('');
      setEditId(null);
      await fetchData();
    } catch (err) {
      setMessage('Error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setCategoryId(item.category_id);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this SubCategory?')) return;

    try {
      setLoading(true);
      const res = await deleteSubCategory(id);
      setMessage(res.message);
      await fetchData();
    } catch (err) {
      setMessage('Failed to delete subcategory.');
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
          <h4 className="mb-0 fw-semibold fs-4">Sub Category Management</h4>
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
                  {editId ? 'Update SubCategory' : 'Add New SubCategory'}
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter subcategory name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
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
                    className={`btn ${editId ? 'btn-warning' : 'btn-primary'} w-100`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : editId ? (
                      'Update SubCategory'
                    ) : (
                      'Add SubCategory'
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

                <h3 className="mt-4">SubCategory List</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Parent Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) : subCategories.length > 0 ? (
                        subCategories.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                              {categories.find(cat => cat.id === item.category_id)?.name || 'N/A'}
                            </td>
                            <td>
                              <button
                                onClick={() => handleEdit(item)}
                                className="btn btn-warning btn-sm me-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No subcategories found.
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

export default AddSubCategory;