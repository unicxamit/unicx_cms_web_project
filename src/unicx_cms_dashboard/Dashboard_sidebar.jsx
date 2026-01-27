import React, { useState } from "react";
import { MdChevronRight, MdMiscellaneousServices, MdOutlineDashboard } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FaQ } from "react-icons/fa6";
import { NavLink,useNavigate } from "react-router-dom";
import "../services/serviceStyle/sidebar.css"
const Dashboard_sidebar = () => {
  const [Datapost, setDataPost] = useState(false);
const navigate=useNavigate();
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [darkMode, setDarkMode] = useState(false);
  // const [activeMenu, setActiveMenu] = useState(null);

  // const toggleSubMenu = (index) => {
  //   setActiveMenu(activeMenu === index ? null : index);
  // };
  const handleOpenManue=()=>{
     setDataPost(!Datapost)
     navigate("/admin/service-order")
  }

  return (
    <aside className="sidebar_lefts">
      <h1>Unicx Dashboar</h1>
      <div className="sidebar_logos">
        <div className="user_logo"><img src="" alt="unicx_crm" /></div>
        
        <span>Unicx</span>
      </div>
     

      <div className="sidebar_menu_lists">

        <NavLink to="/admin" className="sidebar_titles ">
          <MdOutlineDashboard size={18} style={{marginTop:"0.3rem"}}/>Dashboard</NavLink>

        {/* Services dropdown */}
        <div
          className="menu_items dropdown_headers"
          onClick={handleOpenManue}s
        >
          <MdMiscellaneousServices size={18} />
          <span >Services</span>
          <MdChevronRight
            size={22}
            className={`arrows ${Datapost ? "rotate" : ""}`}
          />
        </div>

        {/* Dropdown */}
        <div className={`dropdowns ${Datapost ? "open" : ""}`}>
          <NavLink to="/admin/add-category" className="dropdown_items">
            Category
          </NavLink>
   {/* <NavLink to="/admin/services/order" className="dropdown_item" >
             service_orders
          </NavLink> */}
          <NavLink to="/admin/add-Subcategory" className="dropdown_items">
            SubCategory
          </NavLink>

          <NavLink to="/admin/add-SubSubcategory" className="dropdown_items">
            Services
          </NavLink>
          
        </div>

        {/* Normal menu */}
        <NavLink to="/admin/add-blogs" className="menu_items" >
          <RiAccountCircleLine size={22} /> <span>Blocks</span>
        </NavLink>

        <NavLink to="/admin/add-caseStudy" className="menu_items">
          <RiAccountCircleLine size={22} /> <span>Case_study</span>
        </NavLink>

        <NavLink to="/admin/add-faqs" className="menu_items">
          <FaQ size={22} /> <span>Faq</span>
        </NavLink>
      </div>
    </aside>
   );
};

export default Dashboard_sidebar;
