// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { Form, Card, Button } from "react-bootstrap";
// import  "../../assets/admin_dashboard.css";
// import { sub_sub_category } from "../../DynamicJsonList/services_list";
// import { Editor } from "primereact/editor";
// import { getServiceDetailsByserviceId } from "../../admin_Auth/adminApi";
// const ServicesDetailsPage = () => {
// const { id } = useParams();
// const location = useLocation();

// const serviceNameFromNav = location.state?.serviceName || "";

// const [loading, setLoading] = useState(false);
// const [isEdit, setIsEdit] = useState(false);

// const [formData, setFormData] = useState({
//   service: id,
//   name: serviceNameFromNav,
//   title: "",
//   description: "",
//   metaKeyword: "",
//   metaDescription: "",
// });
// // console.log(formData,"formData");
// const [sections, setSections] = useState([]);

//  const handleChange = (e) => {
//   const { name, value } = e.target;

//   setFormData(prev => ({
//     ...prev,
//     [name]: value
//   }));
// };

// const fetchServiceDetails = async () => {
//   if (!id) return;

//   setLoading(true);
//   try {
//     const res = await getServiceDetailsByserviceId(id);

//     if (res.isExist && res.serviceDetails) {
//       const data = res.serviceDetails;

//       setIsEdit(true);

//       setFormData({
//         service: id,
//         name: data.service?.name || serviceNameFromNav,
//         title: data.title || "",
//         description: data.description || "",
//         metaKeyword: data.metaKeyword || "",
//         metaDescription: data.metaDescription || "",
//       });

//       setSections(data.sections || []);
//     }

//     else {
//       setIsEdit(false);
//     }

//   } catch (error) {
//     console.error("Fetch ServiceDetails Error:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// useEffect(() => {
//   fetchServiceDetails();
// }, [id]);

//   //  const [sections, setSections] = useState([]);

//   // add new blank section
//   const addSection = () => {
//     setSections(prev => [
//       ...prev,
//       { sectionTitle: "", sectionDescription: "", sectionImage: "" }
//     ]);
//   };

//   // handle input changes
//   const handleSectionChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updated = [...sections];

//     updated[index][name] = files ? files[0] : value;

//     setSections(updated);
//   };
//   const removeSection = (index) => {
//     setSections(prev => prev.filter((_, i) => i !== index));
//   };
//   return (
//     <div className="category-container"style={{height:"180vh"}}>
//       <div className="container-wrapper">

//       <h4 className="heading_category">Create Service Details</h4>

//       <Form>
//         <div className="d-flex"style={{justifyContent:'space-between',columnGap:"1rem"}}>
//            <Form.Group className="mb-4" style={{width:"50vw"}}>
//           <Form.Label style={{ textAlign: "left", display: "block" }}>Service Name</Form.Label>
//           <Form.Group className="mb-4" style={{ width: "50vw" }}>
//   {/* <Form.Label  style={{ textAlign: "left", display: "block" }} >Service Name</Form.Label> */}
//   <Form.Control
//     type="text"
//     value={formData.name}
//     disabled
//   />
// </Form.Group>

//         </Form.Group>

//         <Form.Group className="mb-4" style={{width:"50vw"}}>
//           <Form.Label style={{ textAlign: "left", display: "block" }}>Service Title</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             // disabled
//           />
//         </Form.Group></div>

//         <Form.Group className="mb-5 mt-5">
//           <Form.Label style={{ textAlign: "left", display: "block" }}>Service Description</Form.Label>
//           <Form.Control
//             type="text"
//             name="description"
//             value={formData.description}
//             rows={3}
//             onChange={handleChange}
//             // disabled
//           />
//         </Form.Group>
//          <div className="d-flex"style={{justifyContent:'space-between',columnGap:"1rem"}}>
//         <Form.Group className="mb-4"style={{width:"50vw"}}>
//           <Form.Label style={{ textAlign: "left", display: "block" }}>Service metaKeyword</Form.Label>
//           <Form.Control
//             type="text"
//             name="metaDescription"
//             value={formData.metaKeyword}
//             onChange={handleChange}
//             // disabled
//           />
//         </Form.Group>
//         <Form.Group className="mb-4"style={{width:"50vw"}}>
//           <Form.Label style={{ textAlign: "left", display: "block" }}>Service metaDescription</Form.Label>
//           <Form.Control
//             type="text"
//             name="metaDescription"
//             value={formData.metaDescription}
//             onChange={handleChange}
//             // disabled
//           />
//         </Form.Group>
// </div>

