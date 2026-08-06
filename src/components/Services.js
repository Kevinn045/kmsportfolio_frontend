import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    text: "Modern websites and web applications."
  },
  {
    title: "Business Systems",
    text: "Information systems for organizations."
  },
  {
    title: "AI Solutions",
    text: "Integrating AI into existing workflows."
  },
  {
    title: "IT Support",
    text: "Hardware, software and end-user support."
  },
  {
    title: "Networking",
    text: "Basic LAN setup and troubleshooting."
  },
  {
    title: "Database Design",
    text: "Designing and managing relational databases."
  }
];

function Services() {
  return (
    <section id="services" className="services-section">

      <div className="home-container">

        <div className="section-heading">
          <p className="section-label">
            SERVICES
          </p>

          <h2>How I can help.</h2>
        </div>

        <div className="services-grid">

          {services.map((service, index) => (

            <motion.div
              key={index}
              className="service-card"
              whileHover={{ y: -8 }}
            >

              <span>
                0{index + 1}
              </span>

              <h3>{service.title}</h3>

              <p>{service.text}</p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Services;