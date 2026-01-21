import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { addCategory, deleteCategory, getCategories, updateCategory, updateCategoryStatus } from "../adminApi";
import Loader from "../app/common/loader";


function Category() {
// const {id}=useParams();
// console.log(id,"id of updated data")
const [categories, setCategories] = useState([]);
const [editId,setEditId]=useState(null);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectAll, setSelectAll] = useState(false);
const [showModal, setShowModal] = useState(false);


const [formData, setFormData] = useState({
   name:"",
   status:"Active",
  //  order_index:0,
});

// ---------- FETCH ----------
const fetchCategories = async () => {
  setLoading(true);

  try {
    const data = await getCategories();
// console.log(data.category,"category get")
    setCategories(data.category);  
  } catch (err) {
    setMessage('Failed to fetch categories');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    fetchCategories();
}, []);


// ---------- SUBMIT ----------
const handleUpdate = async (e) => {
  e.preventDefault();

  if (!formData.name?.trim()) {
    return setMessage("Please enter a category name.");
  }

  try {
    setLoading(true);

    const res = await updateCategory(editId, formData);

    setMessage(res?.message || "Updated successfully");

    await fetchCategories();
    setModalShow(false);

  } catch (err) {
    setMessage("Error occurred while updating.");
  } finally {
    setLoading(false);
  }
};

const handleSelectAll = () => {
  if (!selectAll) {
    const allIds = filteredCategories.map((cat) => cat._id);
    setSelectedCategories(allIds);
    setShowModal(true);
  } else {
    setSelectedCategories([]);
    setShowModal(false);
  }
  setSelectAll(!selectAll);
};

const handleRowSelect = (id) => {
  setSelectedCategories((prev) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id);
    } else {
      return [...prev, id];
    }
  });
};


const navigate =useNavigate();
const [isEdit, setIsEdit] = useState(false);
const [modalShow, setModalShow] = useState(false);
const [searchText, setSearchText] = useState("");


// ---------- INPUT ----------
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === "order_index" ? Number(value) : value
  }));
};



// ---------- CREATE ----------
const handleCreate = async () => {

  if (!formData.name?.trim()) {
    return alert("Category name required");
  }

  try {
    setLoading(true);

    const res = await addCategory(formData);

    console.log("Create Response:", res);

    setMessage(res?.message || "Category created successfully");

    await fetchCategories();

    setModalShow(false);

  } catch (err) {

    console.error("Create Error:", err);
    setMessage(err?.response?.data?.message || "Error occurred while saving.");

  } finally {
    setLoading(false);
  }
};







// ---------- DELETE ----------
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    setLoading(true);

    await deleteCategory(id);

    // Remove deleted item from UI
    setCategories(prev =>
      prev.filter(cat => cat._id !== id)
    );

    setMessage("Category deleted successfully");

  } catch (err) {
    console.error("Delete Error:", err);
    setMessage(err?.response?.data?.message || "Error occurred while deleting.");
  } finally {
    setLoading(false);
  }
};



// ---------- OPEN CREATE ----------
const openCreateModal = () => {
  setFormData({
    name: "",
    status: "active", // ✅ default active
   
  });
  setIsEdit(false);
  setModalShow(true);
};



// ---------- OPEN EDIT ----------
const openEditModal = (cat) => {
  setFormData({
    name: cat.name || "",
    status: cat.status || "active",
   
  });

  setEditId(cat._id);
  setIsEdit(true);
  setModalShow(true);
};

const handleDeleteAll = async () => {
  console.log("Delete IDs:", selectedCategories);
  // API call here
  setShowModal(false);
};

const handleUpdateAllStatus = async () => {
  console.log("Update Status IDs:", selectedCategories);
  // API call here
  setShowModal(false);
};


// ---------- TOGGLE STATUS ----------
const handleToggleStatus = async (id) => {
  setCategories((prev) =>
    prev.map((faq) =>
      faq._id === id
        ? { ...faq, status: faq.status === "active" ? "inactive" : "active" }
        : faq
    )
  );

  try {
    const faq = categories.find((f) => f._id === id);
    const newStatus = faq.status === "active" ? "inactive" : "active";
    await updateCategoryStatus(id, newStatus);
  } catch {
    fetchCategories(); // rollback
  }
};

const filteredCategories = categories?.filter(cat =>
  cat?.name?.toLowerCase().includes(searchText.toLowerCase())
);

  return (
  <div className="category-container ">
  <div className="container-wrapper">
    <h3 className="heading_category">Category Management</h3>

    <div className="d-flex justify-content-between custom_heading">

      <input
        type="text"
        className="form-control w-25"
        placeholder="Search category / service..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div onClick={openCreateModal} className="mb-3 create_button">
        Add
      </div>

    </div>

    <hr style={{ width: "100%", color: "#817d7dff" }} />

<table className="table table-bordered table-striped custom-table">
  <thead className="table-primary">
    <tr>
      <th>
        <input
          className="form-check-input"
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      </th>
      <th>Id</th>
      <th>Category</th>
      <th>Status</th>
      <th width="160">Actions</th>
    </tr>
  </thead>

  <tbody>
  {loading ? (
    <div>
      <div colSpan="5" align="center">
       <Loader/>
      </div>
    </div>
  ) 
: (
    filteredCategories.map((cat, index) => (
      <tr key={cat._id}>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            checked={selectedCategories.includes(cat._id)}
            onChange={() => handleRowSelect(cat._id)}
          />
        </td>

        <td>{index + 1}</td>
        <td>{cat.name}</td>

        <td>
          <label className="switchs" style={{marginRight:"1rem"}}>
            <input
              type="checkbox"
              checked={cat.status === "active"}
              onChange={() => handleToggleStatus(cat._id)}
            />
            <span className="sliders"></span>
          </label>
        </td>

        <td className="action_button"style={{display:"flex", columnGap:"1rem"}}>
          <div className="edits" onClick={() => openEditModal(cat)}>
            <FaRegEdit size={18} />
          </div>

          <div className="deletes" onClick={() => handleDelete(cat._id)}>
            <MdDeleteOutline size={18} />
          </div>
        </td>
      </tr>
    ))
  )}
  {filteredCategories?.length === 0 && (
  <div>
    <div colSpan="5" align="center" style={{display:'flex',justifyContent:"center",alignItems:'center'}}>
      No category found
    </div>
  </div>
)}  
</tbody>

</table>

    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      centered
      dialogClassName="modal-custom"
    >
      <Modal.Header closeButton>
        <Modal.Title id="category-modal-title">
          {isEdit ? "Edit Category" : "Create Category"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <input
          className="form-control mb-4 mt-4"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
        />
    

<select
  className="form-select"
  name="status"
  value={formData.status || "active"}  // fallback to active
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
  {showModal && (
  <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Bulk Action</h5>
          <button className="btn-close" onClick={() => setShowModal(false)} />
        </div>

        <div className="modal-body text-center">
          <p>{selectedCategories.length} categories selected</p>

          <button
            className="btn btn-danger me-2"
            onClick={handleDeleteAll}
          >
            Delete All Categories
          </button>

          <button
            className="btn btn-success"
            onClick={handleUpdateAllStatus}
          >
            Update Status of All
          </button>
        </div>
      </div>
    </div>
  </div>
)}

</div>

  );
}

export default Category;
