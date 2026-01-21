import React, { useState,useEffect,useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { addCategory, addSubCategory, deleteSubCategory, getCategories, getSubCategories, updateSubCategory, updateSubCategorystatus } from "../adminApi";
import Loader from "../app/common/loader";
const Sub_category = () => {
  const [subCategories, setSubCategories] = useState([]);
  // console.log(subCategories,"subcategories")
  const [category,setCategory]=useState([])
  const [formData, setFormData] = useState({
    category: "",
  //  order_index: 0,
    name: "",
    status: "active",
  });
  const dropdownRef = useRef(null);
const inputRef = useRef(null);
  const navigat =useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
const [showCreateCategory, setShowCreateCategory] = useState(false);
const [searchText, setSearchText] = useState("");
 const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const [categoryFilter, setCategoryFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

const [newCategoryName, setNewCategoryName] = useState("");
const [categorySearch, setCategorySearch] = useState("");
const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = [...new Set(subCategories.map((b) => b._id))];
  const statuses = [...new Set(subCategories.map((b) => b.status))];
  // ---------- INPUT ----------
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === "order_index" ? Number(value) : value
  }));
};


const fetchsubCategories = async () => {
  setLoading(true);

  try {
    const data = await getSubCategories();
    setSubCategories(data.subCategories); // ✅ CORRECT
  } catch (err) {
    setMessage("Failed to fetch subcategories");
  } finally {
    setLoading(false);
  }
};


const fetchCategories = async () => {
  setLoading(true);

  try {
    const data = await getCategories();

   setCategory(data.category);   // 👈 correct
  } catch (err) {
    setMessage('Failed to fetch categories');
  } finally {
    setLoading(false);
  }
};
useEffect(()=>{
fetchsubCategories()
fetchCategories()
},[])

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

  // ---------- CREATE ----------
const handleCreate = async () => {

  if (!formData.name?.trim()) {
    return alert("Category name required");
  }

  try {
    setLoading(true);

    const res = await addSubCategory(formData);

    console.log("Create Response:", res);

    setMessage(res?.message || "Category created successfully");

    await fetchsubCategories();

    setModalShow(false);

  } catch (err) {

    console.error("Create Error:", err);
    setMessage(err?.response?.data?.message || "Error occurred while saving.");

  } finally {
    setLoading(false);
  }
};

  // ---------- UPDATE ----------
   const handleUpdate = async () => {
    //  if (!formData.question?.trim()) return alert("Faq question required");
    //  if (!formData.answer?.trim()) return alert("Faq answer required");
 
     try {
       setLoading(true);
       await updateSubCategory(editId, formData);
      
       await fetchsubCategories();
       setModalShow(false);
     } catch(err) {
       setMessage("Error updating FAQ",err.message);
     } finally {
       setLoading(false);
     }
   };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
     if (!window.confirm("Delete this SubCategory?")) return;
 
     try {
       await deleteSubCategory(id);
       fetchsubCategories();
     } catch(err) {
       setMessage("Delete failed",err.message);
     }
   };

  // ---------- OPEN CREATE ----------
  const openCreateModal = () => {
    setFormData({
      category: "",
      name: "",
      status: "active",
    });
     setCategorySearch("");
    setIsEdit(false);
    setModalShow(true);
  };

  // ---------- OPEN EDIT ----------
 const openEditModal = (subCat) => {
    setFormData({
     name: subCat.name,
      category: subCat.category?._id || subCat.category?.[0]?._id,
      status: subCat.status,
      order_index:subCat.order_index
    });

    setCategorySearch(subCat.category?.name || subCat.category?.[0]?.name || "");

    setEditId(subCat._id);
    setIsEdit(true);
    setModalShow(true);
  };
  const filteredCategories = category.filter((cat) =>
  cat.name.toLowerCase().includes(categorySearch.toLowerCase())
);