//       {/* ALWAYS SHOW BUTTON */}
//      <div className="content-Container" >
//   <div className="content-heading-section">
//     <h2 className="content-heading">Content Sections</h2>
//   </div>

//   <div className="content-container-second" style={{ margin: "1rem" }}>

//     {/* IF NO SECTIONS */}
//     {sections.length === 0 && (
//       <p className="content-paragraph" style={{textAlign:"center",marginTop:"18rem"}}>
//         No sections added yet. Click "Add Content" to create content.
//       </p>
//     )}

//     {/* IF SECTIONS EXIST */}
//     {sections.length > 0 &&
//       sections.map((section, index) => (
//         <div className="mb-4 form_card" key={index}>

//           <div className="d-flex section_form" style={{ justifyContent: "space-between" }}>
//             <p style={{ fontSize: "16px", fontWeight: "bold" }}>
//               Section {index + 1}
//             </p>

//             <Button
//               variant="danger"
//               size="sm"
//               onClick={() => removeSection(index)}
//             >
//               ✕
//             </Button>
//           </div>

//           <div className="p-4">
//             <Form.Group className="mb-4">
//               <Form.Label style={{ textAlign: "left", display: "block" }}>Section Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="sectionTitle"
//                 value={section.sectionTitle}
//                 onChange={(e) => handleSectionChange(index, e)}
//               />
//             </Form.Group>

//              <div className="card">
//             <Editor    value={section.sectionDescription} onTextChange={(e) => (e) => handleSectionChange(index, e)} style={{ height: '320px' }} />
//         </div>

//             <Form.Group className="mb-3">
//               <Form.Label style={{ textAlign: "left", display: "block" }}>Section Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="sectionImage"
//                 onChange={(e) => handleSectionChange(index, e)}
//               />
//             </Form.Group>
//           </div>
//         </div>
//       ))}

//     {/* BUTTON ALWAYS VISIBLE */}
//     <Button variant="primary" onClick={addSection}>
//       + Add Content
//     </Button>
//   </div>
// </div>
// <Button variant="success">
//   {isEdit ? "Update Service Details" : "Create Service Details"}
// </Button>

//       </Form>
// </div>
//     </div>
//   );
// };

// export default ServicesDetailsPage;

// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useParams, useLocation } from "react-router-dom";
// import { Editor } from "primereact/editor";
// import {
//   addServiceDetails,
//   getServiceDetailsByserviceId,
//   updateServiceDetails,
// } from "../../admin_Auth/adminApi";


// const ServiceDetailsPage = () => {
//   const { id } = useParams();
//   const location = useLocation();

//   // service name coming from navigation
//   const serviceNameFromNav = location.state?.serviceName || "";

//   const [loading, setLoading] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);

//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     service: id,
//     name: serviceNameFromNav,
//     title: "",
//     description: "",
//     metaKeyword: "",
//     metaDescription: "",
//   });
//   // console.log(formData,"formdata")
//   const [sections, setSections] = useState([]);

//   // ---------------- FETCH SERVICE DETAILS ----------------
//   const fetchServiceDetails = async () => {
//     if (!id) return;

//     setLoading(true);
//     try {
//       const res = await getServiceDetailsByserviceId(id);

//       if (res.service) {
//         const data = res.service;
//         // console.log(data[0].title,"response data")
//         setIsEdit(true);

//         setFormData({
//           service: data[0].service?.[0] || id, // backend sends array
//           name: serviceNameFromNav,
//           title: data[0].title || "",
//           description: data[0].description || "",
//           metaKeyword: data[0].metaKeyword || "",
//           metaDescription: data[0].metaDescription || "",
//         });

//         setSections(
//           data[0].sections?.map((sec) => ({
//             sectionTitle: sec.sectionTitle || "",
//             sectionDescription: sec.sectionDescription || "",
//             sectionImage: sec.sectionImage || "",
//             _id: sec._id,
//           })) || []
//         );
//       } else {
//         setIsEdit(false);
//       }
//     } catch (error) {
//       console.error("Fetch ServiceDetails Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceDetails();
//   }, [id]);

