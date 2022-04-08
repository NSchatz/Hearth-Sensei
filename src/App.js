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
      headers: {'Content-Type': 'application/json'}
    }
    ).then(res => res.json()).then(data => setCards(data));
  }, []);

  function onChange1(e){
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val == e.target.value));
    setCard1(filtered);
  }

  function onChange2(e){
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val == e.target.value));
    setCard2(filtered);
  }

  function onSubmit(event){
    event.preventDefault();
    if(Card1.map((object) =>  object.attack)>Card2.map((object) =>  object.attack)){
      setResult('card1.attack>card2.attack')
    }else{
      setResult('card2.attack>card1.attack')
    }
  }

  return (
    <div className="App">
      <form action="" onSubmit={onSubmit}>
        <select onChange={(e) => onChange1(e)}>
          {Cards.map((item)=> <option id='card1' key={item} value={ item.cardId }>{ item.name }</option>)}
        </select>
        <select onChange={(e) => onChange2(e)}>
         {Cards.map((item)=> <option id='card2' key={item} value={ item.cardId }>{ item.name }</option>)}
        </select>
        <input type="Submit"/>
      </form>
      <div></div>
      <div id='imgs'>
      {Card1.map((object) =>  <img id='c1' src={object.img}/>)}
      vs
      {Card2.map((object) =>  <img id='c2' src={object.img}/>)}
      </div>
      <div>
        {Result}
      </div>
    </div>
  );
}

export default App;
