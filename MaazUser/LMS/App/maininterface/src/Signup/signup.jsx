import React, {useState, useRef}  from 'react';
import "./signup.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup(){

    const created = (id) =>{
        navigate(`/success?id=${id}`)  
    }

    const nameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()
    const passRef = useRef()
    const passverifyRef = useRef()
    const navigate = useNavigate()

    function submit(e){    
        e.preventDefault()

        const name = nameRef.current.value
        const email = emailRef.current.value
        const address = addressRef.current.value
        const phone = phoneRef.current.value
        const pass = passRef.current.value
        const passverify = passverifyRef.current.value

        if (pass != passverify){
            document.getElementById('notmatch').style.display = ''
            setTimeout( ()=>{
                document.getElementById('notmatch').style.display = 'none'
            },3000)
        }else if(/\D/.test(phone)){
            document.getElementById('invPhone').style.display = ''
            setTimeout( ()=>{
                document.getElementById('invPhone').style.display = 'none'
            },3000)
        }else if(phone.length > 11){
            document.getElementById('extPhone').style.display = ''
            setTimeout( ()=>{
                document.getElementById('extPhone').style.display = 'none'
            },3000)
        }
        else{

            fetch('/api/verifymail', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email: email})
            }).then(response => response.json())
            .then(data => {
                if(!data.result){
                    document.getElementById('dupEmail').style.display = ''
                    setTimeout( ()=>{
                        document.getElementById('dupEmail').style.display = 'none'
                    },3000)
                }else{

                    fetch('/api/verifyphone', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({phone: phone})
                    }).then(response => response.json())
                    .then(data =>{
                        if(!data.result){
                            document.getElementById('dupPhone').style.display = ''
                            setTimeout( ()=>{
                                document.getElementById('dupPhone').style.display = 'none'
                            },3000)
                        }else{
                            const data = {name, email, address, phone, pass}
                            fetch('/api/signup', {
                                method : 'POST',
                                headers : {'Content-Type':'application/json'},
                                body: JSON.stringify(data)
                            }).then(response => response.json())
                            .then(data =>{
                                const id = data.id
                                created(id)  
                            })
                            
                        }
                    })
                }
            })
        }
    }

    return(
        <div className="signup-page">
    <div className="container">
        <div className="title">SignUp</div>
        <form onSubmit={submit}>
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Name:</span>
                    <input id="FirstName" type="text" ref={nameRef} placeholder="Enter your name" autoComplete='off' required />
                </div>
                <div className="input-box">
                    <span className="details">Email:</span>
                    <input id="email" type="text" ref={emailRef} placeholder="Enter your email" autoComplete='off' required />
                </div>
                <div className="input-box">
                    <span className="details">Address:</span>
                    <input id="address"  type="text" ref={addressRef} placeholder="Enter your address" autoComplete='off' required />
                </div>
                <div className="input-box">
                    <span className="details">Phone Number:</span>
                    <input id="phone" type="text" ref={phoneRef} placeholder="Enter your phone no." autoComplete='off' required />
                </div>
                <div className="input-box">
                    <span className="details">Password (max 8 characters):</span>
                    <input id="password"  type="password" ref={passRef} maxLength="8" placeholder="Enter your password" required/>
                </div>
                <div className="input-box">
                    <span className="details">Confirm password:</span>
                    <input id="verifypass"  type="password" ref={passverifyRef} maxLength="8" placeholder="Confirm your password" required />
                </div>
            </div>
            <div className="login-link">
                <span style={{display: "none"}} id="invPhone"><i className="fas fa-exclamation-circle"></i>***Phone number should only contain digits (0-9)***</span>
                <span style={{display: "none"}} id="dupEmail"><i className="fas fa-exclamation-circle"></i>***Email already in use***</span>
                <span style={{display: "none"}} id="notmatch"><i className="fas fa-exclamation-circle"></i>***Password does not match***</span>
                <span style={{display: "none"}} id="dupPhone"><i className="fas fa-exclamation-circle"></i>***Phone number already in use***</span>
                <span style={{display: "none"}} id="extPhone"><i className="fas fa-exclamation-circle"></i>***Phone number should not exceed 11 digits***</span>
                
                <p>Already have an account? <Link id='Loginfile' to="/login">Login</Link></p>
            </div>
            <div className="button">
                <input type="submit" value="Register" />
            </div>
        </form>    
    </div>
        </div>
    )
}

export default Signup