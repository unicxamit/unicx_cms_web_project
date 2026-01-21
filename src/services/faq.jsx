import React, { useState,useEffect,useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { addCategory, addFAQ, deleteFAQ, getCategories, getFAQs, updateFAQ, updateFAQStatus } from "../adminApi";
import Loader from "../app/common/loader";

const Faq = () => {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
const [showCreateCategory, setShowCreateCategory] = useState(false);
const [newCategoryName, setNewCategoryName] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
    status: "active",
  });


  const filteredCategories = category.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // ================= API CALLS =================

  const fetchFaq = async () => {
    try {
      setLoading(true);
      const data = await getFAQs();
      setBlogs(data.faqs || []);
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
    fetchFaq();
    fetchCategories();
  }, []);

  // ================= FORM HANDLER =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    await fetchCategories();  // refresh list

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


  // ================= CREATE FAQ =================

  const handleCreate = async () => {
    if (!formData.question?.trim()) return alert("Faq question required");
    if (!formData.answer?.trim()) return alert("Faq answer required");
    if (!formData.category?.trim()) return alert("Faq category required");

    try {
      setLoading(true);
      await addFAQ(formData);
      await fetchFaq();
      setModalShow(false);
    } catch (err) {
      setMessage("Error saving FAQ");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE FAQ =================

  const handleUpdate = async () => {
    if (!formData.question?.trim()) return alert("Faq question required");
    if (!formData.answer?.trim()) return alert("Faq answer required");

    try {
      setLoading(true);
      await updateFAQ(editId, formData);
     
      await fetchFaq();
      setModalShow(false);
    } catch(err) {
      setMessage("Error updating FAQ",err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE FAQ =================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await deleteFAQ(id);
      fetchFaq();
    } catch(err) {
      setMessage("Delete failed",err.message);
    }
  };

  // ================= TOGGLE STATUS =================

const handleToggleStatus = async (id) => {
  setBlogs((prev) =>
    prev.map((faq) =>
      faq._id === id
        ? { ...faq, status: faq.status === "active" ? "inactive" : "active" }
        : faq
    )
  );

  try {
    const faq = blogs.find((f) => f._id === id);
    const newStatus = faq.status === "active" ? "inactive" : "active";
    await updateFAQStatus(id, newStatus);
  } catch {
    fetchFaq(); // rollback
  }
};



  // ================= MODAL OPEN =================

  const openCreateModal = () => {
    setFormData({
      category: "",
      question: "",
      answer: "",
      status: "active",
    });
    setCategorySearch("");
    setIsEdit(false);
    setModalShow(true);
  };

  const openEditModal = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category?._id || faq.category?.[0]?._id,
      status: faq.status,
    });

    setCategorySearch(faq.category?.name || faq.category?.[0]?.name || "");

    setEditId(faq._id);
    setIsEdit(true);
    setModalShow(true);
  };

  // ================= CLOSE DROPDOWN =================

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
  return (
    <div className="category-container">
      <div className="container-wrapper">
      <h3 className="heading_category">Faq Management</h3>

      <div className="d-flex justify-content-between custom_heading mx-3">
        
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search faq..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
       

   
   
          {/* <select
            className="form-select w-25"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Filter by Category</option>
            {category.map((cat, i) => (
              <option key={i} value={cat}>
                {category.find((c) => c._id === cat)?.name}
              </option>
            ))}
          </select> */}
        

{/*         
          <select
            className="form-select w-25"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Filter by Status</option>
            {statuses.map((st, i) => (
              <option key={i} value={st}>
                {st}
              </option>
            ))}
          </select> */}
        
      

      <div  onClick={openCreateModal} className="mb-3 create_buttons" style={{cursor:"pointer",border:"1px solid blue",borderRadius:"0.2rem",width:"60px",height:"20px",padding:"0 0.5rem"}}>
        Add
      </div>
</div>
      <table className="table table-bordered table-striped custom-table mt-5">
        <thead className="table-primary">
          <tr>
              <th><input class="form-check-input" type="checkbox" value="" /></th>
            <th>id</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Category</th>
            <th>Status</th>
            <th width="100">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader/>
          ):(
          blogs.map((faq, index) => {
           
  const categoryName = faq?.category?.[0]?.name || "-";
            return (
              <tr key={faq._id}>
              <td><input class="form-check-input" type="checkbox" value="" /></td>
                <td>{index + 1}</td>
                <td>{faq.question? faq.question.slice(0, 20) + "..."
  : ""}</td>
                <td>{faq.answer? faq.answer.slice(0, 20) + "..."
  : ""}</td>
                <td>{categoryName}</td>
                <td> <label className="switchs">
    <input
      type="checkbox"
      checked={faq.status === "active"}
      onChange={() => handleToggleStatus(faq._id)}
    />
    <span className="sliders"></span>
  </label></td>

                <td className="action_button"style={{display:"flex", columnGap:"1rem"}}>
                  <div
                 className="edits"
                    onClick={() => openEditModal(faq)}
                  >
            <FaRegEdit size={18}/>
                  </div>

                  <div
                    className="deletes"
                    onClick={() => handleDelete(faq._id)}
                  >
                        <MdDeleteOutline size={18}/>
                  </div>
                </td>
              </tr>
            );
          })
        )}
          {blogs.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No FAQ found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal   
       show={modalShow}
  onHide={() => setModalShow(false)}
  centered
  dialogClassName="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit FAQ" : "Create FAQ"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* CATEGORY FIELD */}
          <div className="position-relative "style={{marginTop:"1rem", marginBottom:"2rem"}} ref={dropdownRef}>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowCreateCategory(!showCreateCategory)}
              >
                +
              </button>

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

            {showCategoryDropdown && (
              <ul
                className="list-group position-absolute w-100 mt-1"
                style={{ zIndex: 1000 }}
                 ref={dropdownRef}
              >
                {filteredCategories.length > 0 ? (
                  filteredCategories?.map((cat) => (
                    <li
                      key={cat._id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: cat._id,
                        });
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
             <Button size="sm" disabled={loading} onClick={handleCreateCategory}>
  {loading ? "Saving..." : "Save Category"}
</Button>

            </div>
          )}

          {/* QUESTION */}
          {/* <input
            className="form-control"style={{ marginBottom:"2rem"}}
            name="question"
            placeholder="FAQ Question"
            value={formData.question}
            onChange={handleChange}
          /> */}
   <Form>
          <Form.Control
            as="textarea"
            rows={3}
            name="question"
            placeholder="FAQ Question"
            value={formData.question}
            onChange={handleChange}
            className="mt-3"
          />

      <Form.Control
            as="textarea"
            rows={3}
            name="answer"
            placeholder="FAQ Answer"
            value={formData.answer}
            onChange={handleChange}
            className="mt-3 mb-3"
          />
    </Form>
          {/* ANSWER */}
          {/* <input
            className="form-control "style={{ marginBottom:"2rem"}}
            name="answer"
            placeholder="FAQ Answer"
            value={formData.answer}
            onChange={handleChange}
          /> */}

          {/* STATUS */}
          <select
            className="form-select"style={{ marginBottom:"2rem"}}

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

export default Faq;
