import './addstaff.css'
import React, {useState, useRef}  from 'react';
import Header from '../header/adminheader.jsx';
import Footer from '../footer/adminfooter.jsx';

function AddStaff(){
    const nameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()
    const passRef = useRef()
    const passverifyRef = useRef()

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

            fetch('/api/verifyStaffmail', {
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

                    fetch('/api/verifyStaffphone', {
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
                            console.log(data)
                            fetch('/api/addStaff', {
                                method : 'POST',
                                headers : {'Content-Type':'application/json'},
                                body: JSON.stringify(data)
                            }).then(response => response.json())
                            .then(data =>{
                                const id = data.id
                                alert('Staff Added \n ID = '+id)
                                nameRef.current.value = ''
                                emailRef.current.value = ''
                                addressRef.current.value = ''
                                phoneRef.current.value = ''
                                passRef.current.value = ''
                                passverifyRef.current.value = ''
                            })
                            
                        }
                    })
                }
            })
        }
    }

    return(<>
    <Header />
    <div className="add-signup-page">
    <div className="add-container">
        <div className="add-title">Add Staff</div>
        <form onSubmit={submit}>
            <div className="add-user-details">
                <div className="add-input-box">
                    <span className="add-details">Name:</span>
                    <input id="FirstName" type="text" ref={nameRef} placeholder="Enter staff name" autoComplete='off' required />
                </div>
                <div className="add-input-box">
                    <span className="add-details">Email:</span>
                    <input id="email" type="text" ref={emailRef} placeholder="Enter staff email" autoComplete='off' required />
                </div>
                <div className="add-input-box">
                    <span className="add-details">Address:</span>
                    <input id="address"  type="text" ref={addressRef} placeholder="Enter staff address" autoComplete='off' required />
                </div>
                <div className="add-input-box">
                    <span className="add-details">Phone Number:</span>
                    <input id="phone" type="text" ref={phoneRef} placeholder="Enter staff phone no." autoComplete='off' required />
                </div>
                <div className="add-input-box">
                    <span className="add-details">Password (max 8 characters):</span>
                    <input id="password"  type="password" ref={passRef} maxLength="8" placeholder="Enter password" required/>
                </div>
                <div className="add-input-box">
                    <span className="add-details">Confirm password:</span>
                    <input id="verifypass"  type="password" ref={passverifyRef} maxLength="8" placeholder='Confirm password' required />
                </div>
            </div>
            <div className="add-login-link">
                <span style={{display: "none"}} id="invPhone"><i className="fas fa-exclamation-circle"></i>***Phone number should only contain digits (0-9)***</span>
                <span style={{display: "none"}} id="dupEmail"><i className="fas fa-exclamation-circle"></i>***Email already in use***</span>
                <span style={{display: "none"}} id="notmatch"><i className="fas fa-exclamation-circle"></i>***Password does not match***</span>
                <span style={{display: "none"}} id="dupPhone"><i className="fas fa-exclamation-circle"></i>***Phone number already in use***</span>
                <span style={{display: "none"}} id="extPhone"><i className="fas fa-exclamation-circle"></i>***Phone number should not exceed 11 digits***</span>                
            </div>
            <div className="add-button">
                <input type="submit" value="Add" />
            </div>
        </form>    
    </div>
    </div>    
    <Footer />
    </>

    )
}


export default AddStaff