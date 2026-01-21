import React, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
  addBlog,
  addCategory,
  deleteBlog,
  getBlogs,
  getCategories,
  updateBlog,
  updateBlogStatus,
} from "../adminApi";
import Loader from "../app/common/loader";


const Blogs = () => {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    short_description: "",
    content: "",
    tage: "",

    status: "active",
  });
  const [images, setImages] = useState([]);

  // console.log(image,"image uploadde")
  // const blogs=dfd

  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState([]); // existing images
  const [removedImages, setRemovedImages] = useState([]);
  const filteredCategories = category.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Get unique categories
  const categories = [...new Set(blogs.map((b) => b._id))];

  // Get unique statuses
  const statuses = [...new Set(blogs.map((b) => b.status))];

  // Apply filters
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
// console.log(data.blogs,"bogsdk")
      setBlogs(data.blogs);
    } catch (err) {
      setMessage("Failed to fetch faq");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategory(data.category || []);
    } catch (err) {
      setMessage("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return alert("Enter category name");
    }

    try {
      setLoading(true);

      const res = await addCategory({
        name: newCategoryName,
        status: "active",
      });

      await fetchCategories(); // refresh list

      // auto select new category
      setFormData({
        ...formData,
        category: res?.category?._id,
      });

      setCategorySearch(res?.category?.name);

      setNewCategoryName("");
      setShowCreateCategory(false);
    } catch (error) {
      alert("Category create failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);
  // ---------- INPUT ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------- CREATE ----------
  
  const handleCreate = async () => {
    if (!formData.title.trim()) {
      alert("Title required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("short_description", formData.short_description);
      fd.append("status", formData.status);
      fd.append("tage", formData.tage);
      fd.append("categoryId", formData.categoryId);

      // ✅ append multiple images
      images.forEach((img) => {
        fd.append("images", img);
      });

      console.log(images, "multiple images");

      await addBlog(fd);
      await fetchBlogs();
      setModalShow(false);
    } catch (err) {
      console.error(err);
      setMessage("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UPDATE ----------
  
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("short_description", formData.short_description);
      fd.append("status", formData.status);
      fd.append("tage", formData.tage);
      fd.append("categoryId", formData.categoryId);

      // 🗑 send removed images
      if (removedImages.length > 0) {
        fd.append("removeImages", JSON.stringify(removedImages));
      }

      // ➕ send new images
      images.forEach((img) => {
        fd.append("images", img);
      });

      console.log("Updating blog with images:", images);

      // ✅ SEND FORMDATA (NOT formData)
      await updateBlog(editId, fd);

      await fetchBlogs();
      setModalShow(false);
    } catch (err) {
      console.error(err);
      setMessage("Error updating Blog");
    } finally {
      setLoading(false);
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Blog?")) return;

    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      setMessage("Delete failed", err.message);
    }
  };

  // ---------- OPEN CREATE ----------
  
  const openCreateModal = () => {
    // reset all text fields
    setFormData({
      tage: "",
      categoryId: "",
      title: "",
      short_description: "",
      content: "",
      status: "active",
    });

    // reset images
    setImages([]); // new images
    setImagePreview([]); // existing images preview (none in create)
    setRemovedImages([]); // removed images (not used in create)

    setIsEdit(false); // create mode
    setModalShow(true); // open modal
  };

  // ---------- OPEN EDIT ----------
  
  const openEditModal = (blog) => {
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      tage: blog.tage || "",
      short_description: blog.short_description || "",
      categoryId: blog.categoryId?._id || blog.categoryId?.[0]?._id || "",
      status: blog.status || "",
    });

    // 🔥 reset states
    setImages([]); // new images empty
    setRemovedImages([]); // reset removed list

    // ✅ existing images array
    setImagePreview(blog.images || []);

    setCategorySearch(
      blog.categoryId?.name || blog.categoryId?.[0]?.name || ""
    );

    setEditId(blog._id);
    setIsEdit(true);
    setModalShow(true);
  };

  // ---------- SEARCH ----------
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (categoryFilter ? blog.category_id === categoryFilter : true) &&
      (statusFilter ? blog.status === statusFilter : true)
  );
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleStatus = async (id) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog._id === id
          ? {
              ...blog,
              status: blog.status === "active" ? "inactive" : "active",
            }
          : blog
      )
    );
    try {
      const blog = blogs.find((f) => f._id === id);
      const newStatus = blog.status === "active" ? "inactive" : "active";
      await updateBlogStatus(id, newStatus);
    } catch {
      fetchBlogs();
    }
  };

  return (
    <div className="category-container">
      <div className="container-wrapper">
        <h3 className="heading_category">Blog Management</h3>

        {/* Search */}
        <div className="d-flex justify-content-between custom_headings mx-3">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search blog..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* <div className="col-md-4">
          <label>Filter by Category</label> */}
          <select
            className="form-select w-25"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {category.find((c) => c._id === cat)?.name}
              </option>
            ))}
          </select>
          {/* </div> */}

          {/* <div className="col-md-4">
          <label>Filter by Status</label> */}
          <select
            className="form-select w-25"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map((st, i) => (
              <option key={i} value={st}>
                {st}
              </option>
            ))}
          </select>
          {/* </div> */}
          <div onClick={openCreateModal} className="mb-3 create_button"style={{cursor:"pointer",border:"1px solid blue",borderRadius:"0.2rem",width:"60px",height:"20px",padding:"0 0.5rem"}}>
            Add
          </div>
        </div>

        {/* Table */}
        <table className="table table-bordered table-striped custom-table mt-5">
          <thead className="table-primary">
            <tr>
              <th>
                <input class="form-check-input" type="checkbox" value="" />
              </th>
              <th>id</th>
              <th>Blog Title</th>
              <th>Description</th>
              <th>content</th>
              <th>tage</th>
              <th>Category</th>
              <th>Image</th>
              <th>Status</th>
              <th width="100">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <Loader/>
            ):(
            filteredBlogs.map((blog, index) => {
              const categoryName = blog?.categoryId?.[0]?.name || "-";

              return (
                <tr key={blog.blog_id}>
                  <td>
                    <input class="form-check-input" type="checkbox" value="" />
                  </td>
                  <td>{index + 1}</td>
                  <td>{blog.title ? blog.title.slice(0, 10) + "..." : ""}</td>
                  <td>
                    {blog.short_description
                      ? blog.short_description.slice(0, 20) + "..."
                      : ""}
                  </td>
                  <td>
                    {blog.content ? blog.content.slice(0, 20) + "..." : ""}
                  </td>
                  <td>{blog.tage}</td>
                  <td>{categoryName}</td>
                  <td>
                    {blog.images && blog.images.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexWrap: "wrap",
                        }}
                      >
                        {blog.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Blog Image ${index + 1}`}
                            style={{
                              width: "60px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>
                    {" "}
                    <label className="switchs">
                      <input
                        type="checkbox"
                        checked={blog.status === "active"}
                        onChange={() => handleToggleStatus(blog._id)}
                      />
                      <span className="sliders"></span>
                    </label>
                  </td>

                  <td className="action_button"style={{display:"flex", columnGap:"1rem"}}>
                    <div className="edits" onClick={() => openEditModal(blog)}>
                      <FaRegEdit size={18} />
                    </div>

                    <div
                      className="deletes"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <MdDeleteOutline size={18} />
                    </div>
                  </td>
                </tr>
              );
            })
 )}
            {filteredBlogs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No blogs found.
                </td>
              </tr>
            )}
         
          </tbody>
        </table>

        {/* Modal */}
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          centered
          dialogClassName="modal-custom"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? "Edit Blog" : "Create Blog"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Category Dropdown */}

            <div
              className="position-relative"
              style={{ marginTop: "1rem", marginBottom: "2rem" }}
            >
              <div className="d-flex gap-2">
                {/* ➕ Icon (always show) */}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setShowCreateCategory(!showCreateCategory)}
                >
                  +
                </button>

                {/* Search Input */}
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  placeholder="Search or select category"
                  value={categorySearch}
                  onChange={(e) => {
                    setCategorySearch(e.target.value);
                    setShowCategoryDropdown(true);
                  }}
                  onFocus={() => setShowCategoryDropdown(true)}
                />
              </div>

              {/* Dropdown List */}
              {showCategoryDropdown && (
                <ul
                  className="list-group position-absolute w-100 mt-1"
                  style={{ zIndex: 1000 }}
                  ref={dropdownRef}
                >
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat) => (
                      <li
                        key={cat._id}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          setFormData({ ...formData, categoryId: cat._id });
                          setCategorySearch(cat.name);
                          setShowCategoryDropdown(false);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {cat.name}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No services found
                    </li>
                  )}
                </ul>
              )}
            </div>
            {showCreateCategory && (
              <div className="border p-2 mb-3 rounded">
                <input
                  className="form-control mb-2"
                  placeholder="New Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                  size="sm"
                  disabled={loading}
                  onClick={handleCreateCategory}
                >
                  {loading ? "Saving..." : "Save Category"}
                </Button>
              </div>
            )}

            {/* Blog Title */}
            <div >
              <input
                className="form-control"
                style={{ marginBottom: "2rem" }}
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleChange}
              />
              
              <div className="mb-3">
                <label className="form-label">Blog Images</label>

                {/* EXISTING IMAGES */}
                {imagePreview.length > 0 && (
                  <div className="d-flex gap-2 flex-wrap mb-2">
                    {imagePreview.map((img, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={img}
                          alt="Blog"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                          onClick={() => {
                            setRemovedImages((prev) => [...prev, img]);
                            setImagePreview((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* NEW IMAGE UPLOAD */}
                <input
                  className="form-control"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages([...e.target.files])}
                />
              </div>
            </div>
            {/* Short Description */}
            <textarea
              className="form-control "
              style={{ marginBottom: "2rem" }}
              name="short_description"
              placeholder="Short Description"
              value={formData.short_description}
              onChange={handleChange}
            />

            <textarea
              className="form-control"
              style={{ marginBottom: "2rem" }}
              name="content"
              placeholder="content"
              value={formData.content}
              onChange={handleChange}
            />
            <div className="d-flex" style={{ columnGap: "1rem" }}>
              <input
                className="form-control"
                style={{ marginBottom: "2rem" }}
                name="tage"
                placeholder="Blog tage"
                value={formData.tage}
                onChange={handleChange}
              />

              {/* Status */}
              <select
                className="form-select"
                style={{ marginBottom: "2rem" }}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>

            {isEdit ? (
              <Button className="edit_modal" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Blogs;