//   // ---------------- FORM HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ---------------- SECTIONS ----------------
//   const addSection = () => {
//     setSections((prev) => [
//       ...prev,
//       { sectionTitle: "", sectionDescription: "", sectionImage: "" },
//     ]);
//   };

//   const handleSectionChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updated = [...sections];
//     updated[index][name] = files ? files[0] : value;
//     setSections(updated);
//   };

//   const removeSection = (index) => {
//     setSections((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ---------------- SUBMIT ----------------
//   // const handleSubmit = async () => {
//   //   const payload = new FormData();

//   //   payload.append("service", formData.service);
//   //   payload.append("title", formData.title);
//   //   payload.append("description", formData.description);
//   //   payload.append("metaKeyword", formData.metaKeyword);
//   //   payload.append("metaDescription", formData.metaDescription);

//   //   sections.forEach((sec, index) => {
//   //     payload.append(`sections[${index}][sectionTitle]`, sec.sectionTitle);
//   //     payload.append(
//   //       `sections[${index}][sectionDescription]`,
//   //       sec.sectionDescription
//   //     );
//   //     if (sec.sectionImage instanceof File) {
//   //       payload.append(`sections[${index}][sectionImage]`, sec.sectionImage);
//   //     }
//   //   });
//   //      try {
//   //        setLoading(true);

//   //        const res = await addServiceDetails(formData);

//   //        console.log("Create Response:", res);

//   //        setMessage(res?.message || "Category created successfully");

//   //        await fetchServiceDetails();

//   //      } catch (err) {

//   //        console.error("Create Error:", err);
//   //        setMessage(err?.response?.data?.message || "Error occurred while saving.");

//   //      } finally {
//   //        setLoading(false);
//   //      }
//   // };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const payload = new FormData();

//       payload.append("service", formData.service);
//       payload.append("title", formData.title);
//       payload.append("description", formData.description);
//       payload.append("metaKeyword", formData.metaKeyword);
//       payload.append("metaDescription", formData.metaDescription);

//       // convert sections to JSON WITHOUT images
//       const sectionsData = sections.map((sec) => ({
//         sectionTitle: sec.sectionTitle,
//         sectionDescription: sec.sectionDescription,
//         sectionImage: sec.sectionImage instanceof File ? "" : sec.sectionImage, // keep old URL if already present
//       }));

//       payload.append("sections", JSON.stringify(sectionsData));

//       // append section images separately with naming convention
//       sections.forEach((sec, index) => {
//         if (sec.sectionImage instanceof File) {
//           payload.append(`sectionImage_${index}`, sec.sectionImage);
//         }
//       });

//       const res = await addServiceDetails(payload);

//       console.log("Create Response:", res);
//       setMessage(res?.message || "ServiceDetails created successfully");
//       await fetchServiceDetails();
//     } catch (err) {
//       console.error("Create Error:", err);
//       setMessage(
//         err?.response?.data?.message || "Error occurred while saving."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // handle update form data
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       const payload = new FormData();

//       payload.append("service", formData.service);
//       payload.append("title", formData.title);
//       payload.append("description", formData.description);
//       payload.append("metaKeyword", formData.metaKeyword);
//       payload.append("metaDescription", formData.metaDescription);

//       // convert sections to JSON (image URLs stay if not replaced)
//       const sectionsData = sections.map((sec) => ({
//         sectionTitle: sec.sectionTitle,
//         sectionDescription: sec.sectionDescription,
//         sectionImage: sec.sectionImage instanceof File ? "" : sec.sectionImage,
//       }));

//       payload.append("sections", JSON.stringify(sectionsData));

//       // append new images only
//       sections.forEach((sec, index) => {
//         if (sec.sectionImage instanceof File) {
//           payload.append(`sectionImage_${index}`, sec.sectionImage);
//         }
//       });

//       const res = await updateServiceDetails(id, payload);

//       console.log("Update Response:", res);
//       setMessage(res?.message || "ServiceDetails updated successfully");

//       // optionally re-fetch updated serviceDetails
//       await fetchServiceDetails();
//     } catch (err) {
//       console.error("Update Error:", err);
//       setMessage(
//         err?.response?.data?.message || "Error occurred while updating."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="category-container" style={{ height: "180vh" }}>
//       <div className="container-wrapper">
//         <h4 className="heading_category">
//           {isEdit ? "Update Service Details" : "Create Service Details"}
//         </h4>

//         <Form>
//           {/* SERVICE NAME */}
//           <Form.Group className="mb-4">
//             <Form.Label>Service Name</Form.Label>
//             <Form.Control type="text" value={formData.name} disabled />
//           </Form.Group>

//           {/* TITLE */}
//           <Form.Group className="mb-4">
//             <Form.Label>Service Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           {/* DESCRIPTION */}
//           <Form.Group className="mb-4">
//             <Form.Label>Service Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           {/* META */}
//           <Form.Group className="mb-4">
//             <Form.Label>Meta Keyword</Form.Label>
//             <Form.Control
//               type="text"
//               name="metaKeyword"
//               value={formData.metaKeyword}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Meta Description</Form.Label>
//             <Form.Control
//               type="text"
//               name="metaDescription"
//               value={formData.metaDescription}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           {/* SECTIONS */}
//           <h4 className="mt-5">Content Sections</h4>

//           {sections.length === 0 && (
//             <p style={{ textAlign: "center", marginTop: "2rem" }}>
//               No sections added yet.
//             </p>
//           )}

//           {sections.map((section, index) => (
//             <div key={index} className="form_card mb-4 p-4">
//               <div className="d-flex justify-content-between">
//                 <strong>Section {index + 1}</strong>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => removeSection(index)}
//                 >
//                   ✕
//                 </Button>
//               </div>

//               <Form.Group className="mt-3">
//                 <Form.Label>Section Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="sectionTitle"
//                   value={section.sectionTitle}
//                   onChange={(e) => handleSectionChange(index, e)}
//                 />
//               </Form.Group>

//               <div className="mt-3">
//                 <Editor
//                   value={section.sectionDescription}
//                   onTextChange={(e) =>
//                     handleSectionChange(index, {
//                       target: {
//                         name: "sectionDescription",
//                         value: e.htmlValue,
//                       },
//                     })
//                   }
//                   style={{ height: "300px" }}
//                 />
//               </div>

//               <Form.Group className="mt-3">
//                 <Form.Label>Section Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="sectionImage"
//                   onChange={(e) => handleSectionChange(index, e)}
//                 />
//               </Form.Group>
//             </div>
//           ))}

//           <Button variant="primary" onClick={addSection}>
//             + Add Content
//           </Button>

//           <div className="mt-4">
//             <Button variant="success" onClick={handleSubmit}>
//               {isEdit ? "Update Service Details" : "Create Service Details"}
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetailsPage;



// second version of code
// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useParams, useLocation } from "react-router-dom";
// import { Editor } from "primereact/editor";

// import {
//   addServiceDetails,
//   getServiceDetailsByserviceId,
//   updateServiceDetails,
// } from "../../admin_Auth/adminApi";

// const ServiceDetailsPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
// console.log(location,"location name ")
//   const serviceNameFromNav = location.state?.serviceName || "";

//   const [loading, setLoading] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imagePreview, setImagePreview] = useState([]); // existing images
//    const [removedImages, setRemovedImages] = useState([]);
//      const [images, setImages] = useState([]);
//      console.log(images,"set images")
//   const [formData, setFormData] = useState({
//     service: id,
//     name: serviceNameFromNav,
//     title: "",
//     description: "",
//     metaKeyword: "",
//     metaDescription: "",
//   });

//   const [sections, setSections] = useState([
//     { sectionTitle: "", sectionDescription: ""},
//   ]);

//   // ---------------- FETCH SERVICE DETAILS ----------------
//   const fetchServiceDetails = async () => {
//     if (!id) return;

//     try {
//       setLoading(true);
//       const res = await getServiceDetailsByserviceId(id);

//       if (res?.service?.length) {
//         const data = res.service[0];
//         setIsEdit(true);

//         setFormData({
//           service: data.service?.[0] || id,
//           name: serviceNameFromNav,
//           title: data.title || "",
//           description: data.description || "",
//           metaKeyword: data.metaKeyword || "",
//           metaDescription: data.metaDescription || "",
//         });
//         // setImages(data.images || [])
//       setImages(
//     data.images?.length
//       ? data.images.map((img) => ({ url: img })) // or { url: img.url } if your backend returns objects
//       : []
//   );
//         setSections(
//           data.sections?.length
//             ? data.sections.map((sec) => ({
//                 sectionTitle: sec.sectionTitle || "",
//                 sectionDescription: sec.sectionDescription || "",
//                 // image: sec.image || "",
//               }))
//             : [{ sectionTitle: "", sectionDescription: ""}]
//         );
//       } else {
//         setIsEdit(false);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceDetails();
//   }, [id]);

