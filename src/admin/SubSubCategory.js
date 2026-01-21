import React, { useState, useEffect } from 'react';
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
  addSubSubCategory,
  updateSubSubCategory,
  deleteSubSubCategory
} from '../api';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaTh as DashboardIcon,
  FaLayerGroup as CategoryIcon,
  FaTags as SubCategoryIcon,
    FaFileAlt as CaseStudyIcon,
  FaBoxes as SubSubCategoryIcon,
} from 'react-icons/fa';
import Sidebar from '../layouts/sidebar';

function SubSubCategory() {
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [name, setName] = useState('');
  const [templateKey, setTemplateKey] = useState('');
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/add-category', name: 'Add Category', icon: <CategoryIcon /> },
    { path: '/admin/add-subcategory', name: 'Add SubCategory', icon: <SubCategoryIcon /> },
    { path: '/admin/add-subsubcategory', name: 'Add SubSubCategory', icon: <SubSubCategoryIcon /> },
    { path: '/admin/add-casestudy', name: 'Add Case Study', icon: <CaseStudyIcon /> }, // New menu item
    
  ];

  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchCategories();
    fetchSubSubCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId);
    } else {
      setSubCategories([]);
      setFilteredSubCategories([]);
      setSubCategoryId('');
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId && subCategories.length > 0) {
      const filtered = subCategories.filter(sub => sub.category_id == categoryId);
      setFilteredSubCategories(filtered);

      if (subCategoryId && !filtered.some(sub => sub.id == subCategoryId)) {
        setSubCategoryId('');
      }
    }
  }, [categoryId, subCategories, subCategoryId]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setMessage('Failed to fetch categories.');
      console.error(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const data = await getSubCategories();
      setSubCategories(data);
      const filtered = data.filter(sub => sub.category_id == categoryId);
      setFilteredSubCategories(filtered);
    } catch (error) {
      setMessage('Failed to fetch subcategories.');
      console.error(error);
    }
  };

  const fetchSubSubCategories = async () => {
    setLoading(true);
    try {
      const data = await getSubSubCategories();
      setSubSubCategories(data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch sub-sub-categories.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || !subCategoryId || !name.trim()) {
      setMessage('Please select category, subcategory and enter name.');
      return;
    }

    try {
      setLoading(true);
      let res;
      if (editId) {
        res = await updateSubSubCategory(editId, {
          category_id: categoryId,
          subcategory_id: subCategoryId,
          name,
           templateKey,
        });
      } else {
        res = await addSubSubCategory({
          category_id: categoryId,
          subcategory_id: subCategoryId,
          name,
           templateKey,
        });
      }
      setMessage(res.message);

      // Reset form
      setCategoryId('');
      setSubCategoryId('');
      setName('');
      setEditId(null);
      await fetchSubSubCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred while saving.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setCategoryId(item.category_id);
    setSubCategoryId(item.subcategory_id);
    setName(item.name);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sub-sub-category?')) return;

    try {
      setLoading(true);
      const res = await deleteSubSubCategory(id);
      setMessage(res.message);
      await fetchSubSubCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete sub-sub-category.');
      console.error(error);
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
          <h4 className="mb-0 fw-semibold fs-4">Sub-Sub-Category Management</h4>
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
                <h2 className="mb-4 mt-5 text-center">
                  {editId ? 'Update Sub-Sub-Category' : 'Add New Sub-Sub-Category'}
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select
                        id="category"
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="subcategory" className="form-label">Subcategory</label>
                      <select
                        id="subcategory"
                        className="form-select"
                        value={subCategoryId}
                        onChange={(e) => setSubCategoryId(e.target.value)}
                        required
                        disabled={!categoryId}
                      >
                        <option value="">Select Subcategory</option>
                        {filteredSubCategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                      </select>
                    </div>

                        <div className="col-md-4">
                        <label htmlFor="templateKey" className="form-label">Template</label>
                        <select
                          id="templateKey"
                          className="form-select"
                          value={templateKey}
                          onChange={(e) => setTemplateKey(e.target.value)}
                          required
                        >
                          <option value="">Select Template</option>
                          <option value="llp_page1">  Page 1</option>
                          <option value="llp_page2">  Page 2</option>
                          <option value="llp_page3">  Page 3</option>
                          <option value="llp_page4">  Page 4</option>
                          <option value="llp_page5">  Page 5</option>
                          {/* Add more templates here as needed */}
                        </select>
                      </div>



                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter sub-sub-category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className={`btn w-100 ${editId ? 'btn-warning' : 'btn-primary'}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : editId ? (
                        'Update Sub-Sub-Category'
                      ) : (
                        'Add Sub-Sub-Category'
                      )}
                    </button>
                  </div>
                </form>

                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                  </div>
                )}

                <div className="card mt-4">
                  <div className="card-header">
                    <h3 className="mb-0">Sub-Sub-Category List</h3>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : subSubCategories.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Category</th>
                              <th>Subcategory</th>
                              <th>Name</th>
                              <th>TemplateKey</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subSubCategories.map((item) => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.category_name}</td>
                                <td>{item.subcategory_name}</td>
                                <td>{item.name}</td>
                                <td>{item.templateKey}</td>
                                <td>
                                  <div className="d-flex flex-wrap gap-2">
                                    <button
                                      onClick={() => handleEdit(item)}
                                      className="btn btn-sm btn-warning"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="btn btn-sm btn-danger"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => navigate(`/admin/subsubcategory-details/${item.id}`)}
                                      className="btn btn-sm btn-primary"
                                    >
                                      Add Section
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4">No sub-sub-categories found.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubSubCategory;