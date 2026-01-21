import React from 'react';
import './CompanyCards.css'; // We'll create this CSS file
import JobZImage from '../../../../common/jobz-img';
import { NavLink } from 'react-router-dom';
import { publicUser } from '../../../../../globals/route-names';

const CompanyCards = () => {
    // Array of company logo image paths
    const companyLogos = [
        'images/company-final/1.webp',
        'images/company-final/2.webp',
        'images/company-final/3.webp',
        'images/company-final/4.webp',
        'images/company-final/5.webp',
        'images/company-final/6.webp',
        'images/company-final/7.webp',
        'images/company-final/8.webp',
        'images/company-final/9.webp',
        'images/company-final/10.webp',
        'images/company-final/11.webp',
        'images/company-final/12.webp',
        'images/company-final/13.webp',
        'images/company-final/14.webp',
        'images/company-final/15.webp',
        'images/company-final/16.webp',
        'images/company-final/17.webp',
        'images/company-final/18.webp',
        'images/company-final/19.webp',
        'images/company-final/20.webp',
        'images/company-final/21.webp',
        'images/company-final/22.webp',
        'images/company-final/23.webp',
        'images/company-final/24.webp',
        'images/company-final/25.webp',
        'images/company-final/26.webp',
        'images/company-final/27.webp',
        'images/company-final/28.webp',
        'images/company-final/29.webp',
        'images/company-final/30.webp',
        'images/company-final/31.webp',
        'images/company-final/32.webp',
        'images/company-final/33.webp',
        'images/company-final/34.webp',
        'images/company-final/35.webp',
        'images/company-final/36.webp',
        'images/company-final/37.webp',
        'images/company-final/38.webp',
        'images/company-final/39.webp',
        'images/company-final/40.webp',
        'images/company-final/41.webp',
        'images/company-final/42.webp',
        'images/company-final/43.webp',
        'images/company-final/44.webp',
        'images/company-final/45.webp',
        'images/company-final/46.webp',
        'images/company-final/47.webp',
        'images/company-final/48.webp',
        'images/company-final/49.webp',
        'images/company-final/50.webp',
        'images/company-final/51.webp',
    ];


    return (
        <div className="section-full p-t120 p-b90 site-bg-white twm-companies-wrap">
            <div className="section-head center wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                    <div>Top Companies</div>
                </div>
                <h2 className="wt-title">Our Valued customers</h2>
            </div>
            <div className="container">
                <div className="section-content">
                    <div className="scrolling-logos-container">
                        <div className="scrolling-logos">
                            {/* First set of logos */}
                            {companyLogos.map((logo, index) => (
                                <div className="logo-item" key={`first-${index}`}>
                                    <div className="client-logo client-logo-media">
                                        <NavLink>
                                            <JobZImage src={logo} alt={`Company ${index + 1}`} />
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate set for continuous scrolling */}
                            {companyLogos.map((logo, index) => (
                                <div className="logo-item" key={`second-${index}`}>
                                    <div className="client-logo client-logo-media">
                                        <NavLink>
                                            <JobZImage src={logo} alt={`Company ${index + 1}`} />
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCards;