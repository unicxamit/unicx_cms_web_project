import { publicUser } from "../../../../../../globals/route-names";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs, getCategories } from "../../../../../../adminApi";
// import { getCategories } from "../../../../../../api"; // Case study categories
// import { getBlogs } from "../../../../../../api"; // Recent blogs

function SidebarCaseStudy() {
    const [categories, setCategories] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        // Fetch categories from case studies
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.category);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        // Fetch recent blogs
        const fetchRecentBlogs = async () => {
            try {
                const data = await getBlogs();
                setRecentBlogs(data.blogs.slice(0, 5)); // take latest 5 blogs
            } catch (error) {
                console.error("Error fetching recent blogs:", error);
            }
        };

        fetchCategories();
        fetchRecentBlogs();
    }, []);

    return (
        <div className="side-bar">
            {/* Search Box */}
            <div className="widget search-bx">
                <form role="search" method="post">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" />
                        <button className="btn" type="button" id="button-addon2">
                            <i className="feather-search" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Case Study Categories */}
            <div className="widget all_services_list">
                <h4 className="section-head-small mb-4">Categories</h4>
                <div className="all_services m-b30">
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <li key={category._id}>
                                    <NavLink
                                        to={`${publicUser.caseStudy.LIST}?category=${encodeURIComponent(category.name)}`}
                                    >
                                        {category.name}
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            <li>No categories found.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Recent Blogs */}
            <div className="widget recent-posts-entry">
                <h4 className="section-head-small mb-4">Recent Blogs</h4>
                <div className="section-content">
                    <div className="widget-post-bx">
                        {recentBlogs.length > 0 ? (
                            recentBlogs.map((blog) => (
                                <div className="widget-post clearfix" key={blog._id}>
                                    <div className="wt-post-media">
                                        <img src={blog.images || "images/blog/recent-blog/pic1.jpg"} alt={blog.title} />
                                    </div>
                                    <div className="wt-post-info">
                                        <div className="wt-post-header">
                                            <span className="post-date">
                                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="post-title">
                                                <NavLink to={`${publicUser.blog.DETAIL}/${blog._id}`}>
                                                    {blog.title}
                                                </NavLink>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No recent blogs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarCaseStudy;