const filteredSubcategories = subCategories.filter((cat) =>
  cat.name.toLowerCase().includes(searchText.toLowerCase()) &&
  (categoryFilter ? cat.category === categoryFilter : true) &&
  (statusFilter ? cat.status === statusFilter : true)
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
 setSubCategories((prev) =>
    prev.map((faq) =>
      faq._id === id
        ? { ...faq, status: faq.status === "active" ? "inactive" : "active" }
        : faq
    )
  );

  try {
    const faq = subCategories.find((f) => f._id === id);
    const newStatus = faq.status === "active" ? "inactive" : "active";
    await updateSubCategorystatus(id, newStatus);
  } catch {
 fetchsubCategories(); // rollback
  }
};

  return (
    <div className="category-container">
<div className="container-wrapper">
    {/* <Link to="/admin/services/order">order</Link> */}
        <h3 className="heading_category">SubCategory Management</h3>

<div className="d-flex justify-content-between custom_heading mx-3">
  {/* <div className="col-md-3"> */}
    <input
      type="text"
      className="form-control w-25"
      placeholder="Search category / service..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />

  {/* </div> */}
   {/* <div className="3"> */}
            {/* <label>Filter by Category</label> */}
            <select
              className="form-select w-25"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {category.find((c) => c.id === cat)?.name}
                </option>
              ))}
            </select>
          {/* </div> */}
  
          {/* <div className="col-md3"> */}
            {/* <label>Filter by Status</label> */}
            <select
              className="form-select w-25"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Select Status</option>
              {statuses.map((st, i) => (
                <option key={i} value={st}>
                  {st}
                </option>
              ))}
            </select>
          {/* </div> */}
        

      <div  onClick={openCreateModal} className="mb-3 create_button"style={{cursor:"pointer",border:"1px solid blue",borderRadius:"0.2rem",width:"60px",height:"20px",padding:"0 0.5rem"}}>
        Add 
      </div>
</div>
      {/* <hr style={{width:"100%", color:"#817d7dff"}}></hr> */}

  
      {/* Table */}
      <table className="table table-bordered table-striped custom-table mt-5">
        <thead className="table-primary">
          <tr>
                <th><input class="form-check-input" type="checkbox" value="" /></th>
            <th>id</th>
            <th>SubCategory</th>
            <th>Category</th>
            <th>Status</th>
            <th width="">Actions</th>
          </tr>
        </thead>
       <tbody>
  {loading  ? (
    <div>
      <div colSpan="7" style={{ textAlign: "center" }}>
        {/* <div className="loader">Loading...</div> */}
        <Loader/>
      </div>
    </div>
  ) 
//   : subCategories?.length === 0 ? (
//   <div>
//     <div colSpan="5" align="center">
//       No Subcategory found
//     </div>
//   </div>
// ) 
: (
    subCategories.map((subCat, index) => {
      const categoryName = subCat?.category?.[0]?.name || "-";

      return (
        <tr key={subCat._id}>
          <td>
            <input className="form-check-input" type="checkbox" />
          </td>
          <td>{index + 1}</td>
          <td>{subCat.name}</td>
          <td>{categoryName}</td>

          <td>
            <label className="switchs">
              <input
                type="checkbox"
                checked={subCat.status === "active"}
                onChange={() => handleToggleStatus(subCat._id)}
              />
              <span className="sliders"></span>
            </label>
          </td>

          <td className="action_button"style={{display:"flex", columnGap:"1rem"}}>
            <div
              className="edits"
              onClick={() => openEditModal(subCat)}
            >
              <FaRegEdit size={18} />
            </div>

            <div
              className="deletes"
              onClick={() => handleDelete(subCat._id)}
            >
              <MdDeleteOutline size={18} />
            </div>
          </td>
        </tr>
      );
    })
  )}
  { subCategories?.length === 0 && (
  <div>
    <div colSpan="5" align="center" style={{display:'flex',justifyContent:"center",alignItems:'center'}}>
      No Subcategory found
    </div>
  </div>
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
        <Modal.Header closeButton >
          <Modal.Title>
            {isEdit ? "Edit SubCategory" : "Create SubCategory"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
   

          {/* Subcategory Name */}
          <input
            className="form-control "style={{marginTop:"1rem", marginBottom:"2rem"}}
            name="name"
            placeholder="SubCategory Name"
            value={formData.name}
            onChange={handleChange}
          />
          
<div className="position-relative  "style={{ marginBottom:"2rem"}}>
  <div className="d-flex gap-2">
    <div
      // type="button"
      className="add_button"
      onClick={() => setShowCreateCategory(!showCreateCategory)}
    >
    <FiPlus/>
    </div>

      

    {/* INPUT */}
    <input
      ref={inputRef}
      type="text"
      className="form-control"
      placeholder="Search or select category name"
      value={categorySearch}
      onChange={(e) => {
        setCategorySearch(e.target.value);
        setShowCategoryDropdown(true);
      }}
      onFocus={() => setShowCategoryDropdown(true)}
    />
  </div>

  {/* DROPDOWN */}
  {showCategoryDropdown && (
    <ul
      ref={dropdownRef}
      className="list-group position-absolute w-100 mt-1"
      style={{
        zIndex: 1000,
        maxHeight: "220px",
        overflowY: "auto",
      }}
    >
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <li
            key={cat.category_id}
            className="list-group-item list-group-item-action"
            onClick={() => {
              setFormData({ ...formData, category: cat._id });
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


          {/* Status */}
          <select
            className="form-select" style={{ marginBottom:"2rem"}}
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

export default Sub_category;
