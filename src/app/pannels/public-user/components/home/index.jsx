import React, { useEffect, useState, useRef } from "react";
import { publicUrlFor } from "../../../../../globals/constants";
import CountUp from "react-countup";
import { publicUser } from "../../../../../globals/route-names";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalSearchBar from "../pages/GlobalSearchBar";
import SectionFaqGeneral from "../../sections/faq/section-faq-general";
// import { getCaseStudies, getCategories, getFAQs } from "../../../../../api";
// import { getBlogs } from "../../../../../api";
import JobZImage from "../../../../common/jobz-img"; import CompanyCards from "./CompanyCards";
import Indemand from "./indemand";
import ExpertSection from "./ExpertSecion";
import './custom.css'
import ContactForm from "./ContactForm";
import { FcCallback } from "react-icons/fc";
import { RiArrowDropDownLine } from "react-icons/ri";
import DynamicFaqTabs from "../pages/dynamicFAQ";
import { getBlogs, getCaseStudies } from "../../../../../adminApi";
function Home1Page() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [selectedExpertForForm, setSelectedExpertForForm] = useState("");

    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false);




    const handleCloseContactForm = () => {
        setShowContactForm(false);
        setSelectedExpertForForm("");
    };

    const [caseStudies, setCaseStudies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [faqs, setFAQs] = useState([]);
    const [blogs, setBlogs] = useState([]); // New state to store fetched Blogs
    const [activeTab, setActiveTab] = useState('General');
    const words = ['Brand', 'Company Name', 'Website', 'Certification', 'Licence'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const BASE_URL = 'https://unicx.in';
    const carouselRef = useRef(null);
    const testimonialSwiperRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    useEffect(() => {
        const currentCarousel = carouselRef.current;
        const currentTestimonialSwiper = testimonialSwiperRef.current;
        let swiperTestimonial; // Declare swiperTestimonial here to be accessible in cleanup
        // 1. Fetch Data
        const fetchCaseStudiesData = async () => {
            try {
                const data = await getCaseStudies();
                 // ✅ Filter only ACTIVE case studies
    const activeCaseStudies = (data?.caseStudies || []).filter(
      (cs) => cs.status === "active"
    );
                setCaseStudies(activeCaseStudies);
                console.log("Fetched Case Studies for Home Page:", data.caseStudies);
            } catch (error) {
                console.error("Error fetching case studies:", error);
            }
        };


        const fetchBlogsData = async () => {
            try {
                const data = await getBlogs();
                 // ✅ Filter only ACTIVE case studies
    const activeCaseStudies = (data?.blogs || []).filter(
      (cs) => cs.status === "active"
    );
                setBlogs(activeCaseStudies);
                console.log("Fetched Blogs for Home Page:", data.blogs);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };
        fetchCaseStudiesData();
        fetchBlogsData();

        // Start word animation
        const wordInterval = setInterval(() => {
            setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 3000);

        // 3. Mousemove animation
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            document.querySelectorAll('.anm').forEach((el) => {
                const speedX = parseFloat(el.dataset.speedX) || 0;
                const speedY = parseFloat(el.dataset.speedY) || 0;
                const speedScale = parseFloat(el.dataset.speedScale) || 0;

                const offsetX = ((clientX - centerX) / centerX) * speedX * 10;
                const offsetY = ((clientY - centerY) / centerY) * speedY * 10;
                const scale = 1 + (speedScale / 1000);

                el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Initialize Owl Carousel
        if (currentCarousel && window.jQuery) {
            window.jQuery(currentCarousel).owlCarousel({
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                items: 1,
                loop: true,
                autoplay: true, // Enable autoplay
                autoplayTimeout: 3000, // Change image every 3 seconds
                dots: false, // Disable dots (pagination)
            });
        }

        // Initialize Swiper Testimonial
        // Removed setTimeout - rely on proper React lifecycle
        if (currentTestimonialSwiper && window.Swiper) {
            swiperTestimonial = new window.Swiper(currentTestimonialSwiper, {
                slidesPerView: 2,
                spaceBetween: 20,
                loop: true,
                observer: true, // Enable observer
                observeParents: true, // Enable observeParents
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                direction: "vertical",
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: 'bullets',
                    dynamicBullets: true, // Enable dynamic bullets
                },
                breakpoints: {
                    0: {
                        direction: "horizontal",
                        slidesPerView: 1,
                        pagination: { // Add pagination settings for mobile breakpoint
                            el: ".swiper-pagination",
                            clickable: true,
                            type: 'bullets',
                            dynamicBullets: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + ' swiper-pagination-bullet-custom"></span>';
                            },
                        }
                    },
                    767: {
                        direction: "vertical",
                    }
                },
            });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(wordInterval); // Cleanup interval

            if (currentCarousel && window.jQuery && window.jQuery(currentCarousel).data('owl.carousel')) {
                window.jQuery(currentCarousel).owlCarousel('destroy');
            }

            if (swiperTestimonial && swiperTestimonial.destroy) {
                swiperTestimonial.destroy();
            }
        };
    }, [carouselRef, words.length, testimonialSwiperRef, window.Swiper]);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {/*Banner Start*/}
            <div className="twm-home1-banner-section site-bg-gray" style={{ backgroundImage: `url(${publicUrlFor("images/bg2_Final.webp")})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="row">

                    {/*Left Section*/}
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="twm-bnr-left-section">
                            {/* <div className="twm-bnr-title-small">We Have <span className="site-text-primary">208,000+</span> Live Jobs</div> */}
                            <div className="twm-bnr-title-sml">Unicx is having <span className="site-text-primary">1200+</span> services for you...</div>
                            <div className="twm-bnr-title-large">It’s Easy to Choose & get <br /> a perfect <span className="site-text-primary slide-up" key={currentWordIndex}>{words[currentWordIndex]}</span> <br /> for Your buisness</div>
                            <div className="twm-bnr-discription">All-in-one Solution for every Business professional needs - From Start to success.</div>
                            <div className="twm-bnr-search-bar">
                                <GlobalSearchBar />
                                {/* <button type="button" className="site-button">Search</button> */}
                            </div>
                            <div className="twm-bnr-category">
                                <ul>
                                    <li>
                                        <NavLink to={publicUser.pages.TestPage2} className="twm-bnr-category-item">Trademark</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={publicUser.pages.TestPage2} className="twm-bnr-category-item">GST Registration</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={publicUser.pages.TestPage2} className="twm-bnr-category-item">ROC</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={publicUser.pages.TestPage2} className="twm-bnr-category-item">ISO Certificate</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={publicUser.pages.TestPage2} className="twm-bnr-category-item">FSSAI</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/*right Section*/}
                    <div className="col-xl-6 col-lg-6 col-md-12 twm-bnr-right-section">
                        <div className="twm-bnr-right-content">
                            <div className="twm-img-bg-circle-area">
                                <div className="twm-img-bg-circle1 rotate-center"><span /></div>
                                <div className="twm-img-bg-circle2 rotate-center-reverse"><span /></div>
                                <div className="twm-img-bg-circle3"><span /></div>
                            </div>

                            <div className="twm-bnr-right-carousel">
                                <div className="owl-carousel twm-h1-bnr-carousal" ref={carouselRef}>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main1.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main2.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main3.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main4.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main5.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main6.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main7.webp" alt="home-image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slide-img">
                                            <JobZImage src="images/homeImage/main8.webp" alt="home-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="twm-bnr-blocks-position-wrap">
                                    {/* icon-block-1 */}
                                    <div className="twm-bnr-blocks twm-bnr-blocks-position-1 anm" data-speed-x="1" data-speed-y="1" data-speed-scale="5" >
                                        <div className="twm-icon">
                                            <JobZImage src="images/main-slider/slider1/icon-1.png" alt="" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="tw-count-number text-clr-sky">
                                                <span className="counter">
                                                    <CountUp end={4} duration={10} />
                                                </span>K+
                                            </div>
                                            <p className="icon-content-info">Companies Faith</p>
                                        </div>
                                    </div>

                                    {/* icon-block-2 */}
                                    <div className="twm-bnr-blocks twm-bnr-blocks-position-2 anm" data-speed-x="-1.5" data-speed-y="1.2" data-speed-scale="-4" >
                                        <div className="twm-icon twm-icon-new">
                                            <JobZImage src="images/main-slider/slider1/professional2.png" alt="" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="tw-count-number text-clr-pink">
                                                <span className="counter">
                                                    <CountUp end={250} duration={10} />
                                                </span>
                                                <span className="counter-plus">+</span>
                                            </div>
                                            <p className="icon-content-info">Professionals</p>
                                        </div>
                                    </div>

                                    {/* icon-block-3 */}
                                    <div className="twm-bnr-blocks-3 twm-bnr-blocks-position-3 anm" data-speed-x="2" data-speed-y="-1.5" data-speed-scale="3">
                                        <div className="twm-pics">
                                            <span><JobZImage src="images/main-slider/slider1/brand.png" alt="" /></span>
                                        </div>
                                        <div className="twm-content">
                                            <div className="tw-count-number text-clr-green">
                                                <span className="counter">
                                                    <CountUp end={7} duration={10} />
                                                </span>K+
                                            </div>
                                            <p className="icon-content-info">Brands Served</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/*Samll Ring Left*/}
                            <div className="twm-small-ring-l slide-top-animation" />
                            <div className="twm-small-ring-2 slide-top-animation" />
                        </div>
                    </div>
                </div>
                <div className="twm-gradient-text">
                    UNICX
                </div>
            </div>
            {/*Banner End*/}

            <div className="main-content-wrapper">
                <Indemand />


                {/* How It Work START */}
                <div className="section-full site-bg-primary twm-how-it-work-1-area">
                    <div className="container">
                        <div className="section-content">
                            <div className="twm-how-it-work-1-content">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-12 col-md-12">
                                        <div className="twm-how-it-work-1-left">
                                            <div className="twm-how-it-work-1-section">
                                                {/* title="" START*/}
                                                <div className="section-head left wt-small-separator-outer">
                                                    <div className="wt-small-separator">
                                                        <div>How it Works</div>
                                                    </div>
                                                    <h2 className="wt-text-1">Simple Steps, Complete Support</h2>
                                                    <h6 className="wt-text">Just Follow our Steps - We'll handle the rest</h6>
                                                </div>
                                                {/* title="" END*/}
                                                <div className="twm-step-section-4">
                                                    <ul>
                                                        <li>
                                                            <div className="twm-step-count bg-clr-sky-light">01</div>
                                                            <div className="twm-step-content">
                                                                <h4 className="twm-title">Get in Touch</h4>
                                                                <p>Sign up or contact us directly for a free expert consultation.</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="twm-step-count bg-clr-yellow-light">02</div>
                                                            <div className="twm-step-content">
                                                                <h4 className="twm-title">Talk to Experts</h4>
                                                                <p>Our specialists will call you to understand your business goals.</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="twm-step-count bg-clr-pink-light">03</div>
                                                            <div className="twm-step-content">
                                                                <h4 className="twm-title">Make Smart Investments</h4>
                                                                <p>Get clear guidance on where to invest for maximum impact.
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="twm-step-count bg-clr-green-light">04</div>
                                                            <div className="twm-step-content">
                                                                <h4 className="twm-title">Grow Effortlessly</h4>
                                                                <p>Sit back and watch your business thrive with our expert support.</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="d-flex flex-wrap gap-3">
                                                    <div className="twm-nav-btn-right">
                                                        <a className="site-button border" data-bs-toggle="modal" href="#sign_up_popup2" role="button">
                                                            <i className="feather-log-in" />
                                                            <span>Sign In</span>
                                                        </a>
                                                    </div>
                                                    <div className="twm-nav-btn-left">
                                                        <NavLink className="site-button border" to={publicUser.pages.CONTACT} style={{ textDecoration: 'none' }}>
                                                            <FcCallback className="font-icon-contact" />
                                                            <span>Contact-us</span>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-12 col-md-12">
                                        <div className="twm-how-it-right-section">
                                            <div className="twm-media">
                                                <div className="twm-bg-circle"><JobZImage src="images/home-4/how-it-work/bg-circle-large.png" alt="" /></div>
                                                <div className="twm-block-left anm" data-speed-x={-4} data-speed-scale={-25}>
                                                    <JobZImage src="images/home-4/how-it-work/block-left.png" alt="" />
                                                </div>
                                                <div className="twm-block-right anm" data-speed-x={-4} data-speed-scale={-25}>
                                                    <JobZImage src="images/home-4/how-it-work/block-right.png" alt="" />
                                                </div>
                                                <div className="twm-main-bg anm" data-wow-delay="1000ms" data-speed-x={2} data-speed-y={2}>
                                                    <JobZImage src="images/home-4/how-it-work/main-bg.png" alt="" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {/* How It Work END */}
                {/* ABOUT SECTION START */}


                {/* <div className="section-full p-t120 p-b90 site-bg-gray twm-about-1-area">
                <div className="container">
                    <div className="twm-about-1-section-wrap">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="twm-about-1-section">
                                    <div className="twm-media">
                                        <JobZImage src="images/home-4/about/about-img.png" alt="" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6 col-md-12">
                                <div className="twm-about-1-section-right">
                                    <div className="section-head left wt-small-separator-outer">
                                        <div className="wt-small-separator site-text-primary">
                                            <div>Choose Your Expert </div>
                                        </div>
                                        <h2 className="wt-title">Get a dedicated business expert aligned with your vision—offering tailored strategies, proactive support, and end-to-end guidance to help you grow with confidence.</h2>
                                    </div>
                                    <ul className="description-list">
                                        <li>
                                            <i className="feather-check" />
                                            Tradmark & Copyright Expert - IPR
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Company Registration & Compliances Expert - ROC
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Certification & Licenses Expert
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Finance & Accounts Expert
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Web & Graphics Expert - Digital
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="twm-about-1-bottom-wrap">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="twm-card-blocks">
                                    <div className="twm-icon pink">
                                        <JobZImage src="images/main-slider/slider2/20+new.png" alt="" />
                                    </div>
                                    <div className="twm-content">
                                        <div className="tw-count-number text-clr-pink">
                                            <span className="counter">
                                                <CountUp end={20} duration={8} />
                                            </span> +
                                        </div>
                                        <p className="icon-content-info">Years Experienced Experts </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="twm-card-blocks-2">
                                    <div className="twm-pics">
                                        <span><JobZImage src="images/main-slider/slider1/user/2.svg" alt="" /></span>
                                        <span><JobZImage src="images/main-slider/slider1/user/3.svg" alt="" /></span>
                                        <span><JobZImage src="images/main-slider/slider1/user/4.svg" alt="" /></span>
                                        <span><JobZImage src="images/main-slider/slider1/user/5.svg" alt="" /></span>
                                        <span><JobZImage src="images/main-slider/slider1/user/6.svg" alt="" /></span>
                                        <span><JobZImage src="images/main-slider/slider1/user/1.svg" alt="" /></span>
                                    </div>
                                    <div className="twm-content">
                                        <div className="tw-count-number text-clr-green">
                                            <span className="counter">
                                                <CountUp end={4} duration={10} />
                                            </span>K+
                                        </div>
                                        <p className="icon-content-info">Happy Clients</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="twm-card-blocks">
                                    <div className="twm-icon twm-icon-top">
                                        <JobZImage className='twm-icon-image' src="images/main-slider/slider2/top-icon.png" alt="" />
                                    </div>
                                    <div className="twm-content">
                                        <div className="tw-count-number text-clr-sky">
                                            <span className="counter">
                                                <CountUp end={100} duration={10} />
                                            </span>+
                                        </div>
                                        <p className="icon-content-info">Top Brands Trusting Unicx</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="twm-card-blocks">
                                    <div className="twm-icon">
                                        <JobZImage src="images/main-slider/slider2/success1.png" alt="" />
                                    </div>
                                    <div className="twm-content">
                                        <div className="tw-count-number text-clr-sky">
                                            <span className="counter">
                                                <CountUp end={99} duration={10} />
                                            </span>%
                                        </div>
                                        <p className="icon-content-info">Positive Success Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                <ExpertSection />

                {/* ABOUT SECTION END */}
                {/* EXPLORE NEW LIFE START */}
                <div className="section-full site-bg-light-purple twm-for-employee-4">
                    <div className="container">
                        <div className="section-content">
                            <div className="twm-for-employee-content">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-12 col-md-12">
                                        <div className="twm-explore-content-outer2">
                                            <div className="twm-explore-top-section">
                                                {/* title="" START*/}
                                                <div className="section-head left wt-small-separator-outer">
                                                    {/* <div className="wt-small-separator site-text-primary">
                                                            <div>About</div>
                                                        </div> */}
                                                    <h2>Why Choose UniCX  </h2>
                                                    <p>At UniCX, we are dedicated to helping you with the best of our services, backed by the right practices and a strategic approach. Our mission is to simplify complex processes and deliver reliable, results-driven solutions tailored to your business needs.</p>
                                                </div>
                                                {/* title="" END*/}
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">1) Personalized Attention</div>
                                                    <p className='para-text'>One-on-One Expert support tailored to your unique needs.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">2) Strategic Guidance</div>
                                                    <p className='para-text'>Tailored advice and smart solutions for your desired Goals.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">3) Hands-On Support</div>
                                                    <p className='para-text'>Expert guidance every step, ensuring clarity and confidence.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">4) Goal-Focused Approach</div>
                                                    <p className='para-text'>We don’t just advise—we help you achieve real, measurable outcomes.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">5) Problem-Solving Expertise</div>
                                                    <p className='para-text'>Proven strategies from experts to solve challenges.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">6) Direct Access</div>
                                                    <p className='para-text'>Direct access to expert ensures faster communication.</p>
                                                </div>
                                                <div className="twm-title-large">
                                                    <div className="twm-title-small">7) Accelerated Results</div>
                                                    <p className='para-text'>Save time with Expert-led solutions, eliminate guesswork.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-xl-7 col-lg-12 col-md-12">
                                        <div className="twm-explore-right-section">
                                            <div className="twm-media">
                                                <div className="twm-bg-circle"><JobZImage src="images/home-4/bg-circle.png" alt="" /></div>
                                                <div className="twm-employee-pic"><JobZImage src="images/Why_Choose_UniCX/whyChoose.webp" alt="" /></div>
                                                <div className="twm-shot-pic1 anm" data-speed-x={-4} data-speed-scale={-25}>
                                                    <JobZImage src="images/home-4/sq-1.png" alt="" />
                                                </div>
                                                <div className="twm-shot-pic2 anm" data-wow-delay="1000ms" data-speed-x={2} data-speed-y={2}>
                                                    <JobZImage src="images/home-4/triangle.png" alt="" />
                                                </div>
                                                <div className="twm-shot-pic3 anm" data-speed-x={-4} data-speed-scale={-25}>
                                                    <JobZImage src="images/home-4/circle.png" alt="" />
                                                </div>
                                            </div>

                                            {/*block 1*/}
                                            <div className="counter-outer-two one anm" data-speed-y={-2} data-speed-scale={15} data-speed-opacity={1}>
                                                <div className="icon-content">
                                                    <div className="tw-count-number text-clr-yellow-2">
                                                        <span className="counter">
                                                            <CountUp end={25} duration={10} />
                                                        </span>K+</div>
                                                    <p className="icon-content-info-1" style={{ fontSize: '14px', marginBottom: '0' }}>Daily Productive Engagements</p>
                                                </div>
                                            </div>
                                            {/*block 2*/}
                                            <div className="counter-outer-two two anm" data-speed-y={2} data-speed-scale={15} data-speed-opacity={5}>
                                                <div className="icon-content">
                                                    <div className="tw-count-number text-clr-green">
                                                        <span className="counter">
                                                            <CountUp end={100} duration={10} />
                                                        </span>%</div>
                                                    <p className="icon-content-info-1" style={{ fontSize: '14px', marginBottom: '0' }} >On Page Dedicated Consulting</p>
                                                </div>
                                            </div>
                                            {/*block 3*/}
                                            <div className="counter-outer-two three anm" data-speed-x={-4} data-speed-scale={-25}>
                                                <div className="icon-content">
                                                    <div className="tw-count-number text-clr-pink">
                                                        <span className="counter">
                                                            <CountUp end={95} duration={10} />
                                                        </span>%</div>
                                                    <p className="icon-content-info-1" style={{ fontSize: '14px', marginBottom: '0' }}>Repeat Customers</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {showContactForm && (
                        <ContactForm expert={selectedExpertForForm} onClose={handleCloseContactForm} />
                    )}
                    {/* <ContactForm/> */}
                </div>
                {/* EXPLORE NEW LIFE END */}

                {/* TOP COMPANIES START */}
                {/* <div className="section-full p-t120 p-b90 site-bg-white twm-companies-wrap">
                <div className="section-head center wt-small-separator-outer">
                    <div className="wt-small-separator site-text-primary">
                        <div>Top Companies</div>
                    </div>
                    <h2 className="wt-title">Our Valued customers</h2>
                </div>
                <div className="container">
                    <div className="section-content">
                        <div className="owl-carousel home-client-carousel3 owl-btn-vertical-center">
                            {Array.from({ length: 50 }, (_, i) => (
                                <div className="item" key={i}>
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <NavLink to={publicUser.employer.LIST}>
                                                <JobZImage src={`images/company-final/${i + 1}.webp`} alt="" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
                <CompanyCards />
                {/* TOP COMPANIES END */}
            </div>

            {/* OUR case studies START */}
            <div
                className="section-full p-t120 p-b90 site-bg-gray bg-cover overlay-wraper"
                style={{ backgroundImage: `url(${publicUrlFor?.("images/blog/blog-single/case.svg")})` }}
            >
                <div className="overlay-main site-bg-primary opacity-01" />
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Our Case Studies</div>
                        </div>
                        <h2 className="wt-title site-text-white">CASE STUDIES & ACHIEVEMENTS</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            {caseStudies?.length > 0 ? (
                                <>
                                    {/* Block one (Left Column - with image) */}
                                    <div className="col-lg-5 col-md-12 m-b30">
                                        <div className="blog-post twm-blog-post-2-outer">
                                            <div className="wt-post-media">
                                                <NavLink to={`${publicUser?.caseStudy?.DETAIL}/${caseStudies[0]?._id}`}>
                                                     <img
            src={
              caseStudies[0]?.images?.length > 0
                ? caseStudies[0].images[0]
                : "https://unicx.in/images/main-slider/slider1/user/top10.jpg"
            }
            alt={caseStudies[0]?.title || "Case Study"}
            className="img-fluid"
          />
                                                </NavLink>
                                            </div>
                                            <div className="wt-post-info">
                                                <div className="wt-post-meta">
                                                    <ul>
                                                        <li className="post-date">
                                                            {caseStudies[0]?.created_at
                                                                ? new Date(caseStudies[0].created_at).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                                : "Date not available"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="wt-post-title">
                                                    <h4 className="post-title">
                                                        <NavLink to={`${publicUser?.caseStudy?.DETAIL}/${caseStudies[0]?._id}`}>
                                                            {caseStudies[0]?.title || "Title not available"}
                                                        </NavLink>
                                                    </h4>
                                                </div>
                                                <div className="wt-post-readmore">
                                                    <NavLink
                                                        to={`${publicUser?.caseStudy?.DETAIL}/${caseStudies[0]?._id}`}
                                                        className="site-button-link site-text-secondry"
                                                    >
                                                        Read More
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Contains multiple blocks without images */}
                                    <div className="col-lg-7 col-md-12">
                                        <div className="twm-blog-post-wrap-right">
                                            {caseStudies.slice(1, 4)?.map((caseStudy) => (
                                                <div
                                                    className="blog-post twm-blog-post-1-outer shadow-none m-b30"
                                                    key={caseStudy?._id || Math.random()}
                                                >
                                                    <div className="wt-post-info">
                                                        <div className="wt-post-meta">
                                                            <ul>
                                                                <li className="post-date">
                                                                    {caseStudy?.created_at
                                                                        ? new Date(caseStudy.created_at).toLocaleDateString("en-US", {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        })
                                                                        : "Date not available"}
                                                                </li>
                                                                <li className="post-author">
                                                                    By{" "}
                                                                    <NavLink>
                                                                        {caseStudy?.author || "Unicx Team"}
                                                                    </NavLink>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="wt-post-title">
                                                            <h4 className="post-title">
                                                                <NavLink to={`${publicUser?.caseStudy?.DETAIL}/${caseStudy?._id}`}>
                                                                    {caseStudy?.title || "Title not available"}
                                                                </NavLink>
                                                            </h4>
                                                        </div>
                                                        <div className="wt-post-text">
                                                            <p>
                                                                {(caseStudy?.short_description || caseStudy?.description)
                                                                    ? (caseStudy.short_description || caseStudy.description).substring(0, 150) + "..."
                                                                    : "Description not available."}
                                                            </p>
                                                        </div>
                                                        <div className="wt-post-readmore">
                                                            <NavLink
                                                                to={`${publicUser?.caseStudy?.DETAIL}/${caseStudy?._id}`}
                                                                className="site-button-link site-text-primary"
                                                            >
                                                                Read More
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No case studies found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* OUR case END */}


            {/* TESTIMONIAL SECTION START */}
            <div className="section-full p-t120 p-b90 site-bg-white twm-testimonial-v-area">
                <div className="container">
                    <div className="section-content">
                        <div className="twm-testimonial-v-section">
                            <div className="row">
                                <div className="col-xl-5 col-lg-12 col-md-12">
                                    <div className="twm-explore-content-outer2">
                                        <div className="twm-explore-top-section">
                                            {/* title="" START*/}
                                            <div className="section-head left wt-small-separator-outer">
                                                <div className="wt-small-separator site-text-primary">
                                                    <div>Testimonials </div>
                                                </div>
                                                <h2>Quotes from our
                                                    customer about us</h2>
                                                <p>Hear directly from the businesses and innovators we've helped protect their
                                                    intellectual property and navigate the complexities
                                                    of patents and trademarks. Their success stories speak volumes about our dedication.</p>
                                            </div>
                                            {/* title="" END*/}
                                            <div className="twm-read-more">
                                                <NavLink to={publicUser.pages.ABOUT} className="site-button">Show All Quotes</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-12 col-md-12">
                                    <div className="v-testimonial-wrap">
                                        <div className="v-testi-dotted-pic">
                                            <JobZImage src="images/testimonials/dotted-block.png" alt="#" />
                                        </div>
                                        {/* Swiper */}
                                        <div className="swiper-container v-testimonial-slider" ref={testimonialSwiperRef}>
                                            <div className="swiper-wrapper">
                                                {/*block 1*/}
                                                <div className="swiper-slide">
                                                    <div className="testimonials-v">
                                                        <div className="twm-testi-media">
                                                            <JobZImage src="images/main-slider/slider1/user/1.svg" alt="#" />
                                                        </div>
                                                        <div className="testimonial-v-content">
                                                            <div className="t-testimonial-top">
                                                                <div className="t-quote"><i className="fa fa-quote-left" /></div>
                                                                <div className="t-rating">
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                </div>
                                                            </div>
                                                            <div className="t-discription">UniConsultX transformed my startup journey. From selecting a legally sound brand name to
                                                                handling all compliance and digital needs, their team provided seamless support.
                                                                Their integrated approach saved me time and ensured my business was built on a solid foundation.
                                                            </div>
                                                            <div className="twm-testi-detail">
                                                                <div className="twm-testi-name">Anjali Mehta</div>
                                                                <div className="twm-testi-position">Founder - GreenLeaf Organics</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*block 2*/}
                                                <div className="swiper-slide">
                                                    <div className="testimonials-v">
                                                        <div className="twm-testi-media">
                                                            <JobZImage src="images/main-slider/slider1/user/5.svg" alt="#" />
                                                        </div>
                                                        <div className="testimonial-v-content">
                                                            <div className="t-testimonial-top">
                                                                <div className="t-quote"><i className="fa fa-quote-left" /></div>
                                                                <div className="t-rating">
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                </div>
                                                            </div>
                                                            <div className="t-discription">Navigating the complexities of business compliance was daunting
                                                                until I partnered with UniCX. Their in-house experts managed everything from GST registration to
                                                                trademark filing with utmost professionalism. Their prompt responses and clear guidance were invaluable.
                                                            </div>
                                                            <div className="twm-testi-detail">
                                                                <div className="twm-testi-name">Rahul Sharma</div>
                                                                <div className="twm-testi-position">Director - TechNova Solutions</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*block 3*/}
                                                <div className="swiper-slide">
                                                    <div className="testimonials-v">
                                                        <div className="twm-testi-media">
                                                            <JobZImage src="images/main-slider/slider1/user/6.svg" alt="#" />
                                                        </div>
                                                        <div className="testimonial-v-content">
                                                            <div className="t-testimonial-top">
                                                                <div className="t-quote"><i className="fa fa-quote-left" /></div>
                                                                <div className="t-rating">
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                </div>
                                                            </div>
                                                            <div className="t-discription">UniConsultX's digital team revamped our online presence with a
                                                                stunning website and cohesive branding. Their attention to detail and understanding
                                                                of our vision resulted in a significant boost in our online engagement. Truly a game-changer for our business.
                                                            </div>
                                                            <div className="twm-testi-detail">
                                                                <div className="twm-testi-name">Priya Desai</div>
                                                                <div className="twm-testi-position">Marketing Head - Urban Threads</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*block 4*/}
                                                <div className="swiper-slide">
                                                    <div className="testimonials-v">
                                                        <div className="twm-testi-media">
                                                            <JobZImage src="images/main-slider/slider1/user/4.svg" alt="#" />
                                                        </div>
                                                        <div className="testimonial-v-content">
                                                            <div className="t-testimonial-top">
                                                                <div className="t-quote"><i className="fa fa-quote-left" /></div>
                                                                <div className="t-rating">
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                </div>
                                                            </div>
                                                            <div className="t-discription">Obtaining necessary certifications
                                                                seemed overwhelming, but UniCX made it straightforward. They handled our ISO certification process
                                                                efficiently, ensuring compliance without any hassle. Their expertise is unmatched.
                                                            </div>
                                                            <div className="twm-testi-detail">
                                                                <div className="twm-testi-name">Vikram Patel</div>
                                                                <div className="twm-testi-position">CEO - SafeBuild Constructions</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*block 5*/}
                                                <div className="swiper-slide">
                                                    <div className="testimonials-v">
                                                        <div className="twm-testi-media">
                                                            <JobZImage src="images/main-slider/slider1/user/2.svg" alt="#" />
                                                        </div>
                                                        <div className="testimonial-v-content">
                                                            <div className="t-testimonial-top">
                                                                <div className="t-quote"><i className="fa fa-quote-left" /></div>
                                                                <div className="t-rating">
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                    <span><i className="fa fa-star" /></span>
                                                                </div>
                                                            </div>
                                                            <div className="t-discription">What sets UniConsultX apart is their personalized approach.
                                                                They assigned a dedicated expert who understood our unique needs and provided tailored solutions.
                                                                Their proactive communication kept us informed at every step.
                                                            </div>
                                                            <div className="twm-testi-detail">
                                                                <div className="twm-testi-name">Sneha Kapoor</div>
                                                                <div className="twm-testi-position">Co-founder - EduBridge Learning</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Add Pagination */}
                                            {screenWidth > 767 && <div className="swiper-pagination" style={{ display: 'block !important' }} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* TESTIMONIAL SECTION END */}

            {/* OUR BLOG START */}
            <div className="section-full p-t120 p-b90 site-bg-gray bg-cover overlay-wraper" style={{ backgroundImage: `url(${publicUrlFor("images/background/bg-4.svg")})` }}>
                <div className="overlay-main site-bg-primary opacity-01" />
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Our Blogs</div>
                        </div>
                        <h2 className="wt-title site-text-white">Latest Article</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            {blogs.length > 0 ? (
                                // Render up to 3 latest blogs
                                blogs.slice(0, 3).map((blog) => (
                                    <div className="col-lg-4 col-md-6 m-b30" key={blog._id}>
                                        <div className="blog-post twm-blog-post-2-outer">
                                            <div className="wt-post-media">
                                                <NavLink to={`${publicUser?.blog?.DETAIL}/${blog?._id}`}>
                                                    {/* <JobZImage
                                                        src={blog?.image_url ? `${BASE_URL}${blog.image_url}` : `${BASE_URL}/images/main-slider/slider1/user/top10.jpg`}
                                                        alt={blog?.title || "Blog Image"}
                                                        className="img-fluid"
                                                    /> */}
                                                    {blog.
images
.map((img, index) => (
                                                                           
                                                    
                                                                  <JobZImage
                                                    //   key={index}
                                                      src={img}
                                                      alt={`Blog Image ${index + 1}`}
                                                      className="img-fluid"
                                                      loading="lazy"
                                                    />
                                                    
                                                                            ))}
                                                </NavLink>

                                            </div>
                                            <div className="wt-post-info">
                                                <div className="wt-post-meta ">
                                                    <ul>
                                                        <li className="post-date">{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                                    </ul>
                                                </div>
                                                <div className="wt-post-title ">
                                                    <h4 className="post-title">
                                                        <NavLink to={`${publicUser.blog.DETAIL}/${blog._id}`}>
                                                            {blog.title}
                                                        </NavLink>
                                                    </h4>
                                                </div>
                                                <div className="wt-post-readmore ">
                                                    <NavLink to={`${publicUser.blog.DETAIL}/${blog._id}`} className="site-button-link site-text-secondry">Read More</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p className="site-text-white">No blogs found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* OUR BLOG END */}

            {/* FAQ SECTION START */}
            <DynamicFaqTabs />
            {/* FAQ SECTION END */}
        </>
    )
}

export default Home1Page;

