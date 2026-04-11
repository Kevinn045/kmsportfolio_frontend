function Dashboard() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <h3>Access Denied</h3>;
    }


    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>

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
        </div>
    );
}

export default Dashboard;
