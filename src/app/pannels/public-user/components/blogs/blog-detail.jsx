import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionBlogsSidebar from "../../sections/blogs/sidebar/section-blogs-sidebar";
// import { getBlogById } from "../../../../../api"; // Blog API
import InnerPageBanner from "../../../../common/inner-page-banner";
import { getBlogById } from "../../../../../adminApi";

function BlogDetailPage() {
    const { id } = useParams(); // Blog ID
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadScript("js/custom.js");

        const fetchBlogDetail = async () => {
            try {
                const data = await getBlogById(id);
                setBlog(data.blog);
                console.log("Fetched Blog Detail:", data.blog);
            } catch (err) {
                console.error("Error fetching blog detail:", err);
                setError("Failed to load blog. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlogDetail();
        else {
            setLoading(false);
            setError("No blog ID provided in the URL.");
        }
    }, [id]);

    if (loading) {
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">Loading blog...</div>
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

    if (!blog) {
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">Blog not found.</div>
            </div>
        );
    }

    return (
        <>
            <InnerPageBanner
                _data={{ title: blog.title, crumb: "Blog Details" }}
                bgImagePath="images/contact-us/Header.webp"
            />

            <div className="section-full p-t120 p-b90 bg-white">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-post-single-outer">
                                <div className="blog-post-single bg-white">
                                    <div className="wt-post-info">
                                        {/* Blog Image */}
                                        <div className="wt-post-media m-b30">
                                            {/* <JobZImage
                                                src={blog.image_url || "images/blog/blog-single/1.jpg"}
                                                alt={blog.title}
                                            /> */}
                                             {blog.images.map((img, index) => (
                                                                           
                                                    
                                                                  <JobZImage
                                                      key={index}
                                                      src={img}
                                                      alt={`Blog Image ${index + 1}`}
                                                      className="img-fluid"
                                                      loading="lazy"
                                                    />
                                                    
                                                                            ))}
                                        </div>

                                        {/* Blog Title & Meta */}
                                        <div className="wt-post-title">
                                            <div className="wt-post-meta-list">
                                                <div className="wt-list-content post-date">
                                                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                                <div className="wt-list-content post-author">
                                                    By {blog.author || "Admin"}
                                                </div>
                                            </div>
                                            <h3 className="post-title">{blog.title}</h3>
                                        </div>

                                        {/* Blog Content */}
                                        <div
                                            className="wt-post-discription"
                                            dangerouslySetInnerHTML={{ __html: blog.description }}
                                        />

                                        {/* Additional Details (commented out) */}
                                        {/*
                                        {blog.additional_details && (
                                            <div className="wt-post-discription m-t30">
                                                <h4 className="twm-blog-s-title">Additional Details</h4>
                                                <div dangerouslySetInnerHTML={{ __html: blog.additional_details }} />
                                            </div>
                                        )}
                                        */}

                                        {/* Author Block (commented out) */}
                                        {/*
                                        <div className="twm-posts-author">
                                            <div className="twm-post-author-pic">
                                                <JobZImage src="images/blog/post-author.jpg" alt="#" />
                                            </div>
                                            <div className="twm-post-author-content">
                                                <span>435 Posts Since 2018</span>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                                                <strong>{blog.author || "Author Name"}</strong>
                                            </div>
                                        </div>
                                        */}
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className="post-area-tags-wrap">
                                    <div className="post-social-icons-wrap">
                                        <h4 className="mb-4">Share</h4>
                                        <ul className="post-social-icons">
                                            <li><a href="https://www.facebook.com/" className="fab fa-facebook-f" /></li>
                                            <li><a href="https://www.twitter.com/" className="fab fa-twitter" /></li>
                                            <li><a href="https://in.linkedin.com/" className="fab fa-linkedin-in" /></li>
                                            <li><a href="https://www.google.com/" className="fab fa-google" /></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Navigation back to Blog List */}
                                <div className="post-navigation m-t30">
                                    <div className="post-nav-links">
                                        <div className="post-nav-item nav-post-prev">
                                            <div className="nav-post-arrow">
                                                <NavLink to={publicUser.blog.LIST}>
                                                    <i className="fa fa-angle-left" />
                                                </NavLink>
                                            </div>
                                            <div className="nav-post-meta">
                                                <NavLink to={publicUser.blog.LIST}>Back to Blog List</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section (commented out) */}
                                {/*
                                <div className="clear" id="comment-list">
                                    <div className="comments-area" id="comments">
                                        <h3 className="section-head-small mb-4">Comments</h3>
                                        <ol className="comment-list">
                                            <li className="comment">
                                                <div className="comment-body">
                                                    <div className="comment-author">
                                                        <JobZImage className="avatar photo" src="images/blog/comment/pic1.jpg" alt="" />
                                                        <div className="comment-meta"><a href="#">Apr 05, 2023</a></div>
                                                    </div>
                                                    <div className="comment-info">
                                                        <cite className="fn">Richard Anderson</cite>
                                                        <div className="reply">
                                                            <a href="javscript:;" className="comment-reply-link">Reply</a>
                                                        </div>
                                                        <p>No one rejects, dislikes, or avoids pleasure itself...</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>

                                        <div className="comment-respond m-t30" id="respond">
                                            <h3 className="comment-reply-title section-head-small mb-4" id="reply-title">
                                                Leave a reply
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
                                    </div>
                                </div>
                                */}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionBlogsSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetailPage;
