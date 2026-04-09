import { useState } from "react";
import axios from "axios";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("https://kmsportfolio-back.onrender.com/api/contact/", form)
            .then(() => alert("Message sent!"))
            .catch(() => alert("Error sending message"));
    };

    return (
        <div className="container mt-5">
            <h2>Contact</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" placeholder="Name"
                    onChange={e => setForm({ ...form, name: e.target.value })} />

                <input className="form-control mb-2" placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })} />

                <textarea className="form-control mb-2" placeholder="Message"
                    onChange={e => setForm({ ...form, message: e.target.value })} />

                <button className="btn btn-dark">Send</button>
            </form>
        </div>
    );
}

export default Contact;
