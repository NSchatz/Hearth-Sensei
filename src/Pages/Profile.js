import './Profile.css';
import React, { useState, useEffect } from "react";

function HistoryRow(props) {
    var battle = props.value;
    console.log(battle);
    return (
        <tr>
            <td>
                {battle.card1}
                <hr />
                <p class='battle-card-attack'>
                    Attack: {battle.card1_attack}
                </p>
                <br></br>
                <p class='battle-card-health'>
                    Health: {battle.card1_health}
                </p>
            </td>
            <td>
                {battle.card2}
                <hr />
                <p class='battle-card-attack'>
                    Attack: {battle.card2_attack}
                </p>
                <br></br>
                <p class='battle-card-health'>
                    Health: {battle.card2_health}
                </p>
            </td>
            <td class='battle-card-winner'>
                {battle.winner}
            </td>
            <td>
                <input type="button" value="Delete" onClick={props.onClick} />
            </td>
        </tr>
    );
}

function HistoryTable() {
    const [battles, setBattles] = useState([]);
    function getBattles() {
        fetch('/battles').
            then((response) => response.json()).
            then((data) => setBattles(data));
    }

    useEffect(() => {
        getBattles();
    }, []);

    function deleteAll() {
        fetch('/deleteAll', {
            method: 'POST'
        }).then((response) => (response.json()))
            .then((data) => { setBattles(data); });
    }

    function deleteBattle(id) {
        var battle = { "id": id };
        fetch('/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(battle),
        }).then((response) => (response.json()))
            .then((data) => { setBattles(data); });
    }

    function row(battle) {
        return <HistoryRow value={battle} onClick={() => deleteBattle(battle.id)} />
    }

    function historyRows() {
        var rows = [];
        var i = 0;
        for (i = 0; i < battles.length; i++) {
            var currentRow = battles[i];
            var tableRow = row(currentRow);
            rows.push(tableRow);
        }
        return rows;
    }
    return (
        <div>
            <p>Battle History</p>
            <table>
                <tr>
                    <th>Player Card</th>
                    <th>Opponent Card</th>
                    <th>Winner</th>
                </tr>
                {historyRows()}
                <tr>
                    <input type="button" value="Delete All Entries" onClick={() => deleteAll()} />
                </tr>
            </table>
        </div>
    );
}

function Profile() {
    return (
        <div className='Profile'>
            <h1>Profile</h1>
            <HistoryTable />
        </div>
    );
}

export default Profile;