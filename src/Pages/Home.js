import React from "react";

import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ChatWidget from "../components/ChatWidget";
import About from "../components/About";
import Skills from "../components/Skills";

function Home() {
    return (
        <div>

            {/* Top section */}
            <Header />

            {/* Projects section */}
            <Projects />

            {/* Contact section */}
            <Contact />

            {/* About */} 
            <About /> 

            {/* Skills */}
            <Skills />
            
            <ChatWidget />

        </div>
    );
}

export default Home;