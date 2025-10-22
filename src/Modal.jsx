import React, { useState, useRef } from "react";
import "./Modal.css";

const Modal = () => {
    const [ismodalopen, setismodalopen] = useState(false);
    const [formdata, setformdata] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
    });

    const modalRef = useRef(null);

    const openmodal = () => setismodalopen(true);

    const closemodal = () => {
        setismodalopen(false);
        setformdata({ username: "", email: "", phone: "", dob: "" });
    };

    // Detect outside click
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closemodal();
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setformdata({ ...formdata, [id]: value });
    };

    const validationform = () => {
        const { username, email, phone, dob } = formdata;

        if (!username || !email || !phone || !dob) {
            return "All fields are required.";
        }

        if (!email.includes("@")) {
            alert("Invalid email. Please check your email address.");
            return false;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            return false;
        }

        if (new Date(dob) > new Date()) {
            alert("Invalid date of birth. Date of birth cannot be in the future.");
            return false;
        }

        return true;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (validationform()) {
            closemodal();
        }
    };

    return (
        <div className="app">
            <h1>User Details Modal</h1>
            <button className="submit-button" onClick={openmodal}>
                Open Form
            </button>

            {ismodalopen && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content" ref={modalRef}>
                        <form onSubmit={handlesubmit}>
                            <h2>Fill Detail</h2>
                            <div>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={formdata.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formdata.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={formdata.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    id="dob"
                                    value={formdata.dob}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
