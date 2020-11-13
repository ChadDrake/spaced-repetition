import React, { Component } from "react";

export default class Word extends Component {
  render() {
    return (
      <li>
        <h4>{this.props.word.original}</h4>
        <p>Correct answer count: {this.props.word.correct_count}</p>
        <p>Incorrect answer count: {this.props.word.incorrect_count}</p>
      </li>
    );
  }
}
