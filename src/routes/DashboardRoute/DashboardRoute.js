import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import TokenService from "../../services/token-service";
import Word from "../../components/Word/Word";
import { Link } from "react-router-dom";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  static contextType = UserContext;
  state = {
    language: null,
    words: null,
    totalScore: null,
  };
  generateWordList = (list) => {
    if (!list) {
      return null;
    }
    let i = 0;
    let words = list.map((x) => {
      return <Word key={i++} word={x} />;
    });
    return words;
  };
  componentDidMount() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => (res = res.json()))
      .then((res) => {
        this.setState({ language: res.language.name });
        this.setState({ words: res.words });
        this.setState({ totalScore: res.language.total_score });
      });
  }
  render() {
    return (
      <section className="dashboard">
        <h2>{this.state.language}</h2>
        <p>Total score is: {this.state.totalScore}</p>
        <h3>Words to practice</h3>
        <ul>{this.generateWordList(this.state.words)}</ul>

        <Link to="learn">
          <button type="button">Let's Learn!</button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
