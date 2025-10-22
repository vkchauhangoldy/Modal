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
        if (!username || !email || !phone || !dob) return "All fields are required.";
        if (!email.includes("@")) return "Invalid email.";
        if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits.";
        if (new Date(dob) > new Date()) return "DOB cannot be in the future.";
        return "";
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        const validationerror = validationform();
        if (validationerror) {
            alert(validationerror);
            return;
        }
        closemodal();
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
                                    required
                                    type="text"
                                    id="username"
                                    value={formdata.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formdata.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <input
                                    required
                                    type="text"
                                    id="phone"
                                    value={formdata.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Date of Birth:</label>
                                <input
                                    required
                                    type="date"
                                    id="dob"
                                    value={formdata.dob}
                                    onChange={handleInputChange}
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
