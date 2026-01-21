import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import ApplyJobPopup from "../../../../common/popups/popup-apply-job";
import SectionJobLocation from "../../sections/jobs/detail/section-job-location";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
// import { getCaseStudies } from "../../../../../api";
import InnerPageBanner from "../../../../common/inner-page-banner";
import { getCaseStudyById } from "../../../../../adminApi";

function CaseStudyDetails() {
    const { id } = useParams(); // ✅ Get the case study id
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sidebarConfig = {
        showJobInfo: true
    }

    useEffect(() => {
        loadScript("js/custom.js");

        const fetchCaseStudy = async () => {
            try {
                const data = await getCaseStudyById(id);
                // const found = data.find(cs => String(cs.id) === String(id));
                                setCaseStudy(data.caseStudy
);
            //     if (found) {
            //         setCaseStudy(found);
            //     } else {
            //         setError("Case study not found.");
            //     }
             } catch (err) {
                console.error("Error fetching case study:", err);
                setError("Failed to load case study.");
            } finally {
                setLoading(false);
            }
        }

        fetchCaseStudy();
    }, [id]);

    if (loading) {
        return <div className="section-full p-t120 p-b90 bg-white text-center">Loading...</div>;
    }

    if (error) {
        return <div className="section-full p-t120 p-b90 bg-white text-center">{error}</div>;
    }

    return (
        <>
            {
                <InnerPageBanner
                    _data={{ title: caseStudy.title, crumb: "Case study" }}
                    bgImagePath="images/contact-us/Header.webp"
                />
            }
            <div className="section-full  p-t120 p-b90 bg-white">
                <div className="container">
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="cabdidate-de-info">
                                    <div className="twm-job-self-wrap">
                                        <div className="twm-job-self-info">
                                            <div className="twm-job-self-top">
                                                <div className="twm-media-bg">
                                                    {/* <JobZImage src={caseStudy.image_url} alt={caseStudy.title} /> */}
                                                     <JobZImage
  src={caseStudy?.images?.[0]}
  alt={caseStudy?.title}
/>
                                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                                </div>
                                                <div className="twm-mid-content">
                                                    <div className="twm-media">
                                                        <JobZImage src={caseStudy.company_logo || "images/jobs-company/pic1.jpg"} alt={caseStudy.title} />
                                                    </div>
                                                    <h4 className="twm-job-title">{caseStudy.title} <span className="twm-job-post-duration">/ {new Date(caseStudy.created_at).toLocaleDateString()}</span></h4>
                                                    <p className="twm-job-address"><i className="feather-map-pin" />{caseStudy.location || "Location not provided"}</p>
                                                    <div className="twm-job-self-mid">
                                                        <div className="twm-job-self-mid-left">
                                                            <a href={caseStudy.website || "#"} className="twm-job-websites site-text-primary">{caseStudy.website || "Website"}</a>
                                                            <div className="twm-jobs-amount">{caseStudy.salary || "$0 - $0"} <span>/ Month</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="twm-s-title">Description:</h4>
                                    <p>{caseStudy.Description || "No description available."}</p>

                                    <h4 className="twm-s-title">Requirements:</h4>
                                    <ul className="description-list-2">
                                        {caseStudy.requirements?.map((req, i) => (
                                            <li key={i}><i className="feather-check" />{req}</li>
                                        )) || <li>No requirements provided.</li>}
                                    </ul>

                                    <h4 className="twm-s-title">Responsibilities:</h4>
                                    <ul className="description-list-2">
                                        {caseStudy.responsibilities?.map((res, i) => (
                                            <li key={i}><i className="feather-check" />{res}</li>
                                        )) || <li>No responsibilities provided.</li>}
                                    </ul>

                                    <SectionShareProfile />
                                    <SectionJobLocation />
                                    <div className="twm-two-part-section">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficePhotos1 />
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficeVideo1 />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 rightSidebar">
                                <SectionJobsSidebar2 _config={sidebarConfig} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ApplyJobPopup />
        </>
    )
}

export default CaseStudyDetails;
