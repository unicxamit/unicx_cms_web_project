import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionPagination from "../../sections/common/section-pagination";
// import { getBlogs } from "../../../../../api";
import InnerPageBanner from "../../../../common/inner-page-banner";
import SectionBlogsSidebar from "../../sections/blogs/sidebar/section-blogs-sidebar";
import { getBlogs } from "../../../../../adminApi";

function BlogGrid2Page() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const blogsPerPage = 6;

    useEffect(() => {
        loadScript("js/custom.js");

        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();

                // Handle API response flexibility
                const allBlogs = Array.isArray(data) ? data : data.blogs || [];

                setBlogs(allBlogs);
                setTotalPages(Math.ceil(allBlogs.length / blogsPerPage));

                console.log("✅ Blogs fetched:", allBlogs.length, "Total pages:", Math.ceil(allBlogs.length / blogsPerPage));
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
                setTotalPages(1);
            }
        };

        fetchBlogs();
    }, []);

    // ✅ Slice blogs for current page
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = blogs.slice(startIndex, endIndex);

    return (
        <>
            {
                <InnerPageBanner
                    _data={{ title: "Blogs", crumb: "Blogs" }}
                    bgImagePath="images/contact-us/Header.webp"
                />
            }
            <div className="section-full p-t120 p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        {/* ✅ Blog list */}
                        <div className="col-lg-8 col-md-12 item-container-masonry">
                            <div className="masonry-wrap row d-flex">
                                {currentBlogs && currentBlogs.length > 0 ? (
                                    currentBlogs.map((blog) => (
                                        <div className="masonry-item col-lg-6 col-md-12" key={blog._id}>
                                            <div className="blog-post twm-blog-post-1-outer">
                                                <div className="wt-post-media">
                                                    <NavLink to={`${publicUser.blog.DETAIL}/${blog._id}`}>
                                                        {/* <JobZImage
                                                            src={blog.image_url}
                                                            alt={blog.title}
                                                        /> */}
                                                         {blog.images.map((img, index) => (
                                                                           
                                                    
                                                                  <JobZImage
                                                    //   key={index}
                                                      src={img}
                                                      alt={`Blog Image ${index + 1}`}
                                                      className="img-fluid"
                                                      loading="lazy"
                                                    />
                                                    
                                                                            ))}
                                                    </NavLink>
                                                </div>
                                                <div className="wt-post-info">
                                                    <div className="wt-post-meta">
                                                        <ul>
                                                            <li className="post-date">
                                                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </li>
                                                            <li className="post-author">
                                                                By{" "}
                                                                <NavLink to={publicUser.blog.DETAIL}>
                                                                    {blog.author || "Unicx Team"}
                                                                </NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="wt-post-title">
                                                        <h4 className="post-title">
                                                            <NavLink to={`${publicUser.blog.DETAIL}/${blog._id}`}>
                                                                {blog.title}
                                                            </NavLink>
                                                        </h4>
                                                    </div>
                                                    <div className="wt-post-text">
                                                        <p>{blog.short_description || "No description available."}</p>
                                                    </div>
                                                    <div className="wt-post-readmore">
                                                        <NavLink
                                                            to={`${publicUser.blog.DETAIL}/${blog._id}`}
                                                            className="site-button-link site-text-primary"
                                                        >
                                                            Read More
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No blogs found.</p>
                                )}
                            </div>

                            {/* ✅ Pagination inside page */}
                            {totalPages > 1 && (
                                <SectionPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>

                        {/* ✅ Sidebar */}
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionBlogsSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogGrid2Page;


