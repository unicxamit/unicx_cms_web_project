import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionPagination from "../../sections/common/section-pagination";
import SectionBlogsSidebar from "../../sections/blogs/sidebar/section-case-study";
import InnerPageBanner from "../../../../common/inner-page-banner";
import { getCaseStudies } from "../../../../../adminApi";
// import { getCaseStudies } from "../../../../../api";

function CaseStudyListPage() {
    const [allCaseStudies, setAllCaseStudies] = useState([]);
    const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const itemsPerPage = 4; // 4 items per page

    // Fetch all case studies
    useEffect(() => {
        loadScript("js/custom.js");

        const fetchCaseStudies = async () => {
            try {
                const data = await getCaseStudies();
                setAllCaseStudies(data.caseStudies || []);
            } catch (err) {
                console.error("Error fetching case studies:", err);
                setError("Failed to load case studies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCaseStudies();
    }, []);

    // Filter based on URL query (category)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryFilter = params.get("category");

        let current = [...allCaseStudies];
        if (categoryFilter) {
            // current = current.filter(
            //     (cs) =>
            //         cs.category_name &&
            //         cs.category_name.toLowerCase() === categoryFilter.toLowerCase()
            // );
             current = current.filter(
          (cs) =>
            Array.isArray(cs.categoryId
) &&
            cs.categoryId
.some(
              (cat) => cat.name?.toLowerCase() === categoryFilter.toLowerCase()
            ))
        }

        setFilteredCaseStudies(current);
        setCurrentPage(1);
        setTotalPages(Math.ceil(current.length / itemsPerPage));
    }, [allCaseStudies, location.search]);

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredCaseStudies.slice(startIndex, endIndex);

    if (loading)
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">Loading case studies...</div>
            </div>
        );

    if (error)
        return (
            <div className="section-full p-t120 p-b90 bg-white text-center">
                <div className="container">{error}</div>
            </div>
        );

    return (
        <>
            {/* Banner like CaseStudyPage */}
            <InnerPageBanner
                _data={{ title: "Case Studies", crumb: "Case Studies" }}
                bgImagePath="images/contact-us/Header.webp"
            />

            <div className="section-full p-t120 p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        {/* Case Study Grid */}
                        <div className="col-lg-8 col-md-12 item-container-masonry">
                            {currentItems.length > 0 ? (
                                currentItems.map((cs) => (
                                    <div
                                        className="blog-post twm-blog-post-1-outer twm-blog-list-style"
                                        key={cs.id}
                                    >
                                        <div className="wt-post-media">
                                            <NavLink to={`${publicUser.caseStudy.DETAIL}/${cs._id}`}>
                                                <JobZImage src={cs.images} alt={cs.title} />
                                            </NavLink>
                                        </div>
                                        <div className="wt-post-info">
                                            <div className="wt-post-meta">
                                                <ul>
                                                    <li className="post-date">
                                                        {new Date(cs.created_at).toLocaleDateString(
                                                            "en-US",
                                                            { year: "numeric", month: "long", day: "numeric" }
                                                        )}
                                                    </li>
                                                    <li className="post-author">
                                                        By{" "}
                                                        <NavLink to={publicUser.caseStudy.LIST}>
                                                            {cs.author || "Admin"}
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="wt-post-title">
                                                <h4 className="post-title">
                                                    <NavLink to={`${publicUser.caseStudy.DETAIL}/${cs._id}`}>
                                                        {cs.title}
                                                    </NavLink>
                                                </h4>
                                            </div>
                                            <div className="wt-post-text">
                                                <p>{cs.excerpt || "No description available."}</p>
                                            </div>
                                            <div className="wt-post-readmore">
                                                <NavLink
                                                    to={`${publicUser.caseStudy.DETAIL}/${cs._id}`}
                                                    className="site-button-link site-text-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No case studies found matching your criteria.</p>
                                </div>
                            )}

                            {/* Pagination only if more than 1 page */}
                            {totalPages > 1 && (
                                <SectionPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
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

export default CaseStudyListPage;
