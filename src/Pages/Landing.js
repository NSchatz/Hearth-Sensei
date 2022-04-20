import './Landing.css';
import React from "react";
import ChevronDown from '../images/chevron-down.png';
import CardBack from '../images/card-back.png';

function Landing() {

  return (
    <div className="Landing">
      <div className="TopLanding">
        <div className="WelcomeText">
          <h1>Welcome to Hearth-Sensei</h1>
          <p>Determine the strength of over hundreds of Hearthstone cards based on their raw stat numbers and share your results with other users.</p>
        </div>
        <a href="#about">
          <img src={ChevronDown} height={40} width={40} className="ChevronDown" />
        </a>
      </div>
      <section id="about" className="AboutSection">
        <div>
          <h1>About</h1>
          <p>Hearth-Sensei is an intuitive battle simulator that lets users simulate one-on-one battles of their favorite cards!
            You can choose from any Hearthstone card and determine which card will be victorious past the duration of the rounds it would take to select a winner.
            Our tool not only lets you simulate battles with existing cards, but you can adjust card stats to mimic scenarios where certain cards have been buffed or debuffed using our custom battles.
            All of this data is then stored in your profile, where you can view it for future reference and even see what others have tested.
          </p>
        </div>
        <img src={CardBack} height={400} className="CardBack" />
      </section>
      <section id="authors" className="AuthorsSection">
        <a href="https://github.com/NSchatz/Hearth-Sensei">
          <img src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"} height={150} width={150} className="GitHub" />
        </a>
        <div>
          <h1>Authors</h1>
          <p>Arteen Ghafourikia • Noah Schatz <br />
            Gerald Guerrero • Kevin Albino • Mark Ashworth
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
