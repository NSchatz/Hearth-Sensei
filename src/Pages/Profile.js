import './Profile.css';
import React, { useState, useEffect } from "react";

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

    function historyRows() {
        var rows = [];
        var i = 0;
        for (i = 0; i < battles.length; i++) {
            var currentRow = battles[i];
            var row = (
                <tr>
                    <td>
                        {currentRow.card1}
                        <br></br>
                        <p>
                            Attack: {currentRow.card1_attack}
                        </p>
                        <br></br>
                        <p>
                            Health: {currentRow.card1_health}
                        </p>
                    </td>
                    <td>
                        {currentRow.card2}
                        <br></br>
                        <p>
                            Attack: {currentRow.card2_attack}
                        </p>
                        <br></br>
                        <p>
                            Health: {currentRow.card2_health}
                        </p>
                    </td>
                    <td>
                        {currentRow.winner}
                    </td>
                </tr>
            );
            rows.push(row);
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