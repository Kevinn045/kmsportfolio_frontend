
import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ChatWidget from "../components/ChatWidget";

function Home() {
  return (
    <main className="home-page">

      {/* Hero */}
      <Header />

      {/* About */}
      <section id="about" className="about-section">
        <div className="home-container">

          <div className="section-heading">
            <p className="section-label">ABOUT ME</p>
            <h2>Building useful technology with purpose.</h2>
          </div>

          <div className="about-content">
            <div className="about-text">
              <p>
                I'm Kevin Muse, a Business Information Technology graduate
                passionate about software development, web technologies,
                and artificial intelligence.
              </p>

              <p>
                I enjoy turning ideas into practical digital solutions,
                from REST APIs and database-driven applications to
                interactive React interfaces and AI-powered experiences.
              </p>

              <p>
                My current focus is building reliable, modern applications
                using technologies such as Python, Django, React, and AI.
              </p>
            </div>

            <div className="about-highlights">

              <div className="about-highlight">
                <strong>01</strong>
                <span>Backend Development</span>
              </div>

              <div className="about-highlight">
                <strong>02</strong>
                <span>Frontend Development</span>
              </div>

              <div className="about-highlight">
                <strong>03</strong>
                <span>AI Integration</span>
              </div>

              <div className="about-highlight">
                <strong>04</strong>
                <span>Problem Solving</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <div className="home-container">

          <div className="section-heading">
            <p className="section-label">WHAT I WORK WITH</p>
            <h2>My technical toolkit.</h2>
          </div>

          <div className="skills-grid">

            <div className="skill-card">
              <span className="skill-number">01</span>
              <h3>Python</h3>
              <p>
                Building backend applications, APIs, automation,
                and intelligent systems.
              </p>
            </div>

            <div className="skill-card">
              <span className="skill-number">02</span>
              <h3>Django</h3>
              <p>
                Developing secure, scalable web applications
                and REST APIs.
              </p>
            </div>

            <div className="skill-card">
              <span className="skill-number">03</span>
              <h3>React</h3>
              <p>
                Creating responsive and interactive user
                interfaces for modern web applications.
              </p>
            </div>

            <div className="skill-card">
              <span className="skill-number">04</span>
              <h3>Artificial Intelligence</h3>
              <p>
                Integrating AI capabilities into applications
                to create smarter user experiences.
              </p>
            </div>

            <div className="skill-card">
              <span className="skill-number">05</span>
              <h3>REST APIs</h3>
              <p>
                Designing and consuming APIs to connect
                frontend applications with backend services.
              </p>
            </div>

            <div className="skill-card">
              <span className="skill-number">06</span>
              <h3>Databases</h3>
              <p>
                Working with relational databases and
                data-driven applications.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>

      {/* AI Assistant */}
      <ChatWidget />

    </main>
  );
}

export default Home;

