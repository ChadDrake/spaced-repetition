import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span className="name">{this.context.user.name}</span>
        <nav className="nav">
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="nav">
        <div>
          <Link to="/login">Login</Link>
        </div>{" "}
        <div>
          <Link to="/register">Sign up</Link>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <header className="header">
        <h1>
          <Link to="/">Spaced Repetition</Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
