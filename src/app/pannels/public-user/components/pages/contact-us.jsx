import { useLocation } from "react-router-dom";
import { setBanner, showBanner } from "../../../../../globals/banner-data";
import InnerPageBanner from "../../../../common/inner-page-banner";
// import InnerPageBanner from "../app/common/inner-page-banner";
// import { showBanner, setBanner } from "../globals/banner-data";
function ContactUsPage() {
    const currentpath = useLocation().pathname;
    return (
        <>
            {
                <InnerPageBanner
                    _data={{ title: "Contact Us", crumb: "Contact Us" }}
                    bgImagePath="images/contact-us/Header.webp"
                />
            }
            <div className="section-full twm-contact-one">
                <div className="section-content">
                    <div className="container">
                        {/* CONTACT FORM*/}
                        <div className="contact-one-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-form-outer">
                                        {/* title="" START*/}
                                        <div className="section-head left wt-small-separator-outer">
                                            <h2 className="wt-title">Send Us a Message</h2>
                                            <p>Feel free to contact us and we will get back to you as soon as we can.</p>
                                        </div>
                                        {/* title="" END*/}
                                        <form className="cons-contact-form" method="post">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="username" type="text" required className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="email" type="text" className="form-control" required placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="phone" type="text" className="form-control" required placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="subject" type="text" className="form-control" required placeholder="Subject" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <textarea name="message" className="form-control" rows={3} placeholder="Message" defaultValue={""} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="site-button">Submit Now</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-info-wrap">
                                        <div className="contact-info">
                                            <div className="contact-info-section">
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className=" fas fa-map-marker-alt" /></div>
                                                    <h3 className="twm-title">In the bay area?</h3>
                                                    <p>702, 7th Floor, Shagun Arcade, AB Road, Vijay Nagar Square, Indore, Madhya Pradesh 452010 </p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon custome-size"><i className="fas fa-mobile-alt" /></div>
                                                    <h3 className="twm-title">Feel free to contact us</h3>
                                                    <p><a href="tel:+216-761-8331">+91 - 9993993909</a></p>
                                                    <p><a href="tel:+216-761-8331">+91 - 9009980049</a></p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className="fas fa-envelope" /></div>
                                                    <h3 className="twm-title">Support</h3>
                                                    <p>hello@unicx.in</p>
                                                    {/* <p>support12@gmail.com</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gmap-outline">
                <div className="google-map">
                    <div style={{ width: '100%' }}>
                        <iframe height={460} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d229.96484999747514!2d75.89568097207088!3d22.749135922483536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c2da4f0072a7f31%3A0xda581b582d64470f!2sUniConsultX%20Solutions%20Pvt.%20Ltd.%20%7C%20Top%20Legal%20-%20Services%20%7C%20Trademark%20Registration%2C%20Copyright%2C%20Logo%20Registration%2C%20Brand%20Security!5e0!3m2!1sen!2sin!4v1751261863913!5m2!1sen!2sin"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsPage;

