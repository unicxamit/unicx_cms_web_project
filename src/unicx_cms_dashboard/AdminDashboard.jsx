import React, { useState } from "react";

import Dashboard_sidebar from "./Dashboard_sidebar";
import { NavLink, Outlet } from "react-router-dom";
import "../services/serviceStyle/admin_dashboard.css";
const AdminDashboard = () => {
  //   const [isClosed, setIsClosed] = useState(true);
  // const [openMenu, setOpenMenu] = useState(null);

  // const toggleSidebar = () => {
  //   setIsClosed(!isClosed);
  // };

  // const toggleMenu = (menuName) => {
  //   setOpenMenu(openMenu === menuName ? null : menuName);
  // };
  return (
    <div className="dashboard_layouts">

      <div className="sidebar_wrappers">
        <Dashboard_sidebar />
      </div>

      <div className="content_wrappers">
        <Outlet />
      </div>

    </div>
    //  <div className="dashboard_layout">
    //   <div className={`sidebar ${isClosed ? "close" : ""}`}>
    //     <div className="logo-details">
    //       <i className="bx bxl-c-plus-plus"></i>
    //       <span className="logo_name">CodingLab</span>
    //     </div>

    //     <ul className="nav-links">
    //       {/* Dashboard */}
    //       <li>
    //         <NavLink to="#">
    //           <i className="bx bx-grid-alt"></i>
    //           <NavLink to="/admin" className="link_name">Dashboard</NavLink>
    //         </NavLink>         <ul className="sub-menu blank">
    //           {/* <li>
    //             <a className="link_name" href="#">
    //               Dashboard
    //             </a>
    //           </li> */}
    //         </ul>
    //       </li>

    //       {/* Category */}
    //       <li className={openMenu === "category" ? "showMenu" : ""}>
    //         <div className="iocn-link">
    //           <NavLink to="/admin/service-order">
    //             <i className="bx bx-collection"></i>
    //             <span className="link_name">Services</span>
    //           </NavLink>
    //           <i
    //             className="bx bxs-chevron-down arrow"
    //             onClick={() => toggleMenu("category")}
    //           ></i>
    //         </div>
    //         <ul className="sub-menu">
    //           <li>
    //             <NavLink className="link_name" to="#">
    //               Category
    //             </NavLink>
    //           </li>
    //           <li><NavLink to="/admin/add-category">Category</NavLink ></li>
    //           <li><NavLink  to="/admin/add-Subcategory">SubCategory</NavLink ></li>
    //           <li><NavLink  to="/admin/add-SubSubcategory">Services</NavLink ></li>
    //         </ul>
    //       </li>

    //       {/* Posts */}
    //       {/* <li className={openMenu === "posts" ? "showMenu" : ""}>
    //         <div className="iocn-link">
    //           <a href="#">
    //             <i className="bx bx-book-alt"></i>
    //             <span className="link_name">Posts</span>
    //           </a>
    //           <i
    //             className="bx bxs-chevron-down arrow"
    //             onClick={() => toggleMenu("posts")}
    //           ></i>
    //         </div>
    //         <ul className="sub-menu">
    //           <li>
    //             <a className="link_name" href="#">
    //               Posts
    //             </a>
    //           </li>
    //           <li><a href="#">Web Design</a></li>
    //           <li><a href="#">Login Form</a></li>
    //           <li><a href="#">Card Design</a></li>
    //         </ul>
    //       </li> */}

    //       {/* Analytics */}
    //       <li>
    //         <NavLink to="/admin/add-blogs">
    //           <i className="bx bx-pie-chart-alt-2"></i>
    //           <span className="link_name">Blog</span>
    //         </NavLink>
    //            <NavLink to="/admin/add-caseStudy">
    //           <i className="bx bx-pie-chart-alt-2"></i>
    //           <span className="link_name">CaseStudy</span>
    //         </NavLink>
    //            <NavLink to="/admin/add-faqs">
    //           <i className="bx bx-pie-chart-alt-2"></i>
    //           <span className="link_name">Faq</span>
    //         </NavLink>
    //         {/* <ul className="sub-menu blank">
    //           <li><a className="link_name" href="/admin/add-caseStudy">CaseStudy</a></li>
    //             <li><a className="link_name" href="/admin/add-faqs">Faq</a></li>
    //         </ul> */}
    //       </li>

    //       {/* Profile */}
    //       <li>
    //         <div className="profile-details">
    //           <div className="profile-content">
    //             <img src="/image/profile.jpg" alt="profile" />
    //           </div>
    //           <div className="name-job">
    //             <div className="profile_name">Prem Shahi</div>
    //             <div className="job">Web Designer</div>
    //           </div>
    //           <i className="bx bx-log-out"></i>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* Home Section */}
    //   <section className="home-section">
    //     <div className="home-content">
    //       <i className="bx bx-menu" onClick={toggleSidebar}></i>
    //       <span className="text">Drop Down Sidebar</span>
    //     </div>
    //     <div>
    //       <Outlet />
    //     </div>
    //   </section>
    // </div>
  );
};

export default AdminDashboard;



// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Dashboard_sidebar"
// import "../services/serviceStyle/admin_dashboard.css";

// const AdminDashboard = () => {
//   const [isClosed, setIsClosed] = useState(true);
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleSidebar = () => setIsClosed(!isClosed);
//   const toggleMenu = (menu) =>
//     setOpenMenu(openMenu === menu ? null : menu);

//   return (
//     <div className="dashboard_layout">
//       {/* SIDEBAR */}
//       <Sidebar
//         isClosed={isClosed}
//         openMenu={openMenu}
//         toggleMenu={toggleMenu}
//       />

//       {/* MAIN CONTENT */}
//       <main className="home-section">
//         <div className="home-content">
//           <i className="bx bx-menu" onClick={toggleSidebar}></i>
//           <span className="text">Admin Dashboard</span>
//         </div>

//         {/* ROUTED PAGES */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

