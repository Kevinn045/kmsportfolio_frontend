import React from "react";

import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function Home() {
    return (
        <div>

            {/* Top section */}
            <Header />

            {/* Projects section */}
            <Projects />

            {/* Contact section */}
            <Contact />

        </div>
    );
}

export default Home;