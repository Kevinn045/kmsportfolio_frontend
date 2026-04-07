import { motion } from "framer-motion";

<motion.div whileHover={{ scale: 1.05 }}>
    <div className="card shadow-lg p-3">
        <img src={p.image} className="img-fluid" alt="" />
        <h5>{p.title}</h5>
    </div>
</motion.div>
