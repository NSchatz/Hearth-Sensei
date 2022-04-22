import './Profile.css';
import React, { useState, useEffect } from "react";

function HistoryRow(props) {
    const battle = props.value.battle;
    const isMainProfile = props.value.isMainProfile;

    function deleteButton() {
        if (isMainProfile) {
            return (
                <td>
                    <input class="delete-button" type="button" value="Delete" onClick={props.onClick} />
                </td>
            );
        }
    }
    return (
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
                <b>{battle.winner}</b>
            </td>
            {deleteButton()}
        </tr>
    );
}

function HistoryTable(props) {
    const user = props.name;
    const isMainProfile = props.value;
    const [history, setHistory] = useState([]);
    function getHistory() {
        var username = { "username": user };
        fetch('/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(username),
        }).then((response) => (response.json()))
            .then((data) => { setHistory(data); });
    }

    function deleteHistory(option) {
        var selection = { "selection": option }
        fetch('/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selection),
        }).then((response) => (response.json()))
            .then((data) => { setHistory(data); });

    }

    function deleteAllButton() {
        if (isMainProfile) {
            return (
                <tr>
                    <input class="deleteall-button" type="button" value="Delete All Entries" onClick={() => deleteHistory("all")} />
                </tr>
            );
        }
    }

    function row(battle) {
        return <HistoryRow value={{ "battle": battle, "isMainProfile": isMainProfile }} onClick={() => deleteHistory(battle.id)} />
    }

    function historyRows() {
        var rows = [];
        var i;
        for (i = 0; i < history.length; i++) {
            var battle = history[i];
            var currentRow = row(battle);
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
                {deleteAllButton()}
            </table>
        </div>
    );
}

function ProfileTemplate(props) {
    return (
        <div className='ProfileTemplate'>
            <HistoryTable name={props.name} value={props.value} />
        </div>
    );
}

export default ProfileTemplate;