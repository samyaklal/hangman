import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { randomWord } from "./words";

import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

class App extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);

    this.state = {
      nWrong: 0,
      guessed: new Set(),
      // answer: "apple"
      answer: randomWord(),
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // reset the game and put things in default
  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    // deconstructor
    const { answer, guessed } = this.state;

    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const { handleGuess } = this;
    const { guessed } = this.state;

    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const { images, maxWrong } = this.props;

    let alternateText = `${this.state.nWrong} wrong guesses`;
    // const { guessedWord, generateButtons } = this;

    return (
      <div className="App">
        <div className="Hangman">
          <img src={images[nWrong]} alt={alternateText} />
          <p>Number Wrong: {nWrong}</p>

          {answer === this.guessedWord().join("") ? (
            <p>You WIN!</p>
          ) : nWrong === maxWrong ? (
            <div>
              <p>YOU LOSE </p>
              <p>Correct Word is: {answer}</p>
            </div>
          ) : (
            <div>
              <p className="Hangman-word">{this.guessedWord()}</p>
              <p className="Hangman-btns">{this.generateButtons()}</p>
            </div>
          )}

          <button id="reset" onClick={this.resetGame}>
            Reset Game
          </button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
