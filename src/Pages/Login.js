import { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://kmsportfolio-back.onrender.com/api/token/",
                formData
            );

            // 🔥 THIS IS THE IMPORTANT PART
            localStorage.setItem("token", res.data.access);

            alert("Login successful!");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                placeholder="Username"
                onChange={e => setFormData({ ...formData, username: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setFormData({ ...formData, password: e.target.value })}
            />

            <button>Login</button>
        </form>
    );
}

export default Login;