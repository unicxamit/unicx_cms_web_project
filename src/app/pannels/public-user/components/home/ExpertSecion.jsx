// src/components/ExpertSection.js
import React, { useState } from "react";
import CountUp from "react-countup";
// import ContactForm from "./ContactForm";
import JobZImage from "../../../../common/jobz-img";
import ContactForm from "./ContactForm";

const ExpertSection = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState("");

    const experts = [
        "Tradmark & Copyright Expert - IPR",
        "Company Registration & Compliances Expert - ROC",
        "Certification & Licenses Expert",
        "Finance & Accounts Expert",
        "Web & Graphics Expert - Digital",
    ];

    const handleClick = (expert) => {
        setSelectedExpert(expert);
        setShowForm(true);
    };

    return (
        <div className="section-full p-t120 p-b90 p-l40 p-r40 site-bg-gray twm-about-1-area">
            <div className="container-expert">
                <div className="twm-about-1-section-wrap">
                    <div className="row">
                        {/* Left Image */}
                        <div className="col-lg-6 col-md-12">
                            <div className="twm-about-1-section">
                                <div className="twm-media">
                                    <JobZImage src="images/home-4/about/about-img.png" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="col-lg-6 col-md-12">
                            <div className="twm-about-1-section-right">
                                {/* title START */}
                                <div className="section-head left wt-small-separator-outer">
                                    <div className="wt-small-separator site-text-primary">
                                        <div>Choose Your Expert </div>
                                    </div>
                                    <h2 className="wt-title expert-heading">
                                        Get a dedicated business expert aligned with your
                                        vision-offering tailored strategies, proactive support, and
                                        end-to-end guidance to help you grow with confidence.
                                    </h2>
                                </div>
                                {/* title END */}

                                <ul className="description-list">
                                    {experts.map((expert, i) => (
                                        <li key={i} onClick={() => handleClick(expert)} style={{ cursor: "pointer" }}>
                                            <i className="feather-check" /> {expert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wrap */}
                <div className="twm-about-1-bottom-wrap">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            {/* icon-block-1 */}
                            <div className="twm-card-blocks">
                                <div className="twm-icon pink">
                                    <JobZImage src="images/main-slider/slider2/20+new.png" alt="" />
                                </div>
                                <div className="twm-content">
                                    <div className="tw-count-number text-clr-pink">
                                        <span className="counter">
                                            <CountUp end={20} duration={8} />
                                        </span>{" "}
                                        +
                                    </div>
                                    <p className="icon-content-info">Years Experienced Experts</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            {/* icon-block-2 */}
                            <div className="twm-card-blocks-2">
                                <div className="twm-pics">
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/2.svg" alt="" />
                                    </span>
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/3.svg" alt="" />
                                    </span>
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/4.svg" alt="" />
                                    </span>
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/5.svg" alt="" />
                                    </span>
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/6.svg" alt="" />
                                    </span>
                                    <span>
                                        <JobZImage src="images/main-slider/slider1/user/1.svg" alt="" />
                                    </span>
                                </div>
                                <div className="twm-content">
                                    <div className="tw-count-number text-clr-green">
                                        <span className="counter">
                                            <CountUp end={4} duration={10} />
                                        </span>
                                        K+
                                    </div>
                                    <p className="icon-content-info">Happy Clients</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            {/* icon-block-3 */}
                            <div className="twm-card-blocks">
                                <div className="twm-icon twm-icon-top">
                                    <JobZImage
                                        className="twm-icon-image"
                                        src="images/main-slider/slider2/top-icon.png"
                                        alt=""
                                    />
                                </div>
                                <div className="twm-content">
                                    <div className="tw-count-number text-clr-sky">
                                        <span className="counter">
                                            <CountUp end={100} duration={10} />
                                        </span>
                                        +
                                    </div>
                                    <p className="icon-content-info">Top Brands Trusting Unicx</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            {/* icon-block-4 */}
                            <div className="twm-card-blocks">
                                <div className="twm-icon">
                                    <JobZImage src="images/main-slider/slider2/success1.png" alt="" />
                                </div>
                                <div className="twm-content">
                                    <div className="tw-count-number text-clr-sky">
                                        <span className="counter">
                                            <CountUp end={99} duration={10} />
                                        </span>
                                        %
                                    </div>
                                    <p className="icon-content-info">Positive Success Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Modal */}
            {showForm && (
                <ContactForm
                    expert={selectedExpert}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default ExpertSection;
