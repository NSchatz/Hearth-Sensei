import './Battle.css';
import Image1 from "../images/blankcard1.png";
import React, { useState, useEffect, Image } from "react";
import { Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

let cards = '/getcards'

function CustomBattle() {
    const [attackInput, setAttackInput] = useState('');
    const [healthInput, setHealthInput] = useState('');
    const [Cards, setCards] = useState([]);
    //   const [Card1, setCard1] = useState([]);
    //   const [Card2, setCard2] = useState([]);
    const [Card3, setCard3] = useState([]);
    const [customCard1, setcustomCard] = useState([]);
    const [customResult, setCustomResult] = useState('');
    const [isLoading, setLoading] = useState(true);
    const cardback = [{ "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a56562dad5da22c759f74601fe4d7d4ca1089577d5c837752ec13248b0ecb68c.png" }]

    useEffect(() => {
        fetch(cards, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(data => {
                setCards(data);
                setLoading(false);
                setCard3(cardback)
                setcustomCard({ "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a56562dad5da22c759f74601fe4d7d4ca1089577d5c837752ec13248b0ecb68c.png" })
            });
    }, []);

    function filterCard3(e) {
        const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
        setCard3(filtered);
    }
   
    const handleAttack = (e) => {
        setAttackInput({ value: e.target.value })
        console.log(attackInput)
        setcustomCard({ "img": Image1 })
    }

    const handleHealth = (e) => {
        setHealthInput({ value: e.target.value })
        console.log(healthInput)
        setcustomCard({ "img": Image1 })
    }

    function customCardBattle(event) {
        event.preventDefault();
        let card1Name, card1Attack, card1Health, card2Name, card2Attack, card2Health, winner;
        // eslint-disable-next-line array-callback-return
        card1Attack = attackInput;
        card1Health = healthInput;
        card1Name = 'custom';
        // eslint-disable-next-line array-callback-return
        Card3.map((object) => {
            card2Attack = object.attack;
            card2Health = object.health;
            card2Name = object.name;
        });
        if ((card1Health['value'] / card2Attack) > (card2Health / card1Attack['value'])) {
            setCustomResult('You win!');
            winner = 'User';
        } else if ((card1Health['value'] / card2Attack) < (card2Health / card1Attack['value'])) {
            setCustomResult('Opponent wins!');
            winner = 'Opponent';
        } else if ((card1Health['value'] / card2Attack) === (card2Health / card1Attack['value'])) {
            setCustomResult('Whoever goes first wins!');
            winner = 'Tie';
        }
        console.log(customResult)
        // Work in progress
        const recentBattle = {
            "card1": card1Name,
            "card1_attack": Number(card1Attack['value']),
            "card1_health": Number(card1Health['value']),
            "card2": card2Name,
            "card2_attack": card2Attack,
            "card2_health": card2Health,
            "winner": winner,
        }
        submitRecentBattle(recentBattle)
        console.log(recentBattle)
    }
    function submitRecentBattle(recentBattle) {
        fetch('/savebattle', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ recentBattle }),
        });
    }
    function randomizer() {
        const randomCard = Cards[Math.floor(Math.random() * Cards.length)];
        return [randomCard];
    }
    function handleRandomOpp() {
        let randomCard = randomizer();
        setCard3(randomCard);
    }
    function handleRandomize() {
        handleRandomOpp();
    }

    return (
        isLoading ? <div className="Loading-spinner" class="center"><Spinner animation="border" role="status" />Loading...</div>
            : <div className="Battle">
                <Link to='/battle'>Normal Battle</Link>
                <br />
                <button class="random-button" type="button" onClick={handleRandomOpp}>Randomize Opponent</button>
                <div>
                    <form action="" onSubmit={customCardBattle}>
                        <div>Attack</div>
                        <input id="attack" type="Attack" value={attackInput.value} onChange={(e) => handleAttack(e)} />
                        <div>Health</div>
                        <input id="health" type="Health" value={healthInput.value} onChange={(e) => handleHealth(e)} />
                        <select onChange={(e) => filterCard3(e)}>
                            {Cards.map((item) => <option id='card3' key={item} value={item.cardId}>{item.name}</option>)}
                        </select>
                        <div id='imgs'>
                            <Container class="customcontainer">
                                <img src={customCard1['img']} class='img' alt="" />
                                <div class="inputs">
                                    <div class="attackinput">{attackInput['value']}</div>
                                    <div class="healthinput">{healthInput['value']}</div>
                                </div>
                            </Container>
                            <img src="https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png" width="200" />
                            {Card3.map((object) => <img class='img' src={object.img} />)}
                        </div>
                        <input class="battle-button" type="Submit" value="Custom Battle!" />
                    </form>

                    <div class="result">
                        Result
                    </div>
                    <div class="winner-result">
                        {customResult}
                    </div>
                </div>
            </div>
    );
}

export default CustomBattle;