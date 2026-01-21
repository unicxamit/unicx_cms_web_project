import { NavLink, useLocation } from "react-router-dom";
import { setMenuActive } from "../../../../globals/constants";
import { candidate, canRoute } from "../../../../globals/route-names";
import JobZImage from "../../../common/jobz-img";

function CanSidebarSection() {
    const currentpath = useLocation().pathname;
    return (
        <>
            <div className="twm-candidate-profile-pic">
                <JobZImage src="images/user-avtar/pic4.jpg" alt="" />
                <div className="upload-btn-wrapper">
                    <div id="upload-image-grid" />
                    <button className="site-button button-sm">Upload Photo</button>
                    <input type="file" name="myfile" id="file-uploader" accept=".jpg, .jpeg, .png" />
                </div>
            </div>
            <div className="twm-mid-content text-center">
                <a href="candidate-detail.html" className="twm-job-title">
                    <h4>Randall Henderson </h4>
                </a>
                <p>IT Contractor</p>
            </div>
            <div className="twm-nav-list-1">
                <ul>
                    <li className={setMenuActive(currentpath, canRoute(candidate.DASHBOARD))}>
                        <NavLink to={canRoute(candidate.DASHBOARD)}><i className="fa fa-tachometer-alt" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className={setMenuActive(currentpath, canRoute(candidate.PROFILE))}>
                        <NavLink to={canRoute(candidate.PROFILE)}><i className="fa fa-user" />
                            My Pfofile
                        </NavLink>
                    </li>
                    <li><a href="candidate-jobs-applied.html"><i className="fa fa-suitcase" /> Applied Jobs</a></li>
                    <li><a href="candidate-my-resume.html"><i className="fa fa-receipt" /> My Resume</a></li>
                    <li><a href="candidate-saved-jobs.html"><i className="fa fa-file-download" /> Saved Jobs</a></li>
                    <li><a href="candidate-cv-manager.html"><i className="fa fa-paperclip" /> CV Manager</a></li>
                    <li><a href="candidate-job-alert.html"><i className="fa fa-bell" /> Job Alerts</a></li>
                    <li><a href="candidate-change-password.html"><i className="fa fa-fingerprint" /> Change Passeord</a></li>
                    <li><a href="candidate-chat.html"><i className="fa fa-comments" />Chat</a></li>
                </ul>
            </div>
        </>
    )
}

export default CanSidebarSection;