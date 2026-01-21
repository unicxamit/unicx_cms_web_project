import React, { useEffect, useRef } from "react";
import { publicUrlFor } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import { NavLink } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";


const services = [
    { title: "Trademark <br /> Registration", icon: "1.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Copyright <br /> Registration", icon: "2.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Company <br /> Registration", icon: "3.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Trust/NGO <br /> Registration", icon: "4.gif", link: publicUser.jobs.DETAIL1 },
    { title: "GST <br />Registration", icon: "6.gif", link: publicUser.jobs.DETAIL1 },
    { title: "BIS <br /> Registration", icon: "11.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Cosmetics <br /> License", icon: "13.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Organic <br />License", icon: "15.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Drug <br /> License", icon: "17.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Website <br /> Design", icon: "19.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Logo <br /> Design", icon: "21.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Graphics <br /> Design", icon: "22.gif", link: publicUser.jobs.DETAIL1 },
    { title: "MSME <br /> Registration", icon: "7.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Start-up <br /> India Registration", icon: "8.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Import/Export <br /> Registration", icon: "9.gif", link: publicUser.jobs.DETAIL1 },
    { title: "FSSAI <br /> Registration", icon: "10.gif", link: '/some-valid-path' },
    { title: "GST <br /> Filing", icon: "5.gif", link: '/some-valid-path' },
    { title: "Annual <br /> Compliances", icon: "12.gif", link: publicUser.jobs.DETAIL1 },
    { title: "ISO <br /> Registration", icon: "14.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Trademark <br /> Objection", icon: "16.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Trademark <br /> Opposition", icon: "18.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Trademark  Infringement", icon: "20.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Sope  Act <br /> Registration", icon: "23.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Gem  <br /> Registration", icon: "24.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Franchise <br /> Registration", icon: "25.gif", link: publicUser.jobs.DETAIL1 },
    { title: "Design  <br /> Registration", icon: "26.gif", link: publicUser.jobs.DETAIL1 },
];

const Indemand = () => {
    const swiperRef = useRef(null);

    // 2. Group services into pairs to create the two-row effect.
    const groupedServices = [];
    for (let i = 0; i < services.length; i += 2) {
        groupedServices.push(services.slice(i, i + 2));
    }

    useEffect(() => {
        if (swiperRef.current && window.Swiper) {
            const swiper = new window.Swiper(swiperRef.current, {
                init: true,
                slidesPerView: 6,
                spaceBetween: 30,
                slidesPerGroup: 1,
                loop: true, // Enables infinite looping
                observer: true,
                observeParents: true,

                // 3. Autoplay configuration for auto-scrolling
                autoplay: {
                    delay: 3000,                   // Time in ms between slides
                    disableOnInteraction: false,   // Autoplay will resume after user interaction
                    pauseOnMouseEnter: true,       // Pause autoplay on mouse hover
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1366: { slidesPerView: 4 },
                    1440: { slidesPerView: 5 },
                    1721: { slidesPerView: 6 },
                },
            });

            return () => {
                if (swiper && swiper.destroy) {
                    swiper.destroy();
                }
            };
        }
    }, []);

    // Helper function to render a single service item
    const renderService = (service, index) => (
        <div className="job-categories-home-5" key={index}>
            <div className={`twm-media cat-bg-clr-${(index % 4) + 1}`}>
                <JobZImage src={`images/demand_services_icons/new_service/${service.icon}`} alt="" />
            </div>
            <div className="twm-content">
                <NavLink to={service.link} dangerouslySetInnerHTML={{ __html: service.title }} />
            </div>
        </div>
    );


    return (
        <div>
            <div className="section-full p-t120 p-b90 site-bg-white job-categories-home-5-wrap twm-bdr-bottom-1">
                <div className="container">
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>In-Demand Services</div>
                        </div>
                        <h2 className="wt-title">Valuable services delivered with dedication-at a price you can afford! </h2>
                    </div>
                </div>
                <div className="section-content twm-jobs-grid-h5-section-outer">
                    <div className="twm-jobs-grid-h5-section overlay-wraper" style={{
                        backgroundImage: `url(${publicUrlFor("images/home-5/Services_BG.svg")})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'scroll',
                        backgroundColor: '#ffffff'
                    }}>
                        <div className="overlay-main site-bg-primary opacity-09" />
                        <div className="swiper-container category-5-slider" ref={swiperRef}>
                            <div className="swiper-wrapper">
                                {/* 4. Map over the grouped pairs to render slides with two items each */}
                                {groupedServices.map((group, index) => (
                                    <div className="swiper-slide" key={index}>
                                        {group[0] && renderService(group[0], index * 2)}
                                        {group[1] && renderService(group[1], index * 2 + 1)}
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Indemand;
