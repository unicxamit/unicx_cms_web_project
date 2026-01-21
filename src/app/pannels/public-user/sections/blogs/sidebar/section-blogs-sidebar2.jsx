import { publicUser } from "../../../../../../globals/route-names";
import JobZImage from "../../../../../common/jobz-img";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState and useEffect
import { getCategories, getBlogs } from "../../../../../../api"; // Import getBlogs instead of getCaseStudies
import api from "../../../../../../api"; // Import the default api instance for baseURL

function SectionBlogsSidebar2() {
    const [categories, setCategories] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    const [allBlogTags, setAllBlogTags] = useState([]); // New state for all unique tags

    const BASE_URL = 'https://unicx.in'; // Define BASE_URL for image paths

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                console.log("Fetched Categories for Sidebar:", data);
            } catch (error) {
                console.error("Error fetching categories for sidebar:", error);
            }
        };

        // Fetch recent blogs and extract tags
        const fetchRecentBlogsAndTags = async () => {
            try {
                const data = await getBlogs(); // Fetch blogs
                // Take up to the first 5 recent blogs
                setRecentArticles(data.slice(0, 5));
                console.log("Fetched Recent Blogs for Sidebar:", data.slice(0, 5));

                // Extract and process all unique tags from all blogs
                const tags = new Set();
                data.forEach(blog => {
                    if (blog.tags) {
                        blog.tags.split(',').forEach(tag => {
                            const trimmedTag = tag.trim();
                            if (trimmedTag) {
                                tags.add(trimmedTag);
                            }
                        });
                    }
                });
                setAllBlogTags(Array.from(tags)); // Convert Set to Array
                console.log("Extracted All Blog Tags:", Array.from(tags));

            } catch (error) {
                console.error("Error fetching recent blogs or extracting tags for sidebar:", error);
            }
        };

        fetchCategories();
        fetchRecentBlogsAndTags();
    }, []);

    return (
        <>
            <div className="side-bar">
                <div className="widget search-bx">
                    <form role="search" method="post">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button className="btn" type="button" id="button-addon2"><i className="feather-search" /></button>
                        </div>
                    </form>
                </div>
                <div className="widget all_services_list">
                    <h4 className="section-head-small mb-4">Categories</h4>
                    <div className="all_services m-b30">
                        <ul>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <li key={category.id}>
                                        {/* Link to blog list filtered by category */}
                                        <NavLink to={`${publicUser.blog.LIST}?category=${category.name}`}>{category.name}</NavLink>
                                        {/* <span className="badge">{category.count || 0}</span> */}
                                    </li>
                                ))
                            ) : (
                                <li>No categories found.</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="widget recent-posts-entry">
                    <h4 className="section-head-small mb-4">Recent Articles</h4>
                    <div className="section-content">
                        <div className="widget-post-bx">
                            {recentArticles.length > 0 ? (
                                recentArticles.map((article) => (
                                    <div className="widget-post clearfix" key={article.id}>
                                        <div className="wt-post-media">
                                            <img 
                                                src={
                                                    article.image_url 
                                                    ? `${BASE_URL}${article.image_url}` // Use BASE_URL for image
                                                    : `${BASE_URL}/images/blog/recent-blog/pic1.jpg` // Placeholder if no image
                                                } 
                                                alt={article.title} 
                                            />
                                        </div>
                                        <div className="wt-post-info">
                                            <div className="wt-post-header">
                                                <span className="post-date">{new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                <span className="post-title">
                                                    {/* Link to individual blog detail page */}
                                                    <NavLink to={`${publicUser.blog.DETAILS}/${article.id}`}>{article.title}</NavLink>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No recent articles found.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="widget tw-sidebar-tags-wrap">
                    <h4 className="section-head-small mb-4">Tags</h4>
                    <div className="tagcloud">
                        {allBlogTags.length > 0 ? (
                            allBlogTags.map((tag, index) => (
                                <NavLink key={index} to={`${publicUser.blog.LIST}?tag=${tag}`}>{tag}</NavLink>
                            ))
                        ) : (
                            <p>No tags found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SectionBlogsSidebar2;
