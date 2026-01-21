import JobZImage from "../../../common/jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { loadScript, setMenuActive } from "../../../../globals/constants";
import { employer, empRoute, publicUser } from "../../../../globals/route-names";
import { useEffect } from "react";

function EmpSidebarSection(props) {
    const currentpath = useLocation().pathname;

    useEffect(() => {
        loadScript("js/custom.js");
        loadScript("js/emp-sidebar.js");
    })

    return (
        <>
            <nav id="sidebar-admin-wraper" className={props.sidebarActive ? "" : "active"}>
                <div className="page-logo">
                    <NavLink to={publicUser.HOME1}><JobZImage id="skin_page_logo" src="images/logo-dark.png" alt="" /></NavLink>
                </div>
                <div className="admin-nav scrollbar-macosx">
                    <ul>
                        <li
                            className={setMenuActive(currentpath, empRoute(employer.DASHBOARD))}>
                            <NavLink to={empRoute(employer.DASHBOARD)}><i className="fa fa-home" /><span className="admin-nav-text">Dashboard</span></NavLink>
                        </li>
                        <li
                            className={setMenuActive(currentpath, empRoute(employer.PROFILE))}>
                            <NavLink to={empRoute(employer.PROFILE)}><i className="fa fa-user-tie" /><span className="admin-nav-text">Company Profile</span></NavLink>
                        </li>
                        <li
                            className={
                                setMenuActive(currentpath, empRoute(employer.POST_A_JOB)) +
                                setMenuActive(currentpath, empRoute(employer.MANAGE_JOBS))
                            }>
                            <a href="#">
                                <i className="fa fa-suitcase" />
                                <span className="admin-nav-text">Jobs</span>
                            </a>
                            <ul className="sub-menu">
                                <li> <NavLink to={empRoute(employer.POST_A_JOB)} id="jobMenuId1"><span className="admin-nav-text">Post a New Jobs</span></NavLink></li>
                                <li> <NavLink to={empRoute(employer.MANAGE_JOBS)} id="jobMenuId2"><span className="admin-nav-text">Manage Jobs</span></NavLink></li>
                            </ul>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.CANDIDATES))}>
                            <NavLink to={empRoute(employer.CANDIDATES)}><i className="fa fa-user-friends" /><span className="admin-nav-text">Candidates</span></NavLink>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.BOOKMARKS))}>
                            <NavLink to={empRoute(employer.BOOKMARKS)}><i className="fa fa-bookmark" /><span className="admin-nav-text">Bookmark Resumes</span></NavLink>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.PACKAGES))}>
                            <NavLink to={empRoute(employer.PACKAGES)}><i className="fa fa-money-bill-alt" /><span className="admin-nav-text">Packages</span></NavLink>
                        </li>
                        <li
                            className={
                                setMenuActive(currentpath, empRoute(employer.MESSAGES1)) +
                                setMenuActive(currentpath, empRoute(employer.MESSAGES2))
                            }
                        >
                            <a href="#">
                                <i className="fa fa-envelope" />
                                <span className="admin-nav-text">Messages <sup className="twm-msg-noti">5</sup></span>
                            </a>
                            <ul className="sub-menu">
                                <li> <NavLink to={empRoute(employer.MESSAGES1)} id="msgMenuId1"><span className="admin-nav-text">MSG Style-1</span></NavLink></li>
                                <li> <NavLink to={empRoute(employer.MESSAGES2)} id="msgMenuId2"><span className="admin-nav-text">MSG Style-2</span></NavLink></li>
                            </ul>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.RESUME_ALERTS))}>
                            <NavLink to={empRoute(employer.RESUME_ALERTS)}><i className="fa fa-bell" /><span className="admin-nav-text">Resume Alerts</span></NavLink>
                        </li>
                        <li>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#delete-dash-profile"><i className="fa fa-trash-alt" /><span className="admin-nav-text">Delete Profile</span></a>
                        </li>
                        <li>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#logout-dash-profile">
                                <i className="fa fa-share-square" />
                                <span className="admin-nav-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default EmpSidebarSection;