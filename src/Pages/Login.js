import axios from "axios";
import { useState } from "react";

function Login() {
    const [data, setData] = useState({ username: "", password: "" });

    const login = () => {
        axios.post("https://kmsportfolio-backendy.onrender.com/api/login/", data)
            .then(res => {
                localStorage.setItem("token", res.data.access);
                alert("Logged in!");
            });
    };

    return (
        <div className="container">
            <input placeholder="username"
                onChange={e => setData({ ...data, username: e.target.value })} />
            <input type="password" placeholder="password"
                onChange={e => setData({ ...data, password: e.target.value })} />
            <button onClick={login}>Login</button>
        </div>
    );
}
export default Login