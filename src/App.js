import './App.css';
import React, { useState, useEffect } from "react";
import { Spinner } from 'react-bootstrap';
let cards = '/getcards'

function App() {
  const [Cards, setCards] = useState([]);
  const [Card1, setCard1] = useState([]);
  const [Card2, setCard2] = useState([]);
  const [Result, setResult] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(true);
  useEffect(() => {
    fetch(cards, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      });
  }, []);

  function filterCard1(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard1(filtered);
    setEmpty(false);
  }
  function filterCard2(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard2(filtered);
    setEmpty(false);
  }
  function onSubmit(event) {
    event.preventDefault();
    let card1Name, card1Attack, card1Health, card2Name, card2Attack, card2Health, winner;
    Card1.map((object) => {
      card1Attack = object.attack;
      card1Health = object.health;
      card1Name = object.name;
    });
    Card2.map((object) => {
      card2Attack = object.attack;
      card2Health = object.health;
      card2Name = object.name;
    });
      if ((card1Health/card2Attack) > (card2Health/card1Attack)) {
        setResult('You win!');
        winner = 'User';
      } else if ((card1Health/card2Attack) < (card2Health/card1Attack)) {
        setResult('Opponent wins!');
        winner = 'Opponent';
      } else if((card1Health/card2Attack) === (card2Health/card1Attack)) {
        setResult('Whoever goes first wins!');
        winner = 'Tie';
      }

    const recentBattle = {
      "card1": card1Name,
      "card1_attack": card1Attack,
      "card1_health": card1Health,
      "card2": card2Name,
      "card2_attack": card2Attack,
      "card2_health": card2Health,
      "winner": winner,
    }
    submitRecentBattle(recentBattle)
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
    setEmpty(false);
    return [randomCard];
  }
  function handleRandomOpp() {
    let randomCard = randomizer();
    setCard2(randomCard);
  }
  function handleRandomUser() {
    let randomCard = randomizer();
    setCard1(randomCard);
  }
  function handleRandomize() {
    handleRandomUser();
    handleRandomOpp();
  }

  return (
    isLoading ? <div className="Loading-spinner"><Spinner animation="border" role="status" />Loading...</div>
      : <div className="App">
        <button type="button" onClick={handleRandomUser}>Randomize Yourself</button>
        <button type="button" onClick={handleRandomOpp}>Randomize Opponent</button>
        <button type="button" onClick={handleRandomize}>Randomize Both</button>
        <form action="" onSubmit={onSubmit}>
          <select onChange={(e) => filterCard1(e)}>
            {Cards.map((item) => <option id='card1' key={item} value={item.cardId}>{item.name}</option>)}
          </select>
          <select onChange={(e) => filterCard2(e)}>
            {Cards.map((item) => <option id='card2' key={item} value={item.cardId}>{item.name}</option>)}
          </select>
          <input type="Submit" value="Battle!" />
        </form>
        <div id='imgs'>
          {Card1.map((object) => <img id='c1' src={object.img} />)}
          {isEmpty ? <></> :
            <img src="https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png" width="200" />/*temp versus img*/}
          {Card2.map((object) => <img id='c2' src={object.img} />)}
        </div>
        <div class="result">
          Result
        </div>
        <div class="winner-result">
          {Result}
        </div>
      </div>
  );
}

export default App;
