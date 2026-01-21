import SectionCandidateOverview from "../sections/dashboard/section-can-overview";
import SectionCandidateInbox from "../sections/dashboard/section-can-inbox";
import SectionCandidateProfileViews from "../sections/dashboard/section-can-profile-views";
import SectionCandidateRecentActivities from "../sections/dashboard/section-can-activities";
import SectionCandidateRecentApplications from "../sections/dashboard/section-can-applications";
import { useEffect } from "react";
import { loadScript } from "../../../../globals/constants";

function CanDashboardPage() {

    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
        <>
            <div className="twm-right-section-panel site-bg-gray">
                
                <SectionCandidateOverview />

                <div className="twm-pro-view-chart-wrap">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateProfileViews />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateInbox />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentActivities />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentApplications />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CanDashboardPage;