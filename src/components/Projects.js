import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("https://kmsportfolio-back.onrender.com/api/projects/")
            .then(res => setProjects(res.data));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Projects</h2>
            <div className="row">
                {projects.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="card shadow-lg p-3">
                                <img src={`https://kmsportfolio-back.onrender.com${p.image}`} className="img-fluid" alt="" />
                                <h5>{p.title}</h5>
                            </div>
                        </motion.div>

                    </div>
                ))}
            </div>
        </div >
    );
}

export default Projects;

