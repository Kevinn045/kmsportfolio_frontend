import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    api.get("profile/")
        .then((res) => setUser(res.data))
        .catch(console.error);
}, []);

    const logout = () => {
     localStorage.removeItem("access");
     localStorage.removeItem("refresh");
     window.location.href = "/login";
    };
    
    const token = localStorage.getItem("access");

    if (!access) {
        return <h3>Access Denied</h3>;
    }


    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <h2>Welcome {user?.username}</h2>
                <p>{user?.email}</p>
                {user?.is_staff && <p>Administrator</p>}
            <div className="card p-3 mb-3">
                <h4>Projects</h4>
                <p>Manage your projects</p>
            </div>

            <div className="card p-3 mb-3">
                <h4>Messages</h4>
                <p>View contact messages</p>
            </div>

            <div className="card p-3 mb-3">
                <h4>Analytics</h4>
                <p>Track visitors</p>
            </div>
            <button onClick={logout}>
               Logout
            </button>
        </div>
    );
}

export default Dashboard;
