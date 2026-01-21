// import React, { useState } from "react";
// import {
//   ChevronRight,
//   ChevronDown,
//   LayoutGrid,
//   Layers,
//   Trash2,
//   Edit3,
//   X,
//   GripVertical,
//   Plus,
// } from "lucide-react";

// import "../../assets/style/orderservice.css";
// import {
//   category as categoryList,
//   sub_category as subCategoryList,
//   sub_sub_category as serviceList
// } from "../../DynamicJsonList/Users.js";

// const buildHierarchy = () => ({
//   categories: categoryList.map((cat, cIndex) => ({
//     category_id: cat.category_id,
//     category_name: cat.category_name,
//     order_index: cat.order_index ?? cIndex,

//     subcategories: subCategoryList
//       .filter(sub => sub.category_id === cat.category_id)
//       .map((sub, sIndex) => ({
//         sub_category_id: sub.sub_category_id,
//         sub_category_name: sub.sub_category_name,
//         status: sub.status || "active",
//         order_index: sub.order_index ?? sIndex,

//         services: serviceList
//           .filter(srv => srv.sub_category_id === sub.sub_category_id)
//           .map((srv, iIndex) => ({
//             id: srv.service_id,
//             title: srv.service_name,
//             price: srv.price || "",
//             status: srv.status || "active",
//             order_index: srv.order_index ?? iIndex
//           }))
//       }))
//   }))
// });

// const OrderService = () => {

// const [data, setData] = useState(buildHierarchy());
// const [editData, setEditData] = useState(null);
// const [showEditModal, setShowEditModal] = useState(false);

// //   const [openIds, setOpenIds] = useState(["1", "2"]);
// const [openIds, setOpenIds] = useState(
//   categoryList.map(c => c.category_id)
// );

//   const [draggedItem, setDraggedItem] = useState(null);

//   const toggleOpen = (id) => {
//     setOpenIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   };

//   const handleToggleStatus = (catId, subId, serviceId) => {
//     const newData = JSON.parse(JSON.stringify(data));
//     const category = newData.categories.find(c => c.category_id === catId);
//     const sub = category.subcategories.find(s => s.sub_category_id === subId);
//     //  const sub = category.subcategories.find(s => s.sub_category_id === subId);
//     if (serviceId) {
//       const service = sub.services.find(s => s.id === serviceId);
//       service.status = service.status === "active" ? "inactive" : "active";
//     } else {
//       sub.status = sub.status === "active" ? "inactive" : "active";
//     }
//     setData(newData);
//   };

//   const onDragStart = (e, item) => {
//     setDraggedItem(item);
//   };

//   const onDragOver = (e) => e.preventDefault();

//   const onDrop = (e, type, targetIdx, parents = {}) => {
//     e.preventDefault();
//     if (!draggedItem || draggedItem.type !== type) return;

//     const newData = JSON.parse(JSON.stringify(data));

//     if (type === "category") {
//       const list = newData.categories;
//       const [m] = list.splice(draggedItem.index, 1);
//       list.splice(targetIdx, 0, m);
//       list.forEach((x, i) => x.order_index = i);
//     }

//     if (type === "subcategory") {
//       const cat = newData.categories.find(c => c.category_id === parents.catId);
//       const [m] = cat.subcategories.splice(draggedItem.index, 1);
//       cat.subcategories.splice(targetIdx, 0, m);
//       cat.subcategories.forEach((x, i) => x.order_index = i);
//     }

//     if (type === "service") {
//       const cat = newData.categories.find(c => c.category_id === parents.catId);
//       const sub = cat.subcategories.find(s => s.sub_category_id === parents.subId);
//       const [m] = sub.services.splice(draggedItem.index, 1);
//       sub.services.splice(targetIdx, 0, m);
//       sub.services.forEach((x, i) => x.order_index = i);
//     }

//     setData(newData);
//     setDraggedItem(null);
//   };
// const deleteCategory = (catId) => {
//   if (!window.confirm("Delete this category?")) return;

//   setData(prev => ({
//     ...prev,
//     categories: prev.categories.filter(
//       c => c.category_id !== catId
//     )
//   }));
// };

// const deleteSubCategory = (catId, subId) => {
//   if (!window.confirm("Delete this sub category?")) return;

//   setData(prev => ({
//     ...prev,
//     categories: prev.categories.map(c =>
//       c.category_id === catId
//         ? {
//             ...c,
//             subcategories: c.subcategories.filter(
//               s => s.sub_category_id !== subId
//             )
//           }
//         : c
//     )
//   }));
// };

// const deleteService = (catId, subId, serviceId) => {
//   if (!window.confirm("Delete this service?")) return;

//   setData(prev => ({
//     ...prev,
//     categories: prev.categories.map(c =>
//       c.category_id === catId
//         ? {
//             ...c,
//             subcategories: c.subcategories.map(s =>
//               s.sub_category_id === subId
//                 ? {
//                     ...s,
//                     services: s.services.filter(
//                       ser => ser.id !== serviceId
//                     )
//                   }
//                 : s
//             )
//           }
//         : c
//     )
//   }));
// };

// const handleSaveEdit = () => {
//   const { type, catId, subId, serviceId, value } = editData;

//   setData(prev => ({
//     ...prev,
//     categories: prev.categories.map(cat => {
//       if (cat.category_id !== catId) return cat;

//       if (type === "category") {
//         return { ...cat, category_name: value };
//       }

//       if (type === "sub_category") {
//         return {
//           ...cat,
//           subcategories: cat.subcategories.map(sub =>
//             sub.sub_category_id === subId
//               ? { ...sub, sub_category_name: value }
//               : sub
//           )
//         };
//       }

//       if (type === "service") {
//         return {
//           ...cat,
//           subcategories: cat.subcategories.map(sub =>
//             sub.sub_category_id === subId
//               ? {
//                   ...sub,
//                   services: sub.services.map(s =>
//                     s.id === serviceId ? { ...s, title: value } : s
//                   )
//                 }
//               : sub
//           )
//         };
//       }

//       return cat;
//     })
//   }));

//   setShowEditModal(false);
// };

//   return (
//     <div className="app">
//       <div className="layout">

//         <header className="header">
//           <div>
//             <h1 >Service Architecture</h1>
//             <p>Hierarchical reordering with auto-indexed values.</p>
//           </div>
//           <div className="status-badge">Auto Sync Active</div>
//         </header>

//         {data.categories.map((cat, cIdx) => (
//           <div
//             key={cat.category_id}
//             className="category-card"
//             onDragOver={onDragOver}
//             onDrop={(e) => onDrop(e, "category", cIdx)}
//           >
//             <div
//               draggable
//               onDragStart={(e) => onDragStart(e, { type: "category", index: cIdx })}
//               className="category-row"
//             >
//               <div className="left">
//                 <GripVertical className="grip" />
//                 <button className="toggle" onClick={() => toggleOpen(cat.category_id)}>
//                   {openIds.includes(cat.category_id) ? <ChevronDown /> : <ChevronRight />}
//                 </button>
//                 <div>
//                   <h2>{cat.category_name}</h2>
//                   <span className="small">Order Index: {cat.order_index}</span>
//                 </div>
//               </div>

//               <div className="right">
//                <button
//   onClick={() =>
//     setEditData({
//       type: "category",
//       catId: cat.category_id,
//       value: cat.category_name
//     }) || setShowEditModal(true)
//   }
// >
//   <Edit3 />
// </button>

//                 <button className="danger"
//      onClick={() => deleteCategory(cat.category_id)}><Trash2 /></button>
//               </div>
//             </div>

//             {openIds.includes(cat.category_id) && (
//               <div className="subcategory-wrap">

//                 {cat.subcategories.map((sub, sIdx) => (
//                   <div
//                     key={sub.sub_category_id}
//                     className="subcategory-container"
//                     onDragOver={onDragOver}
//                     onDrop={(e) => onDrop(e, "subcategory", sIdx, { catId: cat.category_id })}
//                   >
//                     <div
//                       draggable
//                       onDragStart={(e) => onDragStart(e, { type: "subcategory", index: sIdx, catId: cat.category_id })}
//                       className={`subcategory-row ${sub.status !== "active" ? "inactive" : ""}`}
//                     >
//                       <div className="left">
//                         <GripVertical className="grip" />
//                         <button className="toggle" onClick={() => toggleOpen(sub.sub_category_id)}>
//                           {openIds.includes(sub.sub_category_id) ? <ChevronDown /> : <ChevronRight />}
//                         </button>
//                         <Layers />
//                         <div>
//                           <strong>{sub.sub_category_name}</strong>
//                           <div className="small">Order: {sub.order_index}</div>
//                         </div>
//                       </div>

//                       <label className="switch">
//                         <input
//                           type="checkbox"
//                           checked={sub.status === "active"}
//                           onChange={() => handleToggleStatus(cat.category_id, sub.sub_category_id)}
//                         />
//                         <span></span>
//                       </label>
//                        <div className="right">
//                 <button
//   onClick={() =>
//     setEditData({
//       type: "sub_category",
//       catId: cat.category_id,
//       subId: sub.sub_category_id,
//       value: sub.sub_category_name
//     }) || setShowEditModal(true)
//   }
// >
//   <Edit3 />
// </button>

//                 <button className="danger"
//       onClick={() =>
//     deleteSubCategory(cat.category_id, sub.sub_category_id)
//   }><Trash2 /></button>
//               </div>
//                     </div>

