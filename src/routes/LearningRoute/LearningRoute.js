import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import TokenService from "../../services/token-service";
import Word from "../../components/Word/Word";
import { Link } from "react-router-dom";
import "./LearningRoute.css";
import LearnServices from "../../services/learn-api-services";
class LearningRoute extends Component {
  state = {
    word: null,
    totalScore: null,
    correct: null,
    incorrect: null,
    isCorrect: null,
    answer: null,
    guess: null,
    nextWord: null,
  };
  getWord = () => {
    LearnServices.getHead()
      .then((res) => (res = res.json()))
      .then((res) => {
        this.setState({ word: res.nextWord });
        this.setState({ totalScore: res.totalScore });
        this.setState({ correct: res.wordCorrectCount });
        this.setState({ incorrect: res.wordIncorrectCount });
      });
  };
  componentDidMount() {
    this.getWord();
  }
  handleGuess = (e) => {
    e.preventDefault();
    let { guess } = e.target;
    this.setState({ guess: guess.value });
    LearnServices.postGuess({ guess: guess.value }).then((res) => {
      this.setState({ isCorrect: res.isCorrect });
      this.setState({ totalScore: res.totalScore });
      this.setState({ answer: res.answer });
      this.setState({ nextWord: res.nextWord });
    });
  };
  handleNext = (e) => {
    e.preventDefault();
    this.getWord();
    this.setState({ isCorrect: null });
    this.setState((prevState) => ({ word: prevState.nextWord }));
    this.setState({ nextWord: null });
  };
  render() {
    if (this.state.isCorrect === true) {
      return (
        <div className="learning-route">
          <h2>You were correct! :D</h2>
          <p className="DisplayScore p">
            Your total score is: {this.state.totalScore}
          </p>
          <p className="DisplayFeedback">
            The correct translation for {this.state.word} was{" "}
            {this.state.answer} and you chose {this.state.guess}!
          </p>
          <button onClick={this.handleNext}>Try another word!</button>
        </div>
      );
    }
    if (this.state.isCorrect === false) {
      return (
        <div className="learning-route">
          <h2>Good try, but not quite right :(</h2>
          <p className="DisplayScore p">
            Your total score is: {this.state.totalScore}
          </p>
          <p className="DisplayFeedback">
            The correct translation for {this.state.word} was{" "}
            {this.state.answer} and you chose {this.state.guess}!
          </p>
          <button onClick={this.handleNext}>Try another word!</button>
        </div>
      );
    }
    return (
      <section className="learning-route">
        <h2>Translate the word:</h2>
        <span>{this.state.word}</span>
        <p className="DisplayScore p">
          Your total score is: {this.state.totalScore}
        </p>
        <form onSubmit={this.handleGuess}>
          <div className="form-field">
            <label htmlFor="guess">What's the translation for this word?</label>
          </div>
          <div className="form-field">
            <input type="text" id="guess" name="guess" required />
          </div>

          <div className="form-field">
            <button type="submit">Submit your answer</button>
          </div>
        </form>
        <p>You have answered this word correctly {this.state.correct} times.</p>
        <p>
          You have answered this word incorrectly {this.state.incorrect} times.
        </p>
      </section>
    );
  }
}

export default LearningRoute;
