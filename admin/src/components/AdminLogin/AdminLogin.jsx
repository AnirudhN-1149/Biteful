import { useState } from 'react';
import './AdminLogin.css';
import { assets } from '../../assets/assets'

const AdminLogin = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (event) => {
        event.preventDefault()
        if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
            localStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Invalid password');
        }
    }

    return (
        <div className="admin-login">
            <form onSubmit={handleLogin} className="login-form">
                <img src={assets.login_logo} alt="" />
                <h1>Admin Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Admin Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Admin Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;