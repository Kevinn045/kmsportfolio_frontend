import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">My Portfolio</span>
                <Link className="btn btn-secondary mx-2" to="/login">Login</Link>
                <Link className="btn btn-secondary mx-2" to="/add-project">Add Project</Link>
            </div>
        </nav>
    );
}
export default Navbar