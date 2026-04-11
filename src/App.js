import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navbar from "./components/Navbar";

import AddProject from "./Pages/Addprojects";
import Login from "./Pages/Login";




function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/track/");
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
