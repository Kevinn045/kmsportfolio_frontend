import { useState } from "react";
import axios from "axios";

function AddProject() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        link: "",
        image: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must log in first");
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("link", formData.link);
        data.append("image", formData.image);

        try {
            await axios.post(
                "https://kmsportfolio-back.onrender.com/api/add-project/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Project added!");
        } catch (err) {
            console.log(err.response?.data);
            alert("Upload failed");
        }
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

                <input
                    type="file"
                    className="form-control mb-2"
                    onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
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