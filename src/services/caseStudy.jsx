import React, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-bootstrap";
import {
  addCaseStudy,
  addCategory,
  deleteCaseStudy,
  getCaseStudies,
  getCategories,
  updateCaseStudy,
  updateCaseStudyStatus,
} from "../adminApi";
import Loader from "../app/common/loader";

const CaseStudy = () => {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",

    client_name: "",

    Description: "",
    Additional_Details: "",

    // existingImage: "",
    status: "active",
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  // console.log(formData.image,"image data")

  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [categoryFilter, setCategoryFilter] = useState("");
  // const [statusFilter, setStatusFilter] = useState("");
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const filteredCategories = category.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const fetchcasestudy = async () => {
    try {
      setLoading(true);
      const data = await getCaseStudies();
      setBlogs(data.caseStudies || []);
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

  useEffect(() => {
    fetchcasestudy();
    fetchCategories();
  }, []);

  // ---------- INPUT ----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================= Create category ==========
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
        categoryId: res?.category?._id,
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
      fd.append("client_name", formData.
client_name
);
      fd.append("Description", formData.
Description
);
      fd.append("Additional_Details", formData.Additional_Details);
      fd.append("status", formData.status);
      fd.append("tage", formData.tage);
      fd.append("categoryId", formData.categoryId);

      // ✅ append multiple images
      images.forEach((img) => {
        fd.append("images", img);
      });

      console.log(images, "multiple images");

      await addCaseStudy(fd);
      await fetchcasestudy();
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
    if (!formData.title.trim()) return alert("Title required");
    if (!formData.Description.trim()) return alert("Description required");
    if (!formData.categoryId) return alert("Category required");

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("client_name", formData.client_name);
      fd.append("Description", formData.Description);
      fd.append("Additional_Details", formData.Additional_Details);
      fd.append("status", formData.status);
      fd.append("categoryId", formData.categoryId);

      // 🗑 removed images
      if (removedImages.length > 0) {
        fd.append("removeImages", JSON.stringify(removedImages));
      }

      // ➕ new images
      images.forEach((img) => {
        fd.append("images", img);
      });

      const res = await updateCaseStudy(editId, fd);
      console.log(res, "casestudy updated");
      await fetchcasestudy();
      setModalShow(false);
    } catch (err) {
      console.error(err);
      setMessage("Error updating case study");
    } finally {
      setLoading(false);
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this casestudy?")) return;

    try {
      await deleteCaseStudy(id);
      fetchcasestudy();
    } catch (err) {
      setMessage("Delete failed", err.message);
    }
  };

  // ---------- OPEN CREATE ----------
  

  const openCreateModal = () => {
    setFormData({
      categoryId: "",
      title: "",
      client_name: "",
      Description: "",
      Additional_Details: "",
      status: "active",
    });

    setImages([]);
    setImagePreview([]);
    setRemovedImages([]);
    setCategorySearch("");

    setIsEdit(false);
    setModalShow(true);
  };

  // ---------- OPEN EDIT ----------
  
  const openEditModal = (casestudy) => {
    setFormData({
      title: casestudy.title || "",
      client_name: casestudy.client_name || "",
      Description: casestudy.Description || "",
      Additional_Details: casestudy.Additional_Details || "",
      categoryId:
        casestudy.categoryId?._id || casestudy.categoryId?.[0]?._id || "",
      status: casestudy.status || "active",
    });

    setImages([]); // new uploads
    setRemovedImages([]); // reset removed
    setImagePreview(casestudy.images || []); // ✅ EXISTING IMAGES ARRAY

    setCategorySearch(
      casestudy.categoryId?.name || casestudy.categoryId?.[0]?.name || "",
    );

    setEditId(casestudy._id);
    setIsEdit(true);
    setModalShow(true);
  };

  // ---------- SEARCH ----------
  // const filteredBlogs = blogs.filter(blog =>
  //   blog.title.toLowerCase().includes(searchText.toLowerCase()) &&
  //   (categoryFilter ? blog.category_id === categoryFilter : true) &&
  //   (statusFilter ? blog.status === statusFilter : true)
  // );

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
    const currentCaseStudy = blogs.find((item) => item._id === id);
    if (!currentCaseStudy) return;

    const newStatus =
      currentCaseStudy.status === "active" ? "inactive" : "active";

    // Optimistic UI
    setBlogs((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item,
      ),
    );

    try {
      const res = await updateCaseStudyStatus(id, newStatus);
      console.log(res, "casestudy res");
    } catch (error) {
      console.error(error);
      fetchcasestudy(); // rollback
    }
  };

  return (
    <div className="category-container">
      <div style={{width:"1300px",margin:"0 auto"}}>
        <h3 className="heading_category"style={{marginBottom:"3rem",marginTop:"1rem"}}>CaseStudy Management</h3>

        {/* Search */}
        <div className="d-flex justify-content-between custom_headings mx-3"style={{maringBottom:"3rem"}}>
          <input
            type="text"
            className="form-control w-25"style={{height:"40px"}}
            placeholder="Search blog..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* <select
            className="form-select w-25"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Filter by Category</option>
            {categories.map((cat, i) => (
          <option key={i} value={cat}>
  {category.find(c => c.category_id === cat)?.category_name}
</option>

            ))}
          </select> */}

          {/* <select
            className="form-select w-25"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Filter by Status</option>
            {statuses.map((st, i) => (
              <option key={i} value={st}>{st}</option>
            ))}
          </select> */}

          {/* Create Button */}
          {/* <div
            onClick={openCreateModal}
            className="mb-3  create_button"
            style={{
              cursor: "pointer",
              border: "1px solid blue",
              borderRadius: "0.2rem",
              width: "60px",
              height: "20px",
              padding: "0 0.5rem",
            }}
          >
            Add
          </div> */}
          <div  className="mb-3 create_buttons"onClick={openCreateModal}>
          Add
          </div>
        </div>
        {/* Table */}
        <table className="table table-bordered table-striped custom-table mt-5">
          <thead className="table-primary">
            <tr>
              <th>
                <input className="form-check-input" type="checkbox" />
              </th>
              <th>id</th>
              <th>Title</th>
              <th>Client Name</th>
              <th>Description</th>
              <th>Additional Details</th>
              <th>Category</th>
              <th>Image</th>
              <th>Status</th>
              <th width="100">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (<Loader/>):(
            (blogs || []).map((casestudy, index) => {
              const categoryName =
                casestudy?.categoryId?.name ||
                casestudy?.categoryId?.[0]?.name ||
                "-";

              return (
                <tr key={casestudy._id}>
                  <td>
                    <input className="form-check-input" type="checkbox" />
                  </td>

                  <td>{index + 1}</td>

                  <td>{casestudy.title?.slice(0, 20) || ""}</td>

                  <td>{casestudy.client_name?.slice(0, 20) || ""}</td>

                  <td>{casestudy.Description?.slice(0, 20) || ""}</td>

                  <td>{casestudy.Additional_Details?.slice(0, 20) || ""}</td>

                  <td>{categoryName}</td>
                  <td>
                    {casestudy.images && casestudy.images.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexWrap: "wrap",
                        }}
                      >
                        {casestudy.images.map((img, index) => (
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
                    <label className="switchs">
                      {/* <input
                        type="checkbox"
                        checked={casestudy.status === "active"}
                        onChange={() => handleToggleStatus(casestudy._id)}
                      /> */}
                      <input
                        type="checkbox"
                        checked={casestudy.status === "active"}
                        onChange={() => handleToggleStatus(casestudy._id)}
                      />

                      <span className="sliders"></span>
                    </label>
                  </td>

                  <td
                    className="action_button"
                    style={{ display: "flex", columnGap: "1rem" }}
                  >
                    <div
                      className="edits"
                      onClick={() => openEditModal(casestudy)}
                    >
                      <FaRegEdit size={18} />
                    </div>

                    <div
                      className="deletes"
                      onClick={() => handleDelete(casestudy._id)}
                    >
                      <MdDeleteOutline size={18} />
                    </div>
                  </td>
                </tr>
              );
            })
            )}

            {(blogs || []).length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No CaseStudy found.
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
          fullscreen="md-down"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isEdit ? "Edit Casestudy" : "Create Casestudy"}
            </Modal.Title>
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
                        key={cat.category_id}
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
            {/* <div className="d-flex"style={{columnGap:"1rem"}}> */}
            {/* Blog Title */}
            <input
              className="form-control"
              style={{ marginBottom: "2rem" }}
              name="title"
              placeholder="CaseStudy Title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              className="form-control"
              style={{ marginBottom: "2rem" }}
              name="client_name"
              placeholder="Casestudy client_name"
              value={formData.client_name}
              onChange={handleChange}
            />

            {/* IMAGE SECTION */}
            <div className="mb-3">
              <label className="form-label">Case Study Images</label>

              {/* EXISTING IMAGES */}
              {imagePreview.length > 0 && (
                <div className="d-flex gap-2 flex-wrap mb-2">
                  {imagePreview.map((img, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={img}
                        alt="Case Study"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "6px",
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
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NEW IMAGES */}
              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
              />
            </div>

            {/* </div> */}

            {/* Short Description */}

            <Form>
              <Form.Control
                as="textarea"
                rows={3}
                name="Description"
                placeholder="Case Study Description"
                value={formData.Description}
                onChange={handleChange}
                className="mt-3"
              />

              <Form.Control
                as="textarea"
                rows={3}
                name="Additional_Details"
                placeholder="Additional_Details"
                value={formData.Additional_Details}
                onChange={handleChange}
                className="mt-3 mb-3"
              />
            </Form>

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

export default CaseStudy;
