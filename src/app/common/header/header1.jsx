import JobZImage from "../jobz-img";
import { NavLink, useNavigate } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";
import { useState, useEffect } from "react";
// import { getCategories, getSubCategories, getSubSubCategories } from "../../../api";
import {getCategories,getSubCategories,getSubCategoriesByCategoryId,getSubSubCategories} from "../../../adminApi"
import TrademarkSearch from "../../pannels/public-user/components/pages/TrademarkSearch";
import { FcCallback } from "react-icons/fc";
import { RiArrowDropDownLine } from "react-icons/ri";
import './header1.css'

function Header1({ _config }) {
    const [menuActive, setMenuActive] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const [cats, subs, subsubs] = await Promise.all([
    //                 getCategories(),
    //                 getSubCategories(),
    //                 getSubSubCategories()
    //             ]);
    //             setCategories(cats);
    //             setSubCategories(subs);
    //             setSubSubCategories(subsubs);
    //         } catch (error) {
    //             console.error("Error fetching navigation data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, []);

      useEffect(() => {
        async function fetchData() {
            try {
                const [cats, subs, subsubs] = await Promise.all([
                    // getCategories(),
                    getCategories(),
                    // getSubCategories(),
                    getSubCategories(),
                    // getSubSubCategories()
                    getSubSubCategories()
                ]);
                //  const data = await getCategories();
                // console.log(data.category,"category get")
                  
                setCategories(cats.category);
                setSubCategories(subs.subCategories);
                setSubSubCategories(subsubs.services);
               
            } catch (error) {
                console.error("Error fetching navigation data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
       
    }, []);
    const handleNavigationClick = () => {
        setMenuActive(!menuActive);
    };


    const handleDropdownClick = () => {
        setMenuActive(false);
    };

    // const getSubsForCategory = (categoryId) =>
    //     subCategories.filter(sub => sub.category_id === categoryId);

    // const getSubSubsForSubCategory = (subCategoryId) =>
    //     subSubCategories.filter(subsub => subsub.subcategory_id === subCategoryId);
            
const getSubsForCategory = (categoryId) => {
  const filtered = subCategories.filter((sub) => {
    return (
      sub.status === "active" &&
      Array.isArray(sub.category) &&
      sub.category.length > 0 &&
      sub.category[0]?._id === categoryId
    );
  });
// console.log(filtered,"filed")
  return filtered;
};
const getSubSubsForSubCategory = (subCategoryId) => {
  return subSubCategories.filter(
    (s) =>   s.status === "active" &&
      Array.isArray(s.subcategory) &&
      s.subcategory[0]?._id === subCategoryId
  );
};

    useEffect(() => {
        if (loading) return;

        const handleSubmenuToggle = (e) => {
            if (window.innerWidth <= 991) {
                const li = e.target.closest("li");
                if (!li) return;

                if (li.classList.contains("has-child") || li.classList.contains("dropdown")) {
                    e.preventDefault();
                    li.classList.toggle("nav-active");
                }
            }
        };

        const menuLinks = document.querySelectorAll(
            ".header-nav .nav li.has-child > a, " +
            ".header-nav .nav li.has-child > .nav-link, " +
            ".header-nav .nav li.dropdown > a"
        );

        menuLinks.forEach((link) => link.addEventListener("click", handleSubmenuToggle));

        return () => {
            menuLinks.forEach((link) =>
                link.removeEventListener("click", handleSubmenuToggle)
            );
        };
    }, [loading]);

    return (
        <>
            <header className={`site-header ${_config.style} mobile-sider-drawer-menu ${menuActive ? "active" : ""}`}>
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar" style={{ maxWidth: '100%' }}>
                        <div className="container-fluid clearfix">
                            <div className="logo-header">
                                <div className="logo-header-inner logo-header-one">
                                    <NavLink to={publicUser.HOME1}>
                                        <JobZImage src="images/UniCX-logo.gif" alt="" />
                                    </NavLink>
                                </div>
                            </div>

                            {/* Mobile Menu Toggle Button */}
                            <button
                                id="mobile-side-drawer"
                                data-target=".header-nav"
                                data-toggle="collapse"
                                type="button"
                                className="navbar-toggler collapsed"
                                onClick={handleNavigationClick}
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar icon-bar-first" />
                                <span className="icon-bar icon-bar-two" />
                                <span className="icon-bar icon-bar-three" />
                            </button>

                            {!loading && (
                                <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">

                                    <button
                                        type="button"
                                        className="close-menu-btn"
                                        onClick={handleNavigationClick}
                                    >
                                        &times;
                                    </button>

                                    <ul className="nav navbar-nav">
                                        {/* Dynamic Categories */}
                                        {/* {categories.map((category) => { */}
                                        {categories .filter(cat => cat.status === "active").map((category) => {
                                            const categorySubs = getSubsForCategory(category._id);
                                            return (
                                                <li
                                                    key={`cat-${category._id}`}
                                                    className={`${categorySubs.length > 0 ? "has-child" : ""}`}>
                                                    {/* <NavLink to={`/category/${category.id}`}>{category.name}</NavLink> */}
                                                    <NavLink>{category.name}</NavLink>
                                                    {categorySubs.length > 0 && (
                                                        <ul className="sub-menu sub-menu1">
                                                            {categorySubs.map((sub) => {
                                                                const subSubs = getSubSubsForSubCategory(sub._id);
                                                                return (
                                                                    <li key={`sub-${sub._id}`} className={subSubs.length > 0 ? "has-child" : ""}>
                                                                        {/* sub-menu1 should not close sidebar */}
                                                                        {/* <NavLink to={`/subcategory/${sub.id}`}>
                                                                            {sub.name}
                                                                        </NavLink> */}
                                                                        <NavLink>
                                                                            {sub.name}
                                                                        </NavLink>
                                                                        {subSubs.length > 0 && (
                                                                            <ul className="sub-menu2">
                                                                                {subSubs.map((subsub) => (
                                                                                    <li key={`subsub-${subsub._id}`}>
                                                                                        {/* sub-menu2 SHOULD close sidebar */}
                                                                                        <NavLink to={`/subsubcategory/${subsub._id}`} onClick={handleDropdownClick}>
                                                                                            {subsub.name}
                                                                                        </NavLink>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}

                                        {/* More Dropdown */}
                                        <li className="dropdown">
                                            <a href="#" role="button" tabIndex="0"><RiArrowDropDownLine style={{ fontSize: '2rem' }} /></a>
                                            <ul className="sub-menu sub-menu1">
                                                <li><NavLink to={publicUser.pages.ABOUT} onClick={handleDropdownClick}>About</NavLink></li>
                                                <li><NavLink to={publicUser.pages.CONTACT} onClick={handleDropdownClick}>Contact Us</NavLink></li>

                                                {/* Calculator Dropdown with sub-menu2 */}
                                                <li className="has-child">
                                                    <NavLink to={publicUser.calculator.CALCULATOR_ALL}>Calculators</NavLink>
                                                    <ul className="sub-menu2">
                                                        <li><NavLink to={publicUser.calculator.GSTCalculator} onClick={handleDropdownClick}>GST Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.ITRCalculator} onClick={handleDropdownClick}>Income Tax Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.EPFCalculator} onClick={handleDropdownClick}>EPF Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.NPSCalculator} onClick={handleDropdownClick}>NPS Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.HRACalculator} onClick={handleDropdownClick}>HRA Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.SIPCalculator} onClick={handleDropdownClick}>SIP Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.GratuityCalculator} onClick={handleDropdownClick}>Gratuity Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.RetirementCalculator} onClick={handleDropdownClick}>Retirement Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.RDCalculator} onClick={handleDropdownClick}>RD Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.SimpleInterestCalculator} onClick={handleDropdownClick}>Simple Interest Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.TDSCalculator} onClick={handleDropdownClick}>TDS Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.PPFCalculator} onClick={handleDropdownClick}>PPF Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.MutualFundCalculator} onClick={handleDropdownClick}>Mutual Fund Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.EMICalculator} onClick={handleDropdownClick}>EMI Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.FDCalculator} onClick={handleDropdownClick}>Fixed Deposit Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.HomeEMICalculator} onClick={handleDropdownClick}>Home Loan EMI Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.LumpsumCalculator} onClick={handleDropdownClick}>Lumpsum Calculator</NavLink></li>
                                                        <li><NavLink to={publicUser.calculator.BusinessCalculator} onClick={handleDropdownClick}>Business Tax Calculator</NavLink></li>
                                                    </ul>
                                                </li>

                                                <li><NavLink to={publicUser.pages.FAQ} onClick={handleDropdownClick}>FAQ</NavLink></li>
                                                <li><NavLink to={publicUser.pages.TestPage5} onClick={handleDropdownClick}>Blogs</NavLink></li>
                                                <li><NavLink to={publicUser.pages.TestPage3} onClick={handleDropdownClick}>Case Study</NavLink></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Right Nav */}
                            <div className="extra-nav header-2-nav">
                                <div className="extra-cell">
                                    <div className="header-search">
                                        <a
                                            href="#"
                                            className="header-search-icon"
                                            role="button"
                                            tabIndex="0"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/trademark-search');
                                                setMenuActive(false);
                                            }}
                                        >
                                            <i className="feather-search" />
                                        </a>
                                    </div>
                                </div>
                                <div className="extra-cell">
                                    <div className="header-nav-btn-section">
                                        <div className="twm-nav-btn-left">
                                            <div className="twm-nav-sign-up">
                                                <FcCallback className="font-icon-contact" />
                                                <NavLink style={{ textDecoration: 'none' }} to={publicUser.pages.CONTACT} onClick={handleDropdownClick}>
                                                    Contact-Us
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="twm-nav-btn-right">
                                            <a className="twm-nav-post-a-job" data-bs-toggle="modal" href="#sign_up_popup2" role="button">
                                                <i className="feather-log-in" />
                                                <span>Sign In</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Site Search */}
                    <div id="search">
                        <span className="close" />
                        <TrademarkSearch />
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header1;
