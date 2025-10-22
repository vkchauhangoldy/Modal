import React, { useState } from "react";
import "./Modal.css";

const Modal = () => {
    const [ismodalopen, setismodalopen] = useState(false);
    const [formdata, setformdata] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
    });
    const openmodal = () => {
        setismodalopen(true);
    };
    const closemodal = () => {
        setismodalopen(false);
        setformdata({
            username: "",
            email: "",
            phone: "",
            dob: "",
        });
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setformdata({ ...formdata, [id]: value });
    };
    const validationform = () => {
        const { username, email, phone, dob } = formdata;

        // Check if all fields are filled
        if (!username || !email || !phone || !dob) {
            return "All fields are required.";
        }

        if (!email.includes("@")) {
            return "Invalid email. Please check your email address.";
        }

        //validate phone
        if (!/^\d{10}$/.test(phone)) {
            return "Invalid phone number. Please enter a 10-digit phone number.";
        }
        if (new Date(dob) > new Date()) {
            return "Invalid date of birth. Date of birth cannot be in the future.";
        }
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
                <div className="modal" onClick={closemodal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form action="" onSubmit={handlesubmit}>
                            <h2>Fill Detail</h2>
                            <div>
                                <label htmlFor="">Username:</label>
                                <input
                                    required
                                    type="text"
                                    id="username"
                                    value={formdata.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Email:</label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formdata.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Phone:</label>
                                <input
                                    required
                                    type="text"
                                    id="phone"
                                    value={formdata.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Date of Birth:</label>
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
