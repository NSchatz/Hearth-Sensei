import './App.css';
import React, { useState, useEffect } from "react";
let cards = '/getcards'
let getcardinfo = '/getcardinfo'

function App() {
  const [Cards, setCards] = useState([]);
  const [Card1, setCard1] = useState([]);
  const [Card2, setCard2] = useState([]);
  const [Result, setResult] = useState('');
  useEffect(() => {
    fetch(cards, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(res => res.json()).then(data => setCards(data));
  }, []);

  function onChange1(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard1(filtered);
  }
  function onChange2(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard2(filtered);
  }
  function onSubmit(event) {
    event.preventDefault();
    let cardAttack1, cardAttack2;
    Card1.map((object) => cardAttack1 = object.attack);
    Card2.map((object) => cardAttack2 = object.attack);
    if (cardAttack1 > cardAttack2) {
      setResult('You win!');
    } if (cardAttack1 < cardAttack2) {
      setResult('Opponent wins!');
    } if (cardAttack1 === cardAttack2) {
      (setResult('It\'s a tie!'));
    }
  }
  function randomizer() {
    const randomCard = Cards[Math.floor(Math.random() * Cards.length)];
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
    let randomCard1 = randomizer();
    let randomCard2 = randomizer();
    setCard1(randomCard1);
    setCard2(randomCard2);
  }

  return (
    <div className="App">
      <button type="button" onClick={handleRandomUser}>Randomize Yourself</button>
      <button type="button" onClick={handleRandomOpp}>Randomize Opponent</button>
      <button type="button" onClick={handleRandomize}>Randomize Both</button>
      <form action="" onSubmit={onSubmit} value="Battle!">
        <select onChange={(e) => onChange1(e)}>
          {Cards.map((item) => <option id='card1' key={item} value={item.cardId}>{item.name}</option>)}
        </select>
        <select onChange={(e) => onChange2(e)}>
          {Cards.map((item) => <option id='card2' key={item} value={item.cardId}>{item.name}</option>)}
        </select>
        <input type="Submit" />
      </form>
      <div></div>
      <div id='imgs'>
        {Card1.map((object) => <img id='c1' src={object.img} />)}
        vs
        {Card2.map((object) => <img id='c2' src={object.img} />)}
      </div>
      <div>
        {Result}
      </div>
    </div>
  );
}

export default App;
