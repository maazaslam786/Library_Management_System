import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/auth';
import './staffLogin.css';

function Login() {
    const [staffID, setStaffID] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                staffID, password
            });
            const { token } = response.data;
            login(token);
            navigate('/staff');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-box">
                    <input
                        id="staffID"
                        type="text"
                        placeholder="Staff ID"
                        value={staffID}
                        onChange={(e) => setStaffID(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
}

export default Login;
