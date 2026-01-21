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
      <div className="sidebar_logos">
        <img src="" alt="unicx_crm" />
        <span>Unicx</span>
      </div>
      <hr className="hylperlinks"/>

      <div className="sidebar_menu_lists">

        <h1 className="sidebar_titles">
          <MdOutlineDashboard size={18} style={{marginTop:"0.3rem"}}/>Dashboard</h1>

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
  //  <div className={darkMode ? "dark" : ""}>
  //     {/* Navbar */}
  //     {/* <nav className="navbar">
  //       <div className="logo_item">
  //         <i
  //           className="bx bx-menu"
  //           id="sidebarOpen"
  //           onClick={() => setSidebarOpen(!sidebarOpen)}
  //         ></i>

  //         <img src="images/logo.png" alt="" />
  //         CodingNepal
  //       </div>

  //       <div className="search_bar">
  //         <input type="text" placeholder="Search" />
  //       </div>

  //       <div className="navbar_content">
  //         <i className="bi bi-grid"></i>

  //         <i
  //           className="bx bx-sun"
  //           id="darkLight"
  //           onClick={() => setDarkMode(!darkMode)}
  //         ></i>

  //         <i className="bx bx-bell"></i>

  //         <img src="images/profile.jpg" alt="" className="profile" />
  //       </div>
  //     </nav> */}

  //     {/* Sidebar */}
  //     <nav className='sidebar'>
  //       <div className="menu_content">

  //         <ul className="menu_items">
  //           <div className="menu_title menu_dahsboard"></div>

  //           {/* Home */}
  //           <li className="item">
  //             <div
  //               className="nav_link submenu_item"
  //               onClick={() => toggleSubMenu(1)}
  //             >
  //               <span className="navlink_icon">
  //                 <i className="bx bx-home-alt"></i>
  //               </span>
  //               <span className="navlink">Home</span>
  //               <i className="bx bx-chevron-right arrow-left"></i>
  //             </div>

  //             <ul className={`menu_items submenu ${activeMenu === 1 ? "show" : ""}`}>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //             </ul>
  //           </li>

  //           {/* Overview */}
  //           <li className="item">
  //             <div
  //               className="nav_link submenu_item"
  //               onClick={() => toggleSubMenu(2)}
  //             >
  //               <span className="navlink_icon">
  //                 <i className="bx bx-grid-alt"></i>
  //               </span>
  //               <span className="navlink">Overview</span>
  //               <i className="bx bx-chevron-right arrow-left"></i>
  //             </div>

  //             <ul className={`menu_items submenu ${activeMenu === 2 ? "show" : ""}`}>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //               <a href="#" className="nav_link sublink">Nav Sub Link</a>
  //             </ul>
  //           </li>
  //         </ul>

  //         {/* Editor Menu */}
  //         <ul className="menu_items">
  //           <div className="menu_title menu_editor"></div>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bxs-magic-wand"></i>
  //               </span>
  //               <span className="navlink">Magic build</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-loader-circle"></i>
  //               </span>
  //               <span className="navlink">Filters</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-filter"></i>
  //               </span>
  //               <span className="navlink">Filter</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-cloud-upload"></i>
  //               </span>
  //               <span className="navlink">Upload new</span>
  //             </a>
  //           </li>
  //         </ul>

  //         {/* Settings */}
  //         <ul className="menu_items">
  //           <div className="menu_title menu_setting"></div>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-flag"></i>
  //               </span>
  //               <span className="navlink">Notice board</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-medal"></i>
  //               </span>
  //               <span className="navlink">Award</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-cog"></i>
  //               </span>
  //               <span className="navlink">Setting</span>
  //             </a>
  //           </li>

  //           <li className="item">
  //             <a href="#" className="nav_link">
  //               <span className="navlink_icon">
  //                 <i className="bx bx-layer"></i>
  //               </span>
  //               <span className="navlink">Features</span>
  //             </a>
  //           </li>
  //         </ul>

  //         {/* OPEN / CLOSE BUTTONS */}
  //         {/* <div className="bottom_content">
  //           <div className="bottom expand_sidebar" onClick={() => setSidebarOpen(true)}>
  //             <span>Expand</span>
  //             <i className="bx bx-log-in"></i>
  //           </div>

  //           <div className="bottom collapse_sidebar" onClick={() => setSidebarOpen(false)}>
  //             <span>Collapse</span>
  //             <i className="bx bx-log-out"></i>
  //           </div> */}
  //         {/* </div> */}
  //       </div>
  //     </nav>
  //   </div>
  );
};

export default Dashboard_sidebar;
