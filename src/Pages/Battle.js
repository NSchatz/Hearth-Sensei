import './Battle.css';
import Image1 from "../images/blankcard1.png"; /* eslint-disable */
import React, { useState, useEffect, Image } from "react"; /* eslint-disable */
import { Spinner, Container } from 'react-bootstrap'; /* eslint-disable */
import { Link } from 'react-router-dom' /* eslint-disable */


let cards = '/getcards'

function Battle() {
  const [Cards, setCards] = useState([]);
  const [Card1, setCard1] = useState([]);
  const [Card2, setCard2] = useState([]);
  const [Result, setResult] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setisEmpty] = useState(true);
  const cardback = [{ "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/6c7389262b8a7057aafcf8d75e55f452250ccd8b4e2dfcfd01f1aa8f5f21b17d.png" }]


  useEffect(() => {
    fetch(cards, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
        setCard1(cardback)
        setCard2(cardback)
      });
  }, []); /* eslint-disable */

  function filterCard1(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard1(filtered);
  }
  function filterCard2(e) {
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val === e.target.value));
    setCard2(filtered);
    console.log(Card2)
  }

  function onSubmit(event) {
    event.preventDefault();
    let card1Name, card1Attack, card1Health, card2Name, card2Attack, card2Health, winner;
    // eslint-disable-next-line array-callback-return
    Card1.map((object) => {
      card1Attack = object.attack;
      card1Health = object.health;
      card1Name = object.name;
    });

    // eslint-disable-next-line array-callback-return
    Card2.map((object) => {
      card2Attack = object.attack;
      card2Health = object.health;
      card2Name = object.name;
    });

    if ((card1Health / card2Attack) > (card2Health / card1Attack)) {
      setResult('You win!');
      setisEmpty(false);
      winner = 'User';
    } else if ((card1Health / card2Attack) < (card2Health / card1Attack)) {
      setResult('Opponent wins!');
      setisEmpty(false);
      winner = 'Opponent';
    } else if ((card1Health / card2Attack) === (card2Health / card1Attack)) {
      setResult('Whoever goes first wins!');
      setisEmpty(false);
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
    isLoading ? <div className="Loading-spinner" class="center"><Spinner animation="border" role="status" /><br />Loading...</div>
      : <div className="Battle">
        <br />
        <button class="random-button" type="button" onClick={handleRandomUser}>Randomize Yourself</button>
        <button class="random-button" type="button" onClick={handleRandomOpp}>Randomize Opponent</button>
        <button class="random-button" type="button" onClick={handleRandomize}>Randomize Both</button>
        <form action="" onSubmit={onSubmit}>
          <select defaultValue={'DEFAULT'} class="input-boxes" onChange={(e) => filterCard1(e)}>
            <option value="DEFAULT">Please Select Your Card!</option>
            {Cards.map((item) => <option id='card1' key={item} value={item.cardId}>{item.name}</option>)}
          </select>
          <select defaultValue={'DEFAULT'} class="input-boxes" onChange={(e) => filterCard2(e)}>
            <option value="DEFAULT">Please Select Opponent's Card!</option>
            {Cards.map((item) => <option id='card2' key={item} value={item.cardId}>{item.name}</option>)}
          </select>
          <div id='imgs'>
            {Card1.map((object) => <img class='img' src={object.img} />)}
            <img src="https://www.freepnglogos.com/uploads/vs-png/vs-fire-icon-png-logo-Image-10.png" width="200" />
            {Card2.map((object) => <img class='img' src={object.img} />)}
          </div>
          <input class="battle-button" type="Submit" value="Battle!" />
        </form>

        {isEmpty ? <></> :
          <div>
            <div class="result">
              Result
            </div>
            <div class="winner-result">
              {Result}
            </div>
          </div>
        }



      </div>
  );
}

export default Battle;