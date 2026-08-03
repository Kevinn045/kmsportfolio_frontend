import { motion } from "framer-motion";

const expertise = [
  {
    icon: "💻",
    title: "Software & Web Development",
    description:
      "Building modern web applications, REST APIs and business solutions using Python, Django, React and modern development practices.",
    skills: ["Python", "Django", "React", "REST APIs"],
  },
  {
    icon: "🛠️",
    title: "IT Support & Systems",
    description:
      "Troubleshooting hardware and software issues, configuring systems and helping users solve day-to-day technology problems.",
    skills: ["Troubleshooting", "System Setup", "User Support", "Maintenance"],
  },
  {
    icon: "🏢",
    title: "Business Information Systems",
    description:
      "Using technology to analyze business processes, improve workflows and develop practical information-system solutions.",
    skills: [
      "Business Analysis",
      "Systems Analysis",
      "Process Improvement",
      "Digital Solutions",
    ],
  },
  {
    icon: "📊",
    title: "Data & Databases",
    description:
      "Managing structured information and developing database-driven applications for reliable data storage and retrieval.",
    skills: ["SQL", "MySQL", "SQLite", "Data Management"],
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    description:
      "Exploring artificial intelligence and integrating AI capabilities into applications to create smarter and more efficient solutions.",
    skills: ["AI APIs", "AI Assistants", "Automation", "Prompt Engineering"],
  },
  {
    icon: "📑",
    title: "Digital & Office Technology",
    description:
      "Using digital tools to support documentation, reporting, information management and technology-driven administrative workflows.",
    skills: [
      "Documentation",
      "Reporting",
      "Information Management",
      "Office Technology",
    ],
  },
];

function Expertise() {
  return (
    <section id="expertise" className="section expertise-section">
      <div className="expertise-container">

        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">WHAT I DO</p>

          <h2>Technology Meets Business</h2>

          <p>
            My Business Information Technology background allows me to work
            across software development, IT support, business systems,
            data and emerging technologies.
          </p>
        </motion.div>

        <div className="expertise-grid">
          {expertise.map((item, index) => (
            <motion.article
              className="expertise-card"
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
            >
              <div className="expertise-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <div className="expertise-skills">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Expertise;