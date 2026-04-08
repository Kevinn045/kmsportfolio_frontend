import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AddProject from "./Pages/Addprojects";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "bg-dark text-white" : ""}>
      <button onClick={() => setDark(!dark)} className="btn btn-secondary m-2">
        Toggle Dark Mode
      </button>

      <Router>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-project" element={<AddProject />} />
        </Routes>
      </Router>

      <Navbar />
      <Header />
      <Contact />


    </div>
  );
}

export default App;
