import './Profile.css';
import React, { useState, useEffect, useRef } from "react";

function MainProfile(props) {
    const user = props.value;
    const [history, setHistory] = useState([]);
    function getHistory() {
        var username = { "username": user };
        fetch('/userBattles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(username),
        }).then((response) => (response.json()))
            .then((data) => { setHistory(data); });
    }
    function historyRows() {
        var rows = [];
        var i;
        for (i = 0; i < history.length; i++) {
            var battle = history[i];
            var currentRow = (
                <tr>
                    <td>
                        {battle.card1}
                        <hr />
                        <p class="battle-card-attack">
                            Attack: {battle.card1_attack}
                        </p>
                        <br></br>
                        <p class="battle-card-health">
                            Health: {battle.card1_health}
                        </p>
                    </td>
                    <td>
                        {battle.card2}
                        <hr />
                        <p class="battle-card-attack">
                            Attack: {battle.card2_attack}
                        </p>
                        <br></br>
                        <p class="battle-card-health">
                            Health: {battle.card2_health}
                        </p>
                    </td>
                    <td class="battle-card-winner">
                        {battle.winner}
                    </td>
                </tr>
            );
            rows.push(currentRow);
        }
        return rows;
    }

    useEffect(() => {
        getHistory();
    }, [user]);


    return (
        <div>

            <table>
                <tr>
                    <th>Player Card</th>
                    <th>Opponent Card</th>
                    <th>Winner</th>
                </tr>
                {historyRows()}
            </table>
        </div>
    );

}

function UserProfile() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState("");
    const username = useRef();
    function getUsers() {
        fetch('/users').
            then((response) => response.json()).
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
        if (profile == "") {
            return (
                <p>Profile not selected</p>
            );
        } else {
            return (
                <MainProfile value={profile} />
            );
        }
    }

    return (
        <div>
            <label for="users">Pick a user</label>
            <select name="users" id="users" ref={username}>
                {userList()}
            </select>
            <input type="submit" value="Load Profile" onClick={() => profileSelection()}></input>
            <br></br>
            {loadProfile()}
        </div>
    );
}

function Users() {
    return (
        <div className='Users'>
            <h1>Users</h1>
            <UserProfile />
        </div>
    );
}

export default Users;