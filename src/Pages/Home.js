import React from "react";

import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ChatWidget from "../components/ChatWidget";

function Home() {
    return (
        <div>

            {/* Top section */}
            <Header />

            {/* Projects section */}
            <Projects />

            {/* Contact section */}
            <Contact />
            <ChatWidget />

        </div>
    );
}

export default Home;