import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Dashboard from "./Pages/Dashboard";
import AddProject from "./Pages/Addproject";
import Login from "./pages/Login";





function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("https://kmsportfolio-back.onrender.com/api/track/");
  }, []);


  return (
    <div className={dark ? "bg-dark text-white" : ""}>
      <button onClick={() => setDark(!dark)} className="btn btn-secondary m-2">
        Toggle Dark Mode
      </button>

      <BrowserRouter>
        <Navbar />

        {/* Routes (pages) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