//                     {openIds.includes(sub.sub_category_id) && (
//                       <div className="services">
//                         {sub.services.map((ser, i) => (
//                           <div
//                             key={ser.id}
//                             draggable
//                             onDragStart={(e) => onDragStart(e, { type: "service", index: i, catId: cat.category_id, subId: sub.sub_category_id })}
//                             onDrop={(e) => onDrop(e, "service", i, { catId: cat.category_id, subId: sub.sub_category_id })}
//                             className={`service ${ser.status !== "active" ? "inactive" : ""}`}
//                           >
//                             <div className="left">
//                               <GripVertical className="grip" />
//                               <span>{ser.title}</span>
//                               <div className="small">Order: {ser.order_index}</div>
//                             </div>

//                             <div className="right">
//                               <span>{ser.price}</span>
//                              <label className="switch">
//   <input
//     type="checkbox"
//     checked={ser.status === "active"}
//     onChange={() =>
//       handleToggleStatus(
//         cat.category_id,
//         sub.sub_category_id,
//         ser.id
//       )
//     }
//   />
//   <span></span>
// </label>

//                             </div>
//                             <div>
//                             <button
//   onClick={() =>
//     setEditData({
//       type: "service",
//       catId: cat.category_id,
//       subId: sub.sub_category_id,
//       serviceId: ser.id,
//       value: ser.title
//     }) || setShowEditModal(true)
//   }
// >
//   <Edit3 />
// </button>

//                 <button className="danger"
//        onClick={() =>
//     deleteService(cat.category_id, sub.sub_category_id, ser.id)
//   }><Trash2 /></button>
//               </div>
//                           </div>
//                         ))}
//                         <button className="add-link"><Plus /> Add Service</button>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 <button className="add-link green"><Plus /> New Subcategory</button>
//               </div>
//             )}
//           </div>
//         ))}

//         <button className="create-root">
//           <LayoutGrid /> Create New Root Category
//         </button>
// {showEditModal && (
//   <div className="modal-overlay">
//     <div className="modal-box">
//       <h4>Edit</h4>

//       <input
//         className="form-control"
//         value={editData.value}
//         onChange={(e) =>
//           setEditData({ ...editData, value: e.target.value })
//         }
//       />

//       <div className="mt-3 text-end">
//         <button
//           className="btn btn-secondary me-2"
//           onClick={() => setShowEditModal(false)}
//         >
//           Cancel
//         </button>

//         <button className="btn btn-primary" onClick={handleSaveEdit}>
//           Save
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// export default OrderService;

import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Layers,
  Trash2,
  Edit3,
  X,
  GripVertical,
  Plus,
} from "lucide-react";
import { IoChevronUpOutline } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./serviceStyle/serviceorder.css";

import {
  getCategories,
  getSubCategoriesByCategoryId,
  deleteCategory,
  getserviceBysubCategoryId,
  updateCategoryStatus,
  updateSubSubCategoryStatus,
  updateSubCategorystatus,
  updateCategoryOrder_index,
  updateserviceOrder_index,
  updateSubCategoryOrder_index,
  deleteSubSubCategory,
  deleteSubCategory,
  updateSubSubCategory,
  updateSubCategory,
  addCategory,
  updateCategory,
  addSubSubCategory,
  addSubCategory,
  getServiceDetailsByserviceId,
  updateServiceDetails,
} from "../adminApi.js";
import Loader from "../app/common/loader.jsx";

// Build hierarchical data structure
// const buildHierarchyFromApi = (categories, subCategories, services) => {
//   return {
//     categories: categories.map((cat, cIndex) => ({
//       category_id: cat._id,
//       category_name: cat.name,
//       order_index: cat.order_index ?? cIndex + 1,
//       status: cat.status || "active",
//       subcategories: subCategories
//         .filter((sub) =>
//           Array.isArray(sub.category)
//             ? sub.category[0]?._id === cat._id
//             : sub.category === cat._id
//         )
//         .map((sub, sIndex) => ({
//           sub_category_id: sub._id,
//           sub_category_name: sub.name,
//           status: sub.status || "active",
//           order_index: sub.order_index ?? sIndex + 1,

//           services: services
//             .filter((srv) => srv.subcategory[0]._id === sub._id)
//             .map((srv, iIndex) => ({
//               id: srv._id,
//               title: srv.name,
//               price: srv.price || "",
//               status: srv.status || "active",
//               order_index: srv.order_index ?? iIndex + 1,
//             })),
//         })),
//     })),
//   };
// };

const buildHierarchyFromApi = (categories, subCategories, services) => {
  return {
    categories: categories.map((cat, cIndex) => ({
      category_id: cat._id,
      category_name: cat.name,
      order_index: cat.order_index ?? cIndex + 1,
      status: cat.status || "active",
      subcategories: subCategories
        .filter((sub) =>
          Array.isArray(sub.category)
            ? sub.category[0]?._id === cat._id
            : sub.category === cat._id
        )
        .map((sub, sIndex) => ({
          sub_category_id: sub._id,
          sub_category_name: sub.name,
          status: sub.status || "active",
          order_index: sub.order_index ?? sIndex + 1,
          services: services
            .filter((srv) => srv.subcategory?.[0]?._id === sub._id)
            .map((srv, iIndex) => ({
              id: srv._id,
              title: srv.name,
              price: srv.price || "",
              status: srv.status || "active",
              order_index: srv.order_index ?? iIndex + 1,
            })),
        })),
    })),
  };
};

const OrderService = () => {
  // const [data, setData] = useState(buildHierarchy());
  // const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState({
    type: "", // category | sub_category | service
    catId: null,
    subId: null,
    serviceId: null,
    name: "",
    status: "active",
  });
  // const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);
  // const [services, setServices] = useState([]);
  const [data, setData] = useState({ categories: [] });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openIds, setOpenIds] = useState([]);
  const [openIdssubcategory, setOpenIdsSubCategory] = useState([]);
  
  // ---------- FETCH ----------

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       setLoading(true);

  //       // 1️⃣ Categories
  //       const catRes = await getCategories();

  //       // 2️⃣ Subcategories by category
  //       let allSubCategories = [];
  //       for (const cat of catRes.category) {
  //         const subRes = await getSubCategoriesByCategoryId(cat._id);
  //         allSubCategories.push(...subRes.subCategories);
  //       }
  //       // console.log(allSubCategories,"allservicessubcategory details")
  //       // 3️⃣ Services by subcategory
  //       let allServices = [];
  //       for (const sub of allSubCategories) {
  //         const srvRes = await getserviceBysubCategoryId(sub._id);
  //         allServices.push(...srvRes.services);
  //       }
  //       // console.log(allServices,"allservices details")
  //       // setCategories(catRes.category);
  //       // setSubCategories(allSubCategories);
  //       // setServices(allServices);

  //       // 4️⃣ Build tree
  //       const hierarchy = buildHierarchyFromApi(
  //         catRes.category,
  //         allSubCategories,
  //         allServices
  //       );
  //       console.log(hierarchy, "hierarchy data");
  //       setData(hierarchy);
  //       setOpenIds(catRes.category.map((c) => c._id));
  //     } catch (err) {
  //       console.error(err);
  //       setMessage("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAll();
  // }, []);

//   useEffect(() => {
//   const fetchAll = async () => {
//     try {
//       setLoading(true);

//       // 1️⃣ Categories
//       const catRes = await getCategories();
//       const categories = catRes.category || [];

//       // 2️⃣ Subcategories (PARALLEL)
//       const subCategoryPromises = categories.map((cat) =>
//         getSubCategoriesByCategoryId(cat._id)
//       );

//       const subCategoryResponses = await Promise.all(subCategoryPromises);
//       const allSubCategories = subCategoryResponses.flatMap(
//         (res) => res.subCategories || []
//       );

//       // 3️⃣ Services (PARALLEL)
//       const servicePromises = allSubCategories.map((sub) =>
//         getserviceBysubCategoryId(sub._id)
//       );

//       const serviceResponses = await Promise.all(servicePromises);
//       const allServices = serviceResponses.flatMap(
//         (res) => res.services || []
//       );

//       // 4️⃣ Build hierarchy (SAME LOGIC)
//       const hierarchy = buildHierarchyFromApi(
//         categories,
//         allSubCategories,
//         allServices
//       );

//       setData(hierarchy);
//       setOpenIds(categories.map((c) => c._id));
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAll();
// }, []);

