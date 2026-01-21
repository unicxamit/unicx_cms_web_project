import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"; // Import useParams
import { loadScript } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionBlogsSidebar2 from "../../sections/blogs/sidebar/section-blogs-sidebar2";
import { getBlogById } from "../../../../../api"; // Import getBlogById instead of getCaseStudyById

function BlogDetailsPage() {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [blogDetail, setBlogDetail] = useState(null); // State to store the single blog detail
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define BASE_URL here for consistency, or import if it's a global constant
    const BASE_URL = 'https://unicx.in';

    useEffect(() => {
        loadScript("js/custom.js");

        // Fetch single blog by ID
        const fetchBlogDetail = async () => {
            try {
                const data = await getBlogById(id); // Call getBlogById
                setBlogDetail(data);
                console.log("Fetched Blog Detail:", data); // Log the data to console
            } catch (err) {
                console.error("Error fetching blog detail:", err);
                setError("Failed to load blog. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlogDetail();
        } else {
            setLoading(false);
            setError("No blog ID provided in the URL.");
        }
    }, [id]); // Re-run effect if ID changes

    if (loading) {
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">
                    Loading blog...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">
                    {error}
                </div>
            </div>
        );
    }

    if (!blogDetail) {
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">
                    Blog not found.
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="section-full p-t120 p-b90 bg-white">
                <div className="container">
                    {/* BLOG SECTION START */}
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                {/* BLOG START */}
                                <div className="blog-post-single-outer">
                                    <div className="blog-post-single bg-white">
                                        <div className="wt-post-info">
                                            <div className="wt-post-media m-b30">
                                                <img
                                                    src={
                                                        blogDetail.image_url
                                                            ? `${BASE_URL}${blogDetail.image_url}` // Use BASE_URL for image
                                                            : `${BASE_URL}/images/blog/blog-single/1.jpg` // Placeholder if no image
                                                    }
                                                    alt={blogDetail.title}
                                                />
                                            </div>
                                            <div className="wt-post-title ">
                                                <div className="wt-post-meta-list">
                                                    <div className="wt-list-content post-date">
                                                        {new Date(blogDetail.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                    <div className="wt-list-content post-author">
                                                        By {blogDetail.author || "Unicx Team"} {/* Assuming blogDetail might have an author, otherwise default */}
                                                    </div>
                                                </div>
                                                <h3 className="post-title">{blogDetail.title}</h3>
                                            </div>
                                            {/* Display short_description if available, otherwise content */}
                                            {blogDetail.short_description && (
                                                <div className="wt-post-discription" dangerouslySetInnerHTML={{ __html: blogDetail.short_description }} />
                                            )}
                                            {/* Display full content */}
                                            {blogDetail.content && (
                                                <div className="wt-post-discription m-t30">
                                                    <h4 className="twm-blog-s-title">Full Content</h4>
                                                    <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} />
                                                </div>
                                            )}

                                            <div className="twm-posts-author">
                                                <div className="twm-post-author-pic">
                                                    <JobZImage src="images/blog/post-author.jpg" alt="#" />
                                                </div>
                                                <div className="twm-post-author-content">
                                                    <span>435 Posts Since 2018</span> {/* This remains static */}
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    </p>
                                                    {/* Dynamically set author name here as well */}
                                                    <strong>{blogDetail.author || "Rosalina William"}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="post-navigation m-t30">
                                        <div className="post-nav-links">
                                            <div className="post-nav-item nav-post-prev">
                                                <div className="nav-post-arrow">
                                                    <NavLink to={publicUser.blog.LIST}>
                                                        <i className="fa fa-angle-left" />
                                                    </NavLink>
                                                </div>
                                                <div className="nav-post-meta">
                                                    <NavLink to={publicUser.blog.LIST}>The wise man therefore always holds
                                                        in these matters to this principle</NavLink>
                                                </div>
                                            </div>
                                            <div className="post-nav-item nav-post-next">
                                                <div className="nav-post-arrow">
                                                    <NavLink to={publicUser.blog.LIST}>
                                                        <i className="fa fa-angle-right" />
                                                    </NavLink>
                                                </div>
                                                <div className="nav-post-meta">
                                                    <NavLink to={publicUser.blog.LIST}>Rejects pleasures to secure other
                                                        greater pleasures</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear" id="comment-list">
                                        <div className="comments-area" id="comments">
                                            <h3 className="section-head-small mb-4">Comments</h3>
                                            <div>
                                                {/* COMMENT LIST START - Keeping static as per the requirement for comments*/}
                                                <ol className="comment-list">
                                                    <li className="comment">
                                                        {/* COMMENT BLOCK */}
                                                        <div className="comment-body">
                                                            <div className="comment-author">
                                                                <JobZImage className="avatar photo" src="images/blog/comment/pic1.jpg" alt="" />
                                                                <div className="comment-meta">
                                                                    <a href="#">Apr 05, 2023</a>
                                                                </div>
                                                            </div>
                                                            <div className="comment-info">
                                                                <cite className="fn">Richard Anderson</cite>
                                                                <div className="reply">
                                                                    <a href="javscript:;" className="comment-reply-link">Reply</a>
                                                                </div>
                                                                <p>No one rejects, dislikes, or avoids pleasure itself, because pleasure, but
                                                                    because those who do not know how to pursue.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="comment">
                                                        {/* COMMENT BLOCK */}
                                                        <div className="comment-body">
                                                            <div className="comment-author">
                                                                <JobZImage className="avatar photo" src="images/blog/comment/pic2.jpg" alt="" />
                                                                <div className="comment-meta">
                                                                    <a href="#">Apr 08, 2023</a>
                                                                </div>
                                                            </div>
                                                            <div className="comment-info">
                                                                <cite className="fn">Devid Abraham</cite>
                                                                <div className="reply">
                                                                    <a href="javscript:;" className="comment-reply-link">Reply</a>
                                                                </div>
                                                                <p>No one rejects, dislikes, or avoids pleasure itself, because pleasure, but
                                                                    because those who do not know how to pursue.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ol>
                                                {/* COMMENT LIST END */}
                                                {/* LEAVE A REPLY START */}
                                                <div className="comment-respond m-t30" id="respond">
                                                    <h3 className="comment-reply-title section-head-small mb-4" id="reply-title">Leave a reply
                                                        <small>
                                                            <a style={{ display: 'none' }} href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a>
                                                        </small>
                                                    </h3>
                                                    <form className="comment-form" id="commentform" method="post">
                                                        <div className="row">
                                                            <div className="comment-form-author col-md-6 mb-3">
                                                                <label>Your Name* <span className="required">*</span></label>
                                                                <input className="form-control" type="text" name="user-comment" placeholder="Your Name*" id="author" />
                                                            </div>
                                                            <div className="comment-form-email col-md-6 mb-3">
                                                                <label>Your Email* <span className="required">*</span></label>
                                                                <input className="form-control" type="text" name="email" placeholder="Your Email*" />
                                                            </div>
                                                            <div className="comment-form-comment col-md-12 mb-4">
                                                                <label>Message*</label>
                                                                <textarea className="form-control" rows={8} name="comment" placeholder="Message*" id="comment" defaultValue={""} />
                                                            </div>
                                                            <div className="form-submit">
                                                                <button type="submit" className="site-button">Submit Now</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/* LEAVE A REPLY END */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 rightSidebar">
                                <SectionBlogsSidebar2 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetailsPage;
