import { NavLink, useLocation } from "react-router-dom";
import JobZImgae from "../../../../common/jobz-img";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../../sections/common/section-pagination";
import {  getCaseStudies } from "../../../../../adminApi";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";

function JobsListPage() {

         const [allBlogs, setAllBlogs] = useState([]);
         const [filteredBlogs, setFilteredBlogs] = useState([]);
         const [loading, setLoading] = useState(true);
         const [error, setError] = useState(null);
         const location = useLocation();
     
         // ✅ Pagination state
         const [currentPage, setCurrentPage] = useState(1);
         const [totalPages, setTotalPages] = useState(1);
         const blogsPerPage = 6;
     
         // ✅ Fetch blogs
         useEffect(() => {
             loadScript("js/custom.js");
     
             const fetchAllBlogs = async () => {
                 try {
                     const data = await getCaseStudies();
                     setAllBlogs(data.caseStudies || []);
                 } catch (err) {
                     console.error("Error fetching blogs:", err);
                     setError("Failed to load casestudy. Please try again later.");
                 } finally {
                     setLoading(false);
                 }
             };
     
             fetchAllBlogs();
         }, []);
     
         // ✅ Apply filters
         useEffect(() => {
             const filterBlogs = () => {
                 const params = new URLSearchParams(location.search);
                 const categoryFilter = params.get("category");
                 const tagFilter = params.get("tag");
     
                 let currentBlogs = [...allBlogs];
     
                 if (categoryFilter) {
                     // currentBlogs = currentBlogs.filter(
                     //     (blog) =>
                     //         blog.category_name &&
                     //         blog.category_name.toLowerCase() === categoryFilter.toLowerCase()
                     // );
                     currentBlogs = currentBlogs.filter(
               (blog) =>
                 Array.isArray(blog.categoryId) &&
                 blog.categoryId.some(
                   (cat) => cat.name?.toLowerCase() === categoryFilter.toLowerCase()
                 )
             );
                 }
     
                 if (tagFilter) {
                     currentBlogs = currentBlogs.filter(
                         (blog) =>
                             blog.tage &&
                             blog.tage
                                 .split(",")
                                 .some(
                                     (tag) => tag.trim().toLowerCase() === tagFilter.toLowerCase()
                                 )
                     );
                 }
     
                 setFilteredBlogs(currentBlogs);
     
                 // ✅ Reset pagination on filter change
                 setCurrentPage(1);
                 setTotalPages(Math.ceil(currentBlogs.length / blogsPerPage));
             };
     
             filterBlogs();
         }, [allBlogs, location.search]);
     
         // ✅ Slice blogs for current page
         const startIndex = (currentPage - 1) * blogsPerPage;
         const endIndex = startIndex + blogsPerPage;
         const currentBlogs = filteredBlogs.slice(startIndex, endIndex);
     
         if (loading) {
             return (
                 <div className="section-full p-t120 p-b90 bg-white text-center">
                     <div className="container">Loading blogs...</div>
                 </div>
             );
         }
     
         if (error) {
             return (
                 <div className="section-full p-t120 p-b90 bg-white text-center">
                     <div className="container">{error}</div>
                 </div>
             );
         }
     return (
         <>
             <div className="section-full p-t120  p-b90 site-bg-white">
                 <div className="container">
                     <div className="masonry-wrap row d-flex">
                         {/*Block one*/}
                          {currentBlogs.length > 0 ? (
                                 currentBlogs.map((blog) => (
                         <div className="masonry-item col-lg-4 col-md-12">
  
                             <div className="blog-post twm-blog-post-1-outer">
                                 
                                 <div className="wt-post-media">
                                     <NavLink to={`${publicUser.caseStudy.DETAIL}/${blog._id}`}>   {blog.images.map((img, index) => (
                                                                            
                                                     
                                                                   <JobZImage
                                                       key={index}
                                                       src={img}
                                                       alt={`Blog Image ${index + 1}`}
                                                     //   className="img-fluid"
                                                       loading="lazy"
                                                     />
                                                     
                                                                             ))}</NavLink>
                                 </div>
                                 <div className="wt-post-info">
                                     <div className="wt-post-meta ">
                                         <ul>
                                             <li className="post-date"> {new Date(
                                                                 blog.createdAt
                                                             ).toLocaleDateString("en-US", {
                                                                 year: "numeric",
                                                                 month: "long",
                                                                 day: "numeric",
                                                             })}</li>
                                             <li className="post-author">By <NavLink to={`${publicUser.caseStudy.DETAIL}/${blog._id}`}> {blog.author || "Unicx Team"}</NavLink></li>
                                         </ul>
                                     </div>
                                     <div className="wt-post-title ">
                                         <h4 className="post-title">
                                             <NavLink to={`${publicUser.caseStudy.DETAIL}/${blog._id}`}>{blog.title}</NavLink>
                                         </h4>
                                     </div>
                                     <div className="wt-post-text ">
                                         <p>
                                              {blog.Description ||
                                                             (blog.Description
                                                                 ? blog.Description.substring(
                                                                     0,
                                                                     150
                                                                 ) + "..."
                                                                 : "No description available.")}
                                         </p>
                                     </div>
                                     <div className="wt-post-readmore ">
                                         <NavLink to={`${publicUser.caseStudy.DETAIL}/${blog._id}`} className="site-button-link site-text-primary">Read More</NavLink>
                                     </div>
                                 </div>
                                 </div> </div>
                                   ))
                             ) : (
                                 <div className="col-12 text-center">
                                     <p>No blogs found matching your criteria.</p>
                                 </div>
                             )}
                     </div>
                    {totalPages > 1 && (
                             <SectionPagination
                                 currentPage={currentPage}
                                 totalPages={totalPages}
                                 onPageChange={setCurrentPage}
                             />
                         )}
                 </div>
             </div>
 
         </>
     )
 }

export default JobsListPage;