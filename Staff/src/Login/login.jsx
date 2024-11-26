import React from 'react';
import "./login.css"
import { Link } from 'react-router-dom';

function Login(){
    return(<div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input id='Username' type="text" placeholder="UserID" required />
                <i className='user-icon bx bx-user'></i> 
                <i className="error error-icon fas fa-exclamation-circle"></i>
            </div>

            <div className="input-box">
                <input id='password' type="password" placeholder="Password" required />
                <i className='password-icon bx bx-lock-alt'></i>
                <i className="error error-icon fas fa-exclamation-circle"></i>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox" />Remember Me</label>
                <Link to="/register">Forgot Password</Link>
            </div>
            <div className="error error-txt">Invalid Credentials</div>
            <button type="submit" className="btn" >Login</button>
            <div className="register-link">
                <p>Don't have an account?<Link to="/register">Register</Link></p>
            </div>
        </form>
        </div>)   
}

export default Login
