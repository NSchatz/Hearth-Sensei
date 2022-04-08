import './App.css';
import React, { useState, useEffect } from "react";
let cards = '/getcards'
let getcardinfo = '/getcardinfo'

function App() {
  const [Cards, setCards] = useState([]);
  const [Card1, setCard1] = useState([]);
  const [Card2, setCard2] = useState([]);
  const [Output, setOutput] = useState('');
  useEffect(() => {
    fetch(cards, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
    ).then(res => res.json()).then(data => setCards(data));
  }, []);
  console.log(Cards)

  function onChange1(e){
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val == e.target.value));
    setCard1(filtered);
    console.log(Card1);
  }
  function onChange2(e){
    const filtered = Cards.filter(entry => Object.values(entry).some(val => typeof val === "string" && val == e.target.value));
    setCard2(filtered);
    console.log(Card2);
  }
  function onSubmit(event){
    event.preventDefault();
    console.log("refresh prevented");
    var card1 = document.getElementById("Card1");
    var card2 = document.getElementById("Card2");
    console.log(Card1);
    console.log(Card2.img);
    console.log(Card2);
    console.log(Card2.img);
    if(Card1.map((object) =>  object.attack)>Card2.map((object) =>  object.attack)){
      setOutput('winner')
    }else{
      setOutput('none')
    }
    console.log(Output)
  }

  return (
    <div className="App">
      <form action="" onSubmit={onSubmit}>
        <select name="1" id="" onChange={(e) => onChange1(e)}>
          {Cards.map((item)=> <option id='card1' key={item} value={ item.cardId }>{ item.name }</option>)}
        </select>
        <select name="2" id="" onChange={(e) => onChange2(e)}>
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
        {Output}
      </div>
    </div>
  );
}

export default App;
