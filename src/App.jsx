import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const App = () => (
  <>
    <div className="wrapper">
      <h1>Hangman</h1>
      <h2>Vanilla JavaScript Hangman Game</h2>
      <p>
        Use the alphabet below to guess the word, or click hint to get a clue.{" "}
      </p>
    </div>
    <div className="wrapper">
      <div id="buttons"></div>
      <p id="catagoryName"></p>
      <div id="hold"></div>
      <p id="mylives"></p>
      <p id="clue">Clue -</p>
      <canvas id="stickman">
        This Text will show if the Browser does NOT support HTML5 Canvas tag
      </canvas>
      <div className="container">
        <button id="hint">Hint</button>
        <button id="reset">Play again</button>
      </div>
    </div>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