//   // ---------------- FORM HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ---------------- SECTIONS ----------------
//   const addSection = () => {
//     setSections((prev) => [
//       ...prev,
//       { sectionTitle: "", sectionDescription: ""},
//     ]);
//   };

//   const removeSection = (index) => {
//     setSections((prev) =>
//       prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
//     );
//   };

//   const handleSectionChange = (index, e) => {
//     const updated = [...sections];

//     if (e.target.files) {
//       updated[index][e.target.name] = e.target.files[0];
//     } else {
//       updated[index][e.target.name] = e.target.value;
//     }

//     setSections(updated);
//   };

//   // ---------------- CREATE ----------------
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const payload = new FormData();
//       payload.append("service", formData.service);
//       payload.append("title", formData.title);
//       payload.append("description", formData.description);
//       payload.append("metaKeyword", formData.metaKeyword);
//       payload.append("metaDescription", formData.metaDescription);

//       const sectionsData = sections.map((sec) => ({
//         sectionTitle: sec.sectionTitle,
//         sectionDescription: sec.sectionDescription,
//         sectionImage: sec.image instanceof File ? "" : sec.image,
//       }));

//       payload.append("sections", JSON.stringify(sectionsData));

//       sections.forEach((sec, index) => {
//         if (sec.image instanceof File) {
//           payload.append(`sectionImage_${index}`, sec.image);
//         }
//       });

//       const res = await addServiceDetails(payload);
//       setMessage(res?.message || "ServiceDetails created successfully");
//       await fetchServiceDetails();
//     } catch (err) {
//       console.error("Create Error:", err);
//       setMessage(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UPDATE ----------------
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       const payload = new FormData();
//       payload.append("service", formData.service);
//       payload.append("title", formData.title);
//       payload.append("description", formData.description);
//       payload.append("metaKeyword", formData.metaKeyword);
//       payload.append("metaDescription", formData.metaDescription);

//       const sectionsData = sections.map((sec) => ({
//         sectionTitle: sec.sectionTitle,
//         sectionDescription: sec.sectionDescription,
//         sectionImage: sec.image instanceof File ? "" : sec.image,
//       }));

//       payload.append("sections", JSON.stringify(sectionsData));

//       sections.forEach((sec, index) => {
//         if (sec.image instanceof File) {
//           payload.append(`sectionImage_${index}`, sec.image);
//         }
//       });

//       const res = await updateServiceDetails(id, payload);
//       setMessage(res?.message || "ServiceDetails updated successfully");
//       await fetchServiceDetails();
//     } catch (err) {
//       console.error("Update Error:", err);
//       setMessage(err?.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="category-container">
//       <div className="container-wrapper">
//         <h4 className="heading_category">
//           {isEdit ? "Update Service Details" : "Create Service Details"}
//         </h4>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Service Name</Form.Label>
//             <Form.Control value={formData.name} disabled />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Service Title</Form.Label>
//             <Form.Control
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Service Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Meta Keyword</Form.Label>
//             <Form.Control
//               name="metaKeyword"
//               value={formData.metaKeyword}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Meta Description</Form.Label>
//             <Form.Control
//               name="metaDescription"
//               value={formData.metaDescription}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <h4>Content Sections</h4>

//           {sections.map((section, index) => (
//             <div key={index} className="form_card p-4 mb-4">
//               <div className="d-flex justify-content-between">
//                 <strong>Section {index + 1}</strong>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => removeSection(index)}
//                 >
//                   ✕
//                 </Button>
//               </div>

//               <Form.Group className="mt-3">
//                 <Form.Label>Section Title</Form.Label>
//                 <Form.Control
//                   name="sectionTitle"
//                   value={section.sectionTitle}
//                   onChange={(e) => handleSectionChange(index, e)}
//                 />
//               </Form.Group>

//               <div className="mt-3">
//                 <Editor
//                   value={section.sectionDescription}
//                   onTextChange={(e) =>
//                     handleSectionChange(index, {
//                       target: {
//                         name: "sectionDescription",
//                         value: e.htmlValue,
//                       },
//                     })
//                   }
//                   style={{ height: "300px" }}
//                 />
//               </div>

//               {/* <Form.Group className="mt-3">
//                 <Form.Label>Section Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="image"
//                   onChange={(e) => handleSectionChange(index, e)}
//                 />
//               </Form.Group> */}
//               <div className="mb-3">
//                 <label className="form-label">Blog Images</label>

//                 {/* EXISTING IMAGES */}
//                 {imagePreview.length > 0 && (
//                   <div className="d-flex gap-2 flex-wrap mb-2">
//                     {imagePreview.map((img, index) => (
//                       <div key={index} style={{ position: "relative" }}>
//                         <img
//                           src={img}
//                           alt="Blog"
//                           style={{
//                             width: "120px",
//                             height: "120px",
//                             objectFit: "cover",
//                             borderRadius: "8px",
//                           }}
//                         />

//                         <button
//                           type="button"
//                           className="btn btn-sm btn-danger"
//                           style={{
//                             position: "absolute",
//                             top: "5px",
//                             right: "5px",
//                           }}
//                           onClick={() => {
//                             setRemovedImages((prev) => [...prev, img]);
//                             setImagePreview((prev) =>
//                               prev.filter((_, i) => i !== index)
//                             );
//                           }}
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* NEW IMAGE UPLOAD */}
//                 <input
//                   className="form-control"
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => setImages([...e.target.files])}
//                 />
//               </div>
//             </div>
//           ))}

//           <Button variant="primary" onClick={addSection}>
//             + Add Content
//           </Button>

//           <div className="mt-4">
//             <Button
//               variant="success"
//               onClick={isEdit ? handleUpdate : handleSubmit}
//               disabled={loading}
//             >
//               {isEdit ? "Update Service Details" : "Create Service Details"}
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetailsPage;




// second update code 

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";

import {
  addServiceDetails,
  getServiceDetailsByserviceId,
  updateServiceDetails,
} from "../adminApi";

