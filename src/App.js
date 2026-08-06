
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Dashboard from "./Pages/Dashboard";
import AddProject from "./Pages/Addprojects";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPost from "./Pages/BlogPost";
import BlogManagement from "./Pages/BlogManagement";
import ProjectManagement from "./Pages/ProjectManagement";
import Messages from "./Pages/Messages";
import Analytics from "./Pages/Analytics";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    fetch("https://kmsportfolio-back.onrender.com/api/track/")
      .catch((error) => {
        console.error("Visitor tracking failed:", error);
      });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar dark={dark} setDark={setDark} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<Blog />} />

            <Route path="/blog/:id" element={<BlogPost />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-project"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />

            <Route
             path="/blog-management"
             element={
               <ProtectedRoute>
                 <BlogManagement />
               </ProtectedRoute>
              }
            /> 
            <Route
             path="/blog/:id"
             element={<BlogPost />}
            />

            <Route
             path="/project-management"
             element={
              <ProtectedRoute>
                <ProjectManagement />
              </ProtectedRoute>
              }
            />

            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
             }
            />
            <Route path="/analytics" element={<Analytics />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
