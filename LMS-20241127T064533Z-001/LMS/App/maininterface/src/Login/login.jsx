import React, { useState, useRef } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const admin = (id)=>{
        navigate(`/admin?id=${id}`) 
    }
    const userNav = (data)=>{
        navigate("/user",{state: data })
    }
    const staff = (data)=>{
        navigate("/staff",{state: data})
    }

    const idRef = useRef();
    const passRef = useRef();
    const [shake, setShake] = useState(false);
    const [showError, setShowError] = useState(false);
    const [icons, seticons]= useState(true)
    const navigate = useNavigate()

    function submit(e) {
        e.preventDefault();

        const id = idRef.current.value;
        const pass = passRef.current.value;

        const user = props.user

        if (user ==='User'){
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, pass }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        userNav(data.data[0])
                    } else {
                        setShake(true);
                        setShowError(true);
                        seticons(false);
    
                        setTimeout(() => {
                            setShowError(false)
                            setShake(false);
                            seticons(true)
                            idRef.current.value = ''
                            passRef.current.value = ''
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }else if(user==='Admin'){
            fetch('/api/Adminlogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, pass }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        admin(data.data[0].Admin_id)
                        
                    } else {
                        setShake(true);
                        setShowError(true);
                        seticons(false);
    
                        setTimeout(() => {
                            setShowError(false)
                            setShake(false);
                            seticons(true)
                            idRef.current.value = ''
                            passRef.current.value = ''
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }else if(user ==='Staff'){
            fetch('/api/Stafflogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, pass }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        staff(data.data[0])
                        
                    } else {
                        setShake(true);
                        setShowError(true);
                        seticons(false);
    
                        setTimeout(() => {
                            setShowError(false)
                            setShake(false);
                            seticons(true)
                            idRef.current.value = ''
                            passRef.current.value = ''
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });            
        }

    }

    return (
        <div className="login-page">
        <div className="wrapper">
            <form onSubmit={submit}>
                <h1>{props.user === 'User' ? 'Login': props.user ==='Staff' ? 'Staff Login':'Admin Login'}</h1>
                <div className={`input-box ${shake ? 'shake' : ''}`}>
                    <input id="Username" type="text" ref={idRef} placeholder={props.user.toLowerCase()+'ID'} autoComplete='off' required />
                    {icons && <i className="user-icon bx bx-user"></i>}
                    {showError && <i className="error error-icon fas fa-exclamation-circle"></i>}
                </div>

                <div className={`input-box ${shake ? 'shake' : ''}`}>
                    <input id="password" type="password" ref={passRef} placeholder="Password" required />
                    {icons && <i className="password-icon bx bx-lock-alt"></i>}
                    {showError && <i className="error error-icon fas fa-exclamation-circle"></i>}
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a href="#">Forgot Password</a>
                </div>
                {showError && <div className="error error-txt">***Invalid Credentials***</div>}
                <button type="submit" className="btn">
                    Login
                </button>
                <div className="register-link">
                    <p>
                        Don't have an account? <Link to="/signup">Register</Link>
                    </p>
                </div>
            </form>
        </div>
        </div>

    );
}

export default Login;