useEffect(() => {
  let isMounted = true; // ✅ prevent state update after unmount

  const fetchAll = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch Categories
      const catRes = await getCategories();
      const categories = catRes?.category ?? [];

      if (!categories.length) {
        setData({ categories: [] });
        return;
      }

      // 2️⃣ Fetch Subcategories in PARALLEL
      const subCategoryPromises = categories.map((cat) =>
        getSubCategoriesByCategoryId(cat._id)
      );

      const subCategoryResponses = await Promise.all(subCategoryPromises);

      const allSubCategories = subCategoryResponses.flatMap(
        (res) => res?.subCategories ?? []
      );

      // 3️⃣ Fetch Services in PARALLEL
      const servicePromises = allSubCategories.map((sub) =>
        getserviceBysubCategoryId(sub._id)
      );

      const serviceResponses = await Promise.all(servicePromises);

      const allServices = serviceResponses.flatMap(
        (res) => res?.services ?? []
      );

      // 4️⃣ Build hierarchy
      const hierarchy = buildHierarchyFromApi(
        categories,
        allSubCategories,
        allServices
      );

      if (isMounted) {
        setData(hierarchy);
        setOpenIds(categories.map((c) => c._id));
      }
    } catch (err) {
      console.error(err);
      if (isMounted) {
        setMessage("Failed to fetch data");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchAll();

  return () => {
    isMounted = false; // ✅ cleanup
  };
}, []);


  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleOpenSubcategory = (id) => {
    setOpenIdsSubCategory((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleStatus = async (catId, subId, serviceId) => {
    let apiCall;
    let apiArgs;
    let newStatus;

    // 🔥 Decide API & status FIRST
    const category = data.categories.find((c) => c.category_id === catId);
    if (!category) return;

    // 🔹 CATEGORY
    if (!subId && !serviceId) {
      newStatus = category.status === "active" ? "inactive" : "active";
      apiCall = updateCategoryStatus;
      apiArgs = [catId, newStatus];
    }

    // 🔹 SUBCATEGORY
    if (subId && !serviceId) {
      const sub = category.subcategories.find(
        (s) => s.sub_category_id === subId
      );
      if (!sub) return;

      newStatus = sub.status === "active" ? "inactive" : "active";
      apiCall = updateSubCategorystatus;
      apiArgs = [subId, newStatus];
    }

    // 🔹 SERVICE
    if (serviceId) {
      const sub = category.subcategories.find(
        (s) => s.sub_category_id === subId
      );
      const srv = sub?.services.find((s) => s.id === serviceId);
      if (!srv) return;

      newStatus = srv.status === "active" ? "inactive" : "active";
      apiCall = updateSubSubCategoryStatus;
      apiArgs = [serviceId, newStatus];
    }

    // 🔥 UI UPDATE (Optimistic)
    setData((prev) => {
      const updated = structuredClone(prev);

      updated.categories.forEach((cat) => {
        if (cat.category_id !== catId) return;

        if (!subId && !serviceId) {
          cat.status = newStatus;
          cat.subcategories.forEach((sub) => {
            sub.status = newStatus;
            sub.services.forEach((srv) => (srv.status = newStatus));
          });
        }

        cat.subcategories.forEach((sub) => {
          if (sub.sub_category_id !== subId) return;

          if (subId && !serviceId) {
            sub.status = newStatus;
            sub.services.forEach((srv) => (srv.status = newStatus));
          }

          sub.services.forEach((srv) => {
            if (srv.id === serviceId) {
              srv.status = newStatus;
            }
          });
        });
      });

      return updated;
    });

    // 🔥 BACKEND UPDATE
    try {
      const res = await apiCall(...apiArgs);
      console.log(res, "status udat");
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // Drag & Drop Handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    // 🔹 BACKUP FOR ROLLBACK
    const prevData = JSON.parse(JSON.stringify(data));

    try {
      /* ===================== CATEGORY ===================== */
      if (type === "CATEGORY") {
        const updatedCategories = [...data.categories];
        const [moved] = updatedCategories.splice(source.index, 1);
        updatedCategories.splice(destination.index, 0, moved);

        const reordered = updatedCategories.map((cat, index) => ({
          ...cat,
          order_index: index + 1,
        }));

        setData((prev) => ({ ...prev, categories: reordered }));

        await updateCategoryOrder_index(
          reordered.map((cat) => ({
            _id: cat.category_id,
            order_index: cat.order_index,
          }))
        );
      }

      /* ===================== SUBCATEGORY ===================== */
      if (type === "SUBCATEGORY") {
        const categoryId = source.droppableId.replace("sub-", "");

        const categoriesCopy = [...data.categories];
        const category = categoriesCopy.find(
          (c) => c.category_id === categoryId
        );

        if (!category) return;

        const updatedSub = [...category.subcategories];
        const [moved] = updatedSub.splice(source.index, 1);
        updatedSub.splice(destination.index, 0, moved);

        const reorderedSub = updatedSub.map((sub, index) => ({
          ...sub,
          order_index: index + 1,
        }));

        category.subcategories = reorderedSub;

        setData((prev) => ({ ...prev, categories: categoriesCopy }));

        await updateSubCategoryOrder_index(
          reorderedSub.map((sub) => ({
            _id: sub.sub_category_id,
            order_index: sub.order_index,
          }))
        );
      }

      /* ===================== SERVICE ===================== */
      if (type === "SERVICE") {
        const subCategoryId = source.droppableId.replace("srv-", "");

        const categoriesCopy = [...data.categories];
        const subCategory = categoriesCopy
          .flatMap((c) => c.subcategories)
          .find((s) => s.sub_category_id === subCategoryId);

        if (!subCategory) return;

        const updatedServices = [...subCategory.services];
        const [moved] = updatedServices.splice(source.index, 1);
        updatedServices.splice(destination.index, 0, moved);

        const reorderedServices = updatedServices.map((srv, index) => ({
          ...srv,
          order_index: index + 1,
        }));

        subCategory.services = reorderedServices;

        setData((prev) => ({ ...prev, categories: categoriesCopy }));

        await updateserviceOrder_index(
          reorderedServices.map((srv) => ({
            _id: srv.id,
            order_index: srv.order_index,
          }))
        );
      }
    } catch (error) {
      console.error("Order update failed, reverting UI", error);
      setData(prevData); // 🔁 rollback UI
    }
  };

  const handledeleteCategory = async (catId) => {
    if (!window.confirm("Delete this category?")) return;

    // 🔥 Optimistic UI update
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.category_id !== catId),
    }));

    try {
      await deleteCategory(catId);
    } catch (err) {
      console.error("Delete category failed", err);
      getCategories(); // rollback
    }
  };

  const handledeleteSubCategory = async (catId, subId) => {
    if (!window.confirm("Delete this sub category?")) return;

    // 🔥 Optimistic UI update
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.category_id === catId
          ? {
              ...c,
              subcategories: c.subcategories.filter(
                (s) => s.sub_category_id !== subId
              ),
            }
          : c
      ),
    }));

    try {
      await deleteSubCategory(subId);
    } catch (err) {
      console.error("Delete subcategory failed", err);
      getserviceBysubCategoryId(); // rollback
    }
  };

  const deleteService = async (catId, subId, serviceId) => {
    if (!window.confirm("Delete this service?")) return;

    // 🔥 Optimistic UI update
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.category_id === catId
          ? {
              ...c,
              subcategories: c.subcategories.map((s) =>
                s.sub_category_id === subId
                  ? {
                      ...s,
                      services: s.services.filter(
                        (ser) => ser.id !== serviceId
                      ),
                    }
                  : s
              ),
            }
          : c
      ),
    }));

    try {
      await deleteSubSubCategory(serviceId);
    } catch (err) {
      console.error("Delete service failed", err);
      getserviceBysubCategoryId(); // rollback
    }
  };

  // CREATE
  const openCreateModal = (
    type,
    catId = null,
    subId = null,
    serviceId = null
  ) => {
    setModalData({
      type,
      catId,
      subId,
      serviceId,
      name: "",
      status: "active",
    });
    setShowModal(true);
  };

  // Edid
  const openEditModal = ({
    type,
    catId = null,
    subId = null,
    serviceId = null,
    name = "",
    status = "active",
  }) => {
    setModalData({
      type,
      catId,
      subId,
      serviceId,
      name,
      status,
    });
    setShowModal(true);
  };

  const handleSaveModal = async () => {
    const { type, catId, subId, serviceId, name, status } = modalData;

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      /* ========== CATEGORY ========== */
      if (type === "category") {
        if (catId) {
          await updateCategory(catId, { name, status });

          setData((prev) => ({
            ...prev,
            categories: prev.categories.map((cat) =>
              cat.category_id === catId
                ? { ...cat, category_name: name, status }
                : cat
            ),
          }));
        } else {
          const res = await addCategory({ name, status });
          const newCat = res.data?.category || res.category;

          setData((prev) => ({
            ...prev,
            categories: [
              ...prev.categories,
              {
                category_id: newCat._id,
                category_name: newCat.name,
                status: newCat.status,
                subcategories: [],
              },
            ],
          }));
        }
      }

      /* ========== SUBCATEGORY ========== */
      if (type === "sub_category") {
        if (subId) {
          // ===== UPDATE =====
          await updateSubCategory(subId, { name, status });

          setData((prev) => ({
            ...prev,
            categories: prev.categories.map((cat) =>
              cat.category_id === catId
                ? {
                    ...cat,
                    subcategories: cat.subcategories.map((sub) =>
                      sub.sub_category_id === subId
                        ? {
                            ...sub,
                            sub_category_name: name,
                            status,
                          }
                        : sub
                    ),
                  }
                : cat
            ),
          }));

          // setShowModal(false);
        } else {
          // ===== CREATE =====
          const res = await addSubCategory({
            category: catId,
            name,
            status,
          });

          // 🔥 SAFE EXTRACTION (MOST IMPORTANT LINE)
          const newSub = res?.data?.subCategory || res?.subCategory;
          console.log(newSub, "sunicdkk");
          if (!newSub || !newSub._id) {
            console.error("Invalid subcategory response", res);
            return;
          }

          // ✅ STATE UPDATE (INSTANT UI)
          setData((prev) => ({
            ...prev,
            categories: prev.categories.map((cat) =>
              cat.category_id === catId
                ? {
                    ...cat,
                    subcategories: [
                      ...cat.subcategories,
                      {
                        sub_category_id: newSub._id,
                        sub_category_name: newSub.name,
                        status: newSub.status,
                        services: [],
                      },
                    ],
                  }
                : cat
            ),
          }));
        }
      }

      /* ========== SERVICE ========== */
      if (type === "service") {
        if (serviceId) {
          await updateSubSubCategory(serviceId, { name, status });

          setData((prev) => ({
            ...prev,
            categories: prev.categories.map((cat) =>
              cat.category_id === catId
                ? {
                    ...cat,
                    subcategories: cat.subcategories.map((sub) =>
                      sub.sub_category_id === subId
                        ? {
                            ...sub,
                            services: sub.services.map((s) =>
                              s.id === serviceId
                                ? { ...s, title: name, status }
                                : s
                            ),
                          }
                        : sub
                    ),
                  }
                : cat
            ),
          }));

          setShowModal(false); // ✅ close modal
        } else {
          const res = await addSubSubCategory({
            category: catId,
            subcategory: subId,
            name,
            status,
          });

          const newSrv = res?.data || res;
          console.log(newSrv, "service data");
          if (!newSrv || !newSrv._id) {
            console.error("Invalid service response", res);
            return;
          }

          setData((prev) => ({
            ...prev,
            categories: prev.categories.map((cat) =>
              cat.category_id === catId
                ? {
                    ...cat,
                    subcategories: cat.subcategories.map((sub) =>
                      sub.sub_category_id === subId
                        ? {
                            ...sub,
                            services: [
                              ...sub.services,
                              {
                                id: newSrv._id,
                                title: newSrv.name,
                                status: newSrv.status,
                                price: newSrv.price || "",
                                order_index: sub.services.length + 1,
                              },
                            ],
                          }
                        : sub
                    ),
                  }
                : cat
            ),
          }));

          setShowModal(false); // ✅ close modal
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <div className="app">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="layout">
          <header className="header">
            <div>
              <h1>Service Architecture</h1>
            </div>
            <button onClick={() => openCreateModal("category")}>
              Create Category
            </button>
          </header>

          {/* CATEGORY DROPPABLE */}
          <Droppable droppableId="categoriess" type="CATEGORY">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {/* add new code here  */}
                {loading || data.categories.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    {/* <div className="loaders">Loading...</div> */}
                    <Loader/>
                  </div>
                ) : (
                  data.categories.map((cat, cIdx) => (
                    <Draggable
                      draggableId={`cat-${cat.category_id}`}
                      index={cIdx}
                      key={cat.category_id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="category-cards"
                        >
                          {/* CATEGORY ROW */}
                          <div
                            className="category-rows"
                            onClick={() => toggleOpen(cat.category_id)}
                          >
                            <div className="lefts">
                              <div>
                                {openIds.includes(cat.category_id) ? (
                                  <IoChevronUpOutline size={18} />
                                ) : (
                                  <ChevronRight size={18} />
                                )}
                              </div>

                              <div className="category_headings">
                                <h2 className="category_names">
                                  {cat.category_name}
                                </h2>
                              </div>
                            </div>

                            <div
                              className="rights d-flex"
                              style={{ columnGap: "1rem" }}
                            >
                              <label className="switchs">
                                <input
                                  type="checkbox"
                                  checked={cat.status === "active"}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={() =>
                                    handleToggleStatus(cat.category_id)
                                  }
                                />
                                <span></span>
                              </label>

                              <div
                                className="edits"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal({
                                    type: "category",
                                    catId: cat.category_id,
                                    name: cat.category_name,
                                    status: cat.status,
                                  });
                                }}
                              >
                                <FaRegEdit size={15} />
                              </div>

                              <div
                                className="deletes"
                                onClick={() =>
                                  handledeleteCategory(cat.category_id)
                                }
                              >
                                <MdDeleteOutline size={15} />
                              </div>
                            </div>
                          </div>

                          {/* SUBCATEGORY */}
                          {openIds.includes(cat.category_id) && (
                            <Droppable
                              droppableId={`sub-${cat.category_id}`}
                              type="SUBCATEGORY"
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="subcategory-wraps"
                                >
                                  <table className="my-tables">
                                    <thead>
                                      <tr>
                                        <th style={{ width: "40%" }}>
                                          Subcategory
                                        </th>
                                        <th>Status</th>
                                        <th style={{ textAlign: "center" }}>
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {cat.subcategories.map((sub, sIdx) => (
                                        <Draggable
                                          draggableId={`sub-${sub.sub_category_id}`}
                                          index={sIdx}
                                          key={sub.sub_category_id}
                                        >
                                          {(provided) => (
                                            <>
                                              <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={
                                                  sub.status !== "active"
                                                    ? "inactive-rows"
                                                    : ""
                                                }
                                                onClick={() =>
                                                  toggleOpenSubcategory(
                                                    sub.sub_category_id
                                                  )
                                                }
                                              >
                                                <td>{sub.sub_category_name}</td>

                                                <td>
                                                  <label
                                                    className="switchs"
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={
                                                        sub.status === "active"
                                                      }
                                                      onClick={(e) =>
                                                        e.stopPropagation()
                                                      }
                                                      onChange={() =>
                                                        handleToggleStatus(
                                                          cat.category_id,
                                                          sub.sub_category_id
                                                        )
                                                      }
                                                    />
                                                    <span></span>
                                                  </label>
                                                </td>

                                                <td
                                                  style={{
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    gap: "1rem",
                                                  }}
                                                >
                                                  <span
                                                    className="edits"
                                                    onClick={() =>
                                                      openEditModal({
                                                        type: "sub_category",
                                                        catId: cat.category_id,
                                                        subId:
                                                          sub.sub_category_id,
                                                        name: sub.sub_category_name,
                                                        status: sub.status,
                                                      }) ||
                                                      setShowEditModal(true)
                                                    }
                                                  >
                                                    <FaRegEdit size={15} />
                                                  </span>

                                                  <span
                                                    className="deletes"
                                                    onClick={() =>
                                                      handledeleteSubCategory(
                                                        cat.category_id,
                                                        sub.sub_category_id
                                                      )
                                                    }
                                                  >
                                                    <MdDeleteOutline
                                                      size={15}
                                                    />
                                                  </span>
                                                </td>
                                              </tr>

                                              {/* SERVICES */}
                                              {openIdssubcategory.includes(
                                                sub.sub_category_id
                                              ) && (
                                                <Droppable
                                                  droppableId={`srv-${sub.sub_category_id}`}
                                                  type="SERVICE"
                                                >
                                                  {(provided) => (
                                                    <tr>
                                                      <td colSpan="3">
                                                        <div
                                                          ref={
                                                            provided.innerRef
                                                          }
                                                          {...provided.droppableProps}
                                                          className="services-blocks"
                                                        >
                                                          {sub.services.map(
                                                            (ser, i) => (
                                                              <Draggable
                                                                draggableId={`srv-${ser.id}`}
                                                                index={i}
                                                                key={ser.id}
                                                              >
                                                                {(provided) => (
                                                                  <div
                                                                    ref={
                                                                      provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="service-items"
                                                                  >
                                                                    <div className="dots"></div>

                                                                    <div
                                                                      style={{
                                                                        flex: 1,
                                                                      }}
                                                                    >
                                                                      {
                                                                        ser.title
                                                                      }
                                                                    </div>

                                                                    <label
                                                                      className="switchs"
                                                                      style={{
                                                                        cursor:
                                                                          "pointer",
                                                                      }}
                                                                    >
                                                                      <input
                                                                        type="checkbox"
                                                                        checked={
                                                                          ser.status ===
                                                                          "active"
                                                                        }
                                                                        onChange={() =>
                                                                          handleToggleStatus(
                                                                            cat.category_id,
                                                                            sub.sub_category_id,
                                                                            ser.id
                                                                          )
                                                                        }
                                                                      />
                                                                      <span></span>
                                                                    </label>
                                                                    <div
                                                                      style={{
                                                                        textAlign:
                                                                          "center",
                                                                        display:
                                                                          "flex",
                                                                        justifyContent:
                                                                          "center",
                                                                        gap: "1rem",
                                                                      }}
                                                                    >
                                                                      <span
                                                                        className="edits"
                                                                        onClick={() =>
                                                                          openEditModal(
                                                                            {
                                                                              type: "service",
                                                                              catId:
                                                                                cat.category_id,
                                                                              subId:
                                                                                sub.sub_category_id,
                                                                              serviceId:
                                                                                ser.id,
                                                                              name: ser.title,
                                                                              status:
                                                                                ser.status,
                                                                            }
                                                                          ) ||
                                                                          setShowEditModal(
                                                                            true
                                                                          )
                                                                        }
                                                                      >
                                                                        <FaRegEdit
                                                                          size={
                                                                            15
                                                                          }
                                                                        />
                                                                      </span>

                                                                      <span
                                                                        className="deletes"
                                                                        onClick={() =>
                                                                          deleteService(
                                                                            cat.category_id,
                                                                            sub.sub_category_id,
                                                                            ser.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <MdDeleteOutline
                                                                          size={
                                                                            15
                                                                          }
                                                                        />
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                )}
                                                              </Draggable>
                                                            )
                                                          )}

                                                          {provided.placeholder}
                                                        </div>
                                                        <button
                                                        onClick={() =>
                                                          openCreateModal(
                                                            "service",
                                                            cat.category_id,
                                                            sub.sub_category_id
                                                          )
                                                        }
                                                      >
                                                        add services
                                                      </button>

                                                      </td>
                                                       
                                                    </tr>
                                                  )}
                                                </Droppable>
                                              )}
                                            </>
                                          )}
                                        </Draggable>
                                      ))}

                                      {provided.placeholder}
                                    </tbody>
                                  </table>

                                  <button
                                    onClick={() =>
                                      openCreateModal(
                                        "sub_category",
                                        cat.category_id
                                      )
                                    }
                                  >
                                    New Subcategory
                                  </button>
                                </div>
                              )}
                            </Droppable>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button className="create-roots">
            <LayoutGrid /> Create New Root Category
          </button>

          {/* EDIT MODAL */}


          {showModal && (
            <div className="modal-overlays">
              <div className="modal-boxs">
                <h4>
                  {modalData.name
                    ? "Edit"
                    : "Create"}{" "}
                  {modalData.type.replace("_", " ")}
                </h4>

                {/* NAME */}
                <input
                  className="form-control mb-2"
                  placeholder="Enter name"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                />

                {/* STATUS */}
                <select
                  className="form-select"
                  value={modalData.status}
                  onChange={(e) =>
                    setModalData({ ...modalData, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <div className="mt-3 text-end">
                  <button
                    className="btns btn-secondarys me-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btns btn-primarys" onClick={handleSaveModal}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default OrderService;
