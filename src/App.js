import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AddProject from "./Pages/AddProject";
import AddProject from "./Pages/Login";



function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "bg-dark text-white" : ""}>
      <button onClick={() => setDark(!dark)} className="btn btn-secondary m-2">
        Toggle Dark Mode
      </button>

      <Navbar />
      <Header />
      <Login />
      <AddProject />
      <Projects />
      <Contact />


    </div>
  );
}

export default App;
