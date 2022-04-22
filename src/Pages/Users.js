import './Users.css';
import ProfileTemplate from './ProfileTemplate';
import React, { useState, useEffect, useRef } from "react";

function UserProfile() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState("");
    const username = useRef();
    function getUsers() {
        fetch('/users').    /* eslint-disable */
            then((response) => response.json()). /* eslint-disable */
            then((data) => setUsers(data));
    }

    useEffect(() => {
        getUsers();
    }, []);

    function userList() {
        var totalUsers = [];
        var i;
        for (i = 0; i < users.length; i++) {
            var user = <option value={users[i].username}>{users[i].username}</option>;
            totalUsers.push(user);
        }
        return totalUsers;
    }

    function profileSelection() {
        var selectedUser = username.current.value;
        setProfile(selectedUser);
    }

    function loadProfile() {
        if (profile == "") { /* eslint-disable */
            return (
                <p>Profile not selected</p>
            );
        } else {
            return (
                <ProfileTemplate name={profile} value={false} />
            );
        }
    }

    return (
        <div>
            <label for="users">Pick a user: </label>
            <select class="dd-input-boxes" name="users" id="users" ref={username}>
                {userList()}
            </select>
            <input class="load-button" type="submit" value="Load Profile" onClick={() => profileSelection()}></input>
            <br></br>
            {loadProfile()}
        </div>
    );
}

function Users() {
    return (
        <div className='Users'>
            <h1 class="user-header">Users</h1>
            <UserProfile />
        </div>
    );
}

export default Users;