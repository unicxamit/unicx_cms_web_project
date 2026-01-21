import React, { useEffect, useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { addCategory, addSubCategory, addSubSubCategory, deleteSubSubCategory, getCategories, getSubCategories, getSubSubCategories, getSubSubCategory, updateSubSubCategory, updateSubSubCategoryStatus } from "../adminApi";
import Loader from "../app/common/loader";
const SubSubCategory = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([]);
  // console.log(subCategory,"subcategory data")
  const [formData, setFormData] = useState({
    category: "",
   subcategory: "",
    // order_index: 0,
    name: "",
    status: "active",
  });
  const dropdownRef = useRef(null);
const inputRef = useRef(null);
  const dropdownRefsub = useRef(null);
const inputRefsub = useRef(null);
const [editId,setEditId]=useState(null);
  const [categorySearch, setCategorySearch] = useState("");
const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
const [showCreateSubCategory, setShowCreateSubCategory] = useState(false);

const [newCategoryName, setNewCategoryName] = useState("");
const [newSubCategoryName, setNewSubCategoryName] = useState("");
const [subCategorySearch, setSubCategorySearch] = useState("");
const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
const [filterCategory, setFilterCategory] = useState("");
const [filterSubCategory, setFilterSubCategory] = useState("");
const [filterStatus, setFilterStatus] = useState("");
const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // ---------- INPUT ----------
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === "order_index" ? Number(value) : value
  }));
};

const fetchServices = async () => {
  setLoading(true);

  try {
    const data = await getSubSubCategories();
    setSubSubCategories(data.services); // ✅ CORRECT
  } catch (err) {
    setMessage("Failed to fetch subsubcategories");
  } finally {
    setLoading(false);
  }
};

const fetchsubCategories = async () => {
  setLoading(true);

  try {
    const data = await getSubCategories();
    setSubCategory(data.subCategories); // ✅ CORRECT
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
  fetchServices();
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

const handleCreateSubCategory = async () => {
  if (!newSubCategoryName.trim()) {
    return alert("SubCategory name required");
  }

  if (!formData.category) {
    return alert("Select category first");
  }

  try {
    setLoading(true);

    const payload = {
      name: newSubCategoryName,
      category: formData.category, // 👈 PASS CATEGORY ID
      status: "active",
    };

    const res = await addSubCategory(payload);

    await fetchsubCategories();

    // auto select created subcategory
    setFormData(prev => ({
      ...prev,
      subcategory: res.subCategory._id,
    }));

    setSubCategorySearch(res.subCategory.name);
    setNewSubCategoryName("");
    setShowCreateSubCategory(false);

  } catch (err) {
    console.error(err);
    alert("Failed to create subcategory");
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
 
     const res = await addSubSubCategory(formData);
 
     console.log("Create Response:", res);
 
     setMessage(res?.message || "Category created successfully");
 
     await fetchServices();
 
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
        await updateSubSubCategory(editId, formData);
       
        await fetchServices();
        setModalShow(false);
      } catch(err) {
        setMessage("Error updating FAQ",err.message);
      } finally {
        setLoading(false);
      }
    };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await deleteSubSubCategory(id);


      fetchServices();
    } catch(err) {
      setMessage("Delete failed",err.message);
    }
  };

  // ---------- OPEN CREATE ----------
  const openCreateModal = () => {
    setFormData({
      category: "",
      subcategory: "",
      order_index: 0,
      name: "",
      status: "active",
    });
    setCategorySearch("");
    setIsEdit(false);
    setModalShow(true);
  };

  // ---------- OPEN EDIT ----------
  const openEditModal = (item) => {
    setFormData({
     name: item.name,
     subcategory:item.subcategory?._id || item.subcategory?.[0]?._id,
      category:item.category?._id || item.category?.[0]?._id,
      status: item.status,
      order_index:item.order_index
    });

    setCategorySearch(item.category?.name || item.category?.[0]?.name || "");
    setSubCategorySearch(item.subcategory?.name || item.subcategory?.[0]?.name || "")
    setEditId(item._id);
    setIsEdit(true);
    setModalShow(true);
  };


React.useEffect(() => {
  if (formData.category) setShowCreateCategory(false);
}, [formData.category]);

React.useEffect(() => {
  if (formData.subcategory) setShowCreateSubCategory(false);
}, [formData.subcategory]);
React.useEffect(() => {
  if (formData.category) {
    const cat = category.find(
      (c) => c._id === formData.category
    );
    if (cat) setCategorySearch(cat.name);
  }
}, [formData.category]);




React.useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    subcategory: "",
  }));
  setSubCategorySearch("");
}, [formData.category]);
React.useEffect(() => {
  if (formData.subcategory) {
    const subCat = subCategory.find(
      (sc) => sc._id === formData.subcategory
    );
    if (subCat) setSubCategorySearch(subCat.name);
  }
}, [formData.subcategory]);


  useEffect(() => {
    if (formData.category) {
      const cat = category.find(
        (c) => c._id === formData.category
      );
      if (cat) setCategorySearch(cat.name);

      setFormData((prev) => ({ ...prev, subcategory: "" }));
      setSubCategorySearch("");
    }
  }, [formData.category]);

  // const filteredSubCategoriesSearch = subCategory.filter(
  //   (sc) =>
  //     sc._id === formData.category &&
  //     sc.name
  //       .toLowerCase()
  //       .includes(subCategorySearch.toLowerCase())
  // );

  // ---------------- MASTER FILTERED LIST ----------------
 const safeCategory = Array.isArray(category) ? category : [];
const safeSubCategory = Array.isArray(subCategory) ? subCategory : [];
const safeServices = Array.isArray(subSubCategories) ? subSubCategories : [];

const filteredCategories = safeCategory.filter(cat =>
  cat?.name?.toLowerCase().includes(categorySearch.toLowerCase())
);

const filteredSubCategories = safeSubCategory.filter(sc =>
  sc.category?._id === formData.category || sc.category === formData.category
);

const filteredSubCategoriesSearch = filteredSubCategories.filter(sc =>
  sc.name.toLowerCase().includes(subCategorySearch.toLowerCase())
);



const finalFiltered = safeServices.filter(item =>
  item?.name?.toLowerCase().includes(searchText.toLowerCase()) &&
  (!filterCategory || item?.category === filterCategory) &&
  (!filterSubCategory || item?.subcategory === filterSubCategory) &&
  (!filterStatus || item?.status === filterStatus)
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

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      dropdownRefsub.current &&
      !dropdownRefsub.current.contains(e.target) &&
      !inputRefsub.current.contains(e.target)
    ) {
      setShowCategoryDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const handleToggleStatus = async (id) => {
  setSubSubCategories((prev) =>
    prev.map((faq) =>
      faq._id === id
        ? { ...faq, status: faq.status === "active" ? "inactive" : "active" }
        : faq
    )
  );

  try {
    const faq = subSubCategories.find((f) => f._id === id);
    const newStatus = faq.status === "active" ? "inactive" : "active";
    await updateSubSubCategoryStatus(id, newStatus);
  } catch {
    fetchServices(); // rollback
  }
};

  return (
    <div className="category-container">
      <div className="container-wrapper">
      <h3 className="heading_category">Service Management</h3>
<div className="d-flex justify-content-between custom_heading " style={{columnGap:"1rem"}}>
 <input
      type="text"
      className="form-control "
      style={{width:"250px"}}
      placeholder="Search category / service..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  {/* Category Filter */}
  {/* <select
    className="form-select "
style={{width:"250px"}}    
value={filterCategory}
    onChange={(e) => {
      setFilterCategory(e.target.value);
      setFilterSubCategory("");   // reset child filter
    }}
  >
    <option value="">All Categories</option>
    {category.map(cat => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select> */}

  {/* SubCategory Filter */}
  {/* <select
    className="form-select " 
    style={{width:"250px"}}
    value={filterSubCategory}
    onChange={(e) => setFilterSubCategory(e.target.value)}
  >
    <option value="">All SubCategories</option>
    {subCategory
      .filter(sc => !filterCategory || sc._id === filterCategory)
      .map(sc => (
        <option key={sc._id} value={sc._id}>
          {sc.name}
        </option>
      ))}
  </select> */}

  {/* Status Filter */}
  <select
    className="form-select"
    style={{width:"250px"}}
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>

  <div className="mb-3 create_button" onClick={openCreateModal}>
    Add 
  </div>
</div>
      {/* Table */}
     <table className="table table-bordered table-striped custom-table mt-5">
        <thead className="table-primary">
          <tr>
            <th><input class="form-check-input" type="checkbox" value="" /></th>
            <th>id</th>
            <th>Servies</th>
            <th>SubCategory</th>
            <th>Category</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
         {loading  ?(
         
      <div colSpan="5" align="center">
        {/* <div className="loader">Loading...</div> */}
       <Loader/>
     
    </div>)

:
(
          <tbody>
          {finalFiltered.map((item, index) => {
             const categoryName = item?.category?.[0]?.name || "-";
               const subcategoryName = item?.subcategory?.[0]?.name || "-";


            return (
              <tr key={item._id}>
                 <td><input class="form-check-input" type="checkbox" value="" /></td>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{subcategoryName}</td>
                <td>{categoryName}</td>
              <td>
  <label className="switchs">
    <input
      type="checkbox"
      checked={item.status === "active"}
      onChange={() => handleToggleStatus(item._id)}
    />
    <span className="sliders"></span>
  </label>
</td>
                <td className="action_button"style={{display:"flex", columnGap:"1rem"}}>
                  <div  className="edits" onClick={() => openEditModal(item)}>
                     <FaRegEdit size={18}/>
                  </div>
                  <div
                   className="deletes"
                    onClick={() => handleDelete(item._id)}
                  >
                 <MdDeleteOutline size={18}/>
                  </div>
                 
                      <div
  className="edit"

  onClick={() => {
  navigate(
    `/admin/subsubcategory-details/${item._id}`,
    {
      state: {
        serviceName: item.name,
        categoryName:categoryName,
       subcategoryName:subcategoryName
      },
    }
  );
}}
>
  <IoIosAdd size={18} />
</div>

                </td>
              </tr>
            );
          })}
   {finalFiltered?.length === 0 && (
 
    <div colSpan="5" align="center" style={{ border:"1px solid blue",maring:"2rem",backgroundColor:"#ffff",padding:"1rem",display:'flex',justifyContent:"center",alignItems:'center'}}>
      No Services found
    </div>
) }
         
        </tbody>) }
      </table>
      

      {/* Modal */}
      <Modal
         show={modalShow}
  onHide={() => setModalShow(false)}
  centered
  dialogClassName="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Services" : "Create Services"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Category Select */}
          <input
            className="form-control "style={{marginTop:"2rem", marginBottom:"2rem"}}

            name="name"
            placeholder="service Name"
            value={formData.name}
            onChange={handleChange}
          />


  {/* Category Select */}
  <div className="position-relative "style={{ marginBottom:"2rem"}}
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
    <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}  ref={dropdownRef}>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <li
            key={cat._id}
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
        <li className="list-group-item text-muted">No services found</li>
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
<div className="position-relative "style={{ marginBottom:"2rem"}}
>
  <div className="d-flex gap-2">
    {/* ➕ Icon (always visible) */}
    <button
      type="button"
      className="btn btn-outline-primary"
      disabled={!formData.category}
      title={!formData.category ? "Select category first" : ""}
      onClick={() => setShowCreateSubCategory(!showCreateSubCategory)}
    >
      +
    </button>

    {/* Search Input */}
    <input
       ref={inputRefsub}
      type="text"
      className="form-control"
      placeholder="Search or select subcategory"
      value={subCategorySearch}
      disabled={!formData.category}
      onChange={(e) => {
        setSubCategorySearch(e.target.value);
        setShowSubCategoryDropdown(true);
      }}
      onFocus={() => setShowSubCategoryDropdown(true)}
    />
  </div>

  {/* Dropdown List */}
  {showSubCategoryDropdown && formData.category && (
  <ul
    className="list-group position-absolute w-100 mt-1"
    style={{ zIndex: 1000 }}
  >
    {filteredSubCategoriesSearch.length > 0 ? (
      filteredSubCategoriesSearch.map(sc => (
        <li
          key={sc._id}
          className="list-group-item list-group-item-action"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              subcategory: sc._id,
            }));
            setSubCategorySearch(sc.name);
            setShowSubCategoryDropdown(false);
          }}
        >
          {sc.name}
        </li>
      ))
    ) : (
      <li className="list-group-item text-muted">
        No subcategories found
      </li>
    )}
  </ul>
)}

</div>

{showCreateSubCategory && (
  <div className="border p-2 mb-3 rounded">
    <input
      className="form-control mb-2"
      placeholder="New SubCategory Name"
      value={newSubCategoryName}
      onChange={(e) => setNewSubCategoryName(e.target.value)}
    />
   <Button size="sm" disabled={loading} onClick={handleCreateSubCategory}>
       {loading ? "Saving..." : "Save subCategory"}
     </Button>
  </div>
)}

          {/* Status */}
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
            <Button className="edit_modal"
             onClick={handleUpdate}>
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

export default SubSubCategory;