const ServiceDetailsPage = () => {
  const { id } = useParams();


const location = useLocation();

const [serviceCategory, setServiceCategory] = useState("");
const [serviceSubcategory, setServiceSubcategory] = useState("");
const [name, setName] = useState("");

useEffect(() => {
  if (location.state) {
    setName(location.state.serviceName || "");
    setServiceCategory(location.state.categoryName || "");
    setServiceSubcategory(location.state.subcategoryName || "");
  }
}, [location.state]);


// console.log(location.state, "category");
// console.log(serviceSubcategory, "subcategory");

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  // 🔥 Images (backend structure)
  const [images, setImages] = useState([]);       
  const [newImages, setNewImages] = useState([]); 
  const [removedImages, setRemovedImages] = useState([]);

  const [formData, setFormData] = useState({
    service: id,
    // name:name,
    //  category:serviceCategory,
    // subcategory:serviceSubcategory,
    title: "",
    description: "",
    metaKeyword: "",
    metaDescription: "",
  });


  const [sections, setSections] = useState([
    {
      sectionTitle: "",
      sectionDescription: "",
      imageIndex: null, // 🔥 index of images[]
    },
  ]);

  /* =====================================================
     FETCH SERVICE DETAILS
  ===================================================== */
  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const res = await getServiceDetailsByserviceId(id);

      if (res?.service?.length) {
        const data = res.service[0];
        setIsEdit(true);

        setFormData({
          service: data.service?.[0] || id,
    //       name:name,
    //        category:serviceCategory,
    // subcategory:serviceSubcategory,
          title: data.title || "",
          description: data.description || "",
          metaKeyword: data.metaKeyword || "",
          metaDescription: data.metaDescription || "",
        });

     
        setImages(data.images || []);

     
        setSections(
          data.sections.map((sec, index) => ({
            sectionTitle: sec.sectionTitle || "",
            sectionDescription: sec.sectionDescription || "",
            imageIndex: data.images?.[index] ? index : null,
          }))
        );
      } else {
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  /* =====================================================
     FORM HANDLERS
  ===================================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =====================================================
     SECTION HANDLERS
  ===================================================== */
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { sectionTitle: "", sectionDescription: "", imageIndex: null },
    ]);
  };

  const removeSection = (index) => {
    setSections((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  /* =====================================================
     IMAGE HANDLING (SECTION WISE)
  ===================================================== */
  const handleSectionImage = (index, file) => {
    if (!file) return;

    setNewImages((prev) => [...prev, file]);

    setSections((prev) => {
      const updated = [...prev];
      updated[index].imageIndex = images.length + newImages.length;
      return updated;
    });
  };

 

  const removeSectionImage = (index) => {
  const imgIndex = sections[index].imageIndex;

  if (imgIndex !== null && images[imgIndex]) {
    setRemovedImages((prev) => [...prev, images[imgIndex]]);
  }

  setSections((prev) => {
    const updated = [...prev];
    updated[index].imageIndex = null; // 🔥 IMPORTANT
    return updated;
  });
};

  /* =====================================================
     CREATE
  ===================================================== */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = new FormData();

      payload.append("service", formData.service);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("metaKeyword", formData.metaKeyword);
      payload.append("metaDescription", formData.metaDescription);
      payload.append("name",name)
      payload.append("category",serviceCategory)
      payload.append("subcategory",serviceSubcategory)
      // payload.append("name")

      // 🔥 sections WITHOUT image
      payload.append(
        "sections",
        JSON.stringify(
          sections.map(({ sectionTitle, sectionDescription }) => ({
            sectionTitle,
            sectionDescription,
          }))
        )
      );

      // 🔥 images separate
      newImages.forEach((file) => payload.append("images", file));

      const res = await addServiceDetails(payload);
      console.log(res,"created datadkj")
      setMessage(res?.message || "ServiceDetails created successfully");
      fetchServiceDetails();
      navigate("/admin/add-SubSubcategory")
    } catch (err) {
      console.error("Create Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     UPDATE
  ===================================================== */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const payload = new FormData();

      // payload.append("service", formData.service);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("metaKeyword", formData.metaKeyword);
      payload.append("metaDescription", formData.metaDescription);

      payload.append(
        "sections",
        JSON.stringify(
          sections.map(({ sectionTitle, sectionDescription }) => ({
            sectionTitle,
            sectionDescription,
          }))
        )
      );

      newImages.forEach((file) => payload.append("images", file));
      payload.append("removeImages", JSON.stringify(removedImages));

      const res = await updateServiceDetails(id, payload);
      setMessage(res?.message || "ServiceDetails updated successfully");
      fetchServiceDetails();
      navigate("/admin/add-SubSubcategory")
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="container">
      <h4>{isEdit ? "Update Service Details" : "Create Service Details"}</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Service Name</Form.Label>
          <Form.Control value={name} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={formData.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
   <Form.Group className="mb-3">          <Form.Label>Meta Keyword</Form.Label>
            <Form.Control
              name="metaKeyword"
              value={formData.metaKeyword}
              onChange={handleChange}
            />
          </Form.Group>

            <Form.Group className="mb-3">
             <Form.Label>Service Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3} 
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
            />
          </Form.Group>
        <h5>Sections</h5>

        {sections.map((section, index) => (
          <div key={index} className="border p-3 mb-3">
            <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeSection(index)}
                >
                  ✕
                </Button>
              
            <Form.Control
              className="mb-2"
              placeholder="Section Title"
              value={section.sectionTitle}
              onChange={(e) =>
                handleSectionChange(index, "sectionTitle", e.target.value)
              }
            />

            <Editor
              value={section.sectionDescription}
              onTextChange={(e) =>
                handleSectionChange(index, "sectionDescription", e.htmlValue)
              }
              style={{ height: "200px" }}
            />

            {/* IMAGE PREVIEW */}
            {section.imageIndex !== null &&
              (images[section.imageIndex] || newImages[section.imageIndex - images.length]) && (
                <div className="mt-3">
                  <img
                    src={
                      images[section.imageIndex] ||
                      URL.createObjectURL(newImages[section.imageIndex - images.length])
                    }
                    alt="section"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => removeSectionImage(index)}
                  >
                    Remove Image
                  </Button>
                </div>
              )}

  <Form.Control
    type="file"
    className="mt-2"
    onChange={(e) => handleSectionImage(index, e.target.files[0])}
  />

          </div>
        ))}

        <Button onClick={addSection}>+ Add Section</Button>

        <div className="mt-4">
          <Button
            variant="success"
            onClick={isEdit ? handleUpdate : handleSubmit}
            disabled={loading}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ServiceDetailsPage;
