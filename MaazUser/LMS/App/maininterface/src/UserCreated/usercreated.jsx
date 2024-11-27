import React, { useEffect, useState } from 'react';
import './usercreated.css';
import { Link } from 'react-router-dom';
import graytick from '../assets/graytick.png'
import tick from '../assets/tick.png'

function UserCreated() {
  const [userID, setUserID] = useState('');

  setTimeout(function() {
    document.querySelector('.checkmark').style.opacity = 1;
    }, 2000);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');
    if (id) {
      setUserID(id);
    }
  }, []);

  return (
    <div className="user-created-page">
    <div className="contain">
      <div className="title">Account Created</div>
      <div className="img-contain">
        <img src={graytick} alt="Gray checkmark" />
        <img src={tick} alt="Green checkmark" className="checkmark" />
      </div>
      <div className="userID">
        <p style={{ textAlign: 'center' }}>
          Welcome! Your ID is <span id="IDplaceholder">{userID}</span>
          <br />
          Use this ID to login
        </p>
      </div>
      <div className="login-link">
        <p>
          You can login <Link id="Loginfile" to="/login">here</Link>
        </p>
      </div>
    </div>
    </div>

  );
}

export default UserCreated;
