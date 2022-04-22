import './Profile.css';
import ProfileTemplate from './ProfileTemplate';
import React, { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState([]);

    function getUser() {
        fetch('/mainUser'). /* eslint-disable */
            then((response) => response.json()). /* eslint-disable */
            then((data) => setUser(data));
    }

    useEffect(() => {
        getUser();
    }, []);


    return (
        <div className='Profile'>
            <h1 className="profile-header">Profile</h1>
            <ProfileTemplate name={user.username} value={true} />
        </div>
    );
}

export default Profile;