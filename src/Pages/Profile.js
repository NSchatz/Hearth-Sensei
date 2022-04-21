import './Profile.css';
import ProfileTemplate from './ProfileTemplate';
import React, { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState([]);

    function getUser() {
        fetch('/mainUser').
            then((response) => response.json()).
            then((data) => setUser(data));
    }

    useEffect(() => {
        getUser();
    }, []);


    return (
        <div className='Profile'>
            <h1 class="profile-header">Profile</h1>
            <ProfileTemplate name={user.username} value={true} />
        </div>
    );
}

export default Profile;