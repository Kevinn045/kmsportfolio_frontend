import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/projects/")
            .then(res => setProjects(res.data));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Projects</h2>
            <div className="row">
                {projects.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <div className="card p-3 mb-3">
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <div className="card shadow-lg p-3">
                                    <img src={`http://127.0.0.1:8000${p.image}`} className="img-fluid" alt="" />
                                    <h5>{p.title}</h5>
                                    <p>{p.description}</p>
                                    <a href={p.link}>View</a>

                                </div>
                            </motion.div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;

