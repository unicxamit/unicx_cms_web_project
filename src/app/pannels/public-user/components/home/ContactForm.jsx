import React, { useState } from "react";

const ContactForm = ({ expert, onClose }) => {
    const [selectedExpert, setSelectedExpert] = useState(expert || "");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const experts = [
        "Tradmark & Copyright Expert - IPR",
        "Company Registration & Compliances Expert - ROC",
        "Certification & Licenses Expert",
        "Finance & Accounts Expert",
        "Web & Graphics Expert - Digital",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Just UI simulation
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal */}
            <div className="modal show d-block" style={{ zIndex: 1050 }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Contact Our Expert</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body p-4">
                            {isSubmitted ? (
                                <div className="text-center p-4">
                                    <div
                                        className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: "60px", height: "60px" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            fill="white"
                                            className="bi bi-check2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2">Thank You!</h4>
                                    <p className="text-muted">
                                        Your message has been submitted. Our expert will contact you shortly.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-3"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {/* Expert Dropdown */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Select Expert</label>
                                        <select
                                            className="form-select"
                                            value={selectedExpert}
                                            onChange={(e) => setSelectedExpert(e.target.value)}
                                        >
                                            {experts.map((ex, i) => (
                                                <option key={i} value={ex}>
                                                    {ex}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Your Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Your Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email address"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Message</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Briefly describe how we can help you"
                                        ></textarea>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-lg rounded-1">
                                            <span className="me-2">📨</span>Send Message
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm rounded-1"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;
