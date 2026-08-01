
import { motion } from "framer-motion";

const skills = [
  {
    title: "Python",
    description: "Backend development, automation and application logic.",
  },
  {
    title: "Django",
    description: "Web applications, REST APIs and backend systems.",
  },
  {
    title: "React",
    description: "Interactive and responsive frontend applications.",
  },
  {
    title: "REST APIs",
    description: "Connecting frontend applications with backend services.",
  },
  {
    title: "AI Integration",
    description: "Integrating AI capabilities into web applications.",
  },
  {
    title: "Databases",
    description: "Working with application data and database-backed systems.",
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="skills-container">

        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">WHAT I WORK WITH</p>

          <h2>Skills & Technologies</h2>

          <p>
            Technologies and areas I use to design and build practical
            digital solutions.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              className="skill-card"
              key={skill.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <div className="skill-number">
                0{index + 1}
              </div>

              <h3>{skill.title}</h3>

              <p>{skill.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
