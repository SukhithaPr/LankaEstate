import { useState } from 'react';

function PropertyContact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (!form.name || !form.email) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("Form Submitted:", form);
    };

    return (
        <div className="d-flex bd-highlight">
            <div className="w-50 bd-highlight">
                <h5 className="fw-bold">Contact Agent</h5>
                <p className="text-muted">Fill in the form below to contact the agent</p>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        aria-label="Your Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        aria-label="Your Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Your Phone Number"
                        aria-label="Your Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="message"
                        rows="6"
                        placeholder="I'm interested in"
                        aria-label="Message"
                        value={form.message}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button
                    type="button"
                    className="btn btn-lg btn-success fs-5"
                    aria-label="Submit Contact Form"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            {/* Advertiser Information Section */}
            <div className="w-50 bd-highlight p-3">
                <h5 className="fw-bold">Advertiser Profile</h5>
                <div className="d-flex align-items-center">
                    <img
                        src="/agent.jpg"
                        alt="Advertiser"
                        className="rounded-circle me-3"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                        <p className="fw-bold mb-1">John Doe</p>
                        <p className="text-muted mb-0">Experienced Real Estate Agent</p>
                    </div>
                </div>
                <p className="mt-3 text-muted">
                    John has been in the real estate business for over 10 years and specializes in residential properties.
                    Feel free to reach out for expert advice and guidance.
                </p>
                <ul>
                    <li>Email: john.doe@example.com</li>
                    <li>Phone: +123 456 7890</li>
                    <li>Website: www.johndoerealtor.com</li>
                </ul>

                {/* Contact Buttons */}
                <div className="mt-3">
                    <button
                        className="btn btn-success me-2"
                        onClick={() => window.open('https://wa.me/11234567890', '_blank')}
                    >
                        <i className="bi bi-whatsapp"></i> WhatsApp
                    </button>
                    <button
                        className="btn btn-success me-2"
                        onClick={() => window.location.href = 'tel:+1234567890'}
                    >
                        <i className="bi bi-telephone"></i> Call
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => window.location.href = 'mailto:john.doe@example.com'}
                    >
                        <i className="bi bi-envelope"></i> Email
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PropertyContact;