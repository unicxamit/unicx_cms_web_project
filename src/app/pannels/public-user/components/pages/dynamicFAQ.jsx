import { useState, useEffect } from "react";
// import { getCategories, getFAQs } from "../../../../../api"; // Update path as needed
import SectionFaqGeneral from "../../sections/faq/section-faq-general";
import { getCategories, getFAQs } from "../../../../../adminApi";

const DynamicFaqTabs = () => {
    const [categories, setCategories] = useState([]);
    const [faqs, setFAQs] = useState([]);
    const [activeTab, setActiveTab] = useState("General");

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData.category || []);

                const faqsData = await getFAQs();
                setFAQs(faqsData.faqs || []);
            } catch (error) {
                console.error("Error fetching FAQ data:", error);
            }
        };

        fetchFAQData();
    }, []);

    const renderFaqAccordion = (faqList, categoryName) => {
        if (!faqList.length) return <p  style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>No FAQs found for {categoryName}</p>;
        return (
            <div className="tw-faq-section">
                <div className="accordion tw-faq" id={`accordion-${categoryName}`}>
                    {faqList.map((faq, index) => (
                        <div className="accordion-item" key={faq._id}>
                            <button
                                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${faq._id}`}
                                aria-expanded={index === 0 ? "true" : "false"}
                                aria-controls={`collapse-${faq._id}`}
                            >
                                {faq.question}
                            </button>

                            <div
                                id={`collapse-${faq._id}`}
                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                data-bs-parent={`#accordion-${categoryName}`}
                            >
                                <div
                                    className="accordion-body"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="section-full p-t120 p-b90 site-bg-white FAQ">
            <div className="container">
                <div className="section-content">
                    <div className="twm-tabs-style-1 center">
                        <ul className="nav nav-tabs" role="tablist">
                            {/* General tab */}
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "General" ? "active" : ""}`}
                                    onClick={() => setActiveTab("General")}
                                    type="button"
                                    role="tab"
                                    aria-controls="General"
                                >
                                    General
                                </button>
                            </li>

                            {/* Dynamic tabs */}
                            {categories.map((category) => (
                                <li className="nav-item" role="presentation" key={category._id}>
                                    <button
                                        className={`nav-link ${activeTab === category.name ? "active" : ""}`}
                                        onClick={() => setActiveTab(category.name)}
                                        type="button"
                                        role="tab"
                                        aria-controls={category.name}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content">
                            {/* General tab content */}
                            <div
                                className={`tab-pane fade ${activeTab === "General" ? "show active" : ""}`}
                                id="General"
                                role="tabpanel"
                            >
                                <SectionFaqGeneral />
                            </div>

                            {/* Dynamic tab content */}
                            {categories.map((category) => (
                                <div
                                    className={`tab-pane fade ${activeTab === category.name ? "show active" : ""}`}
                                    id={category.name}
                                    role="tabpanel"
                                    key={category._id}
                                >
                                    {renderFaqAccordion(
                                       faqs.filter(
  (faq) => faq.status === "active" && 
    Array.isArray(faq.category) &&
    faq.category[0]?._id === category._id
),
                                        category.name
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicFaqTabs;
