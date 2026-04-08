import { useState } from "react";
import axios from "axios";

function AddProject() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        link: "",
        Image: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            "https://kmsportfolio-backendy.onrender.com/api/add-project/",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(() => alert("Project added!"))
            .catch(() => alert("Not authorized"));
    };

    return (
        <div className="container mt-5">
            <h2>Add Project</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2"
                    placeholder="Title"
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                />

                <textarea className="form-control mb-2"
                    placeholder="Description"
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />

                <input className="form-control mb-2"
                    placeholder="Link"
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                />

                <button className="btn btn-dark">Add Project</button>
            </form>
        </div>
    );
}

export default AddProject;