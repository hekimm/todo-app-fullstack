import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todos/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
  };

  setAuth = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.setState({ token, username });
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ token: null, username: null });
  };

  render() {
    const { token, username } = this.state;

    return (
      <Router>
        <Navbar username={username} logout={this.logout} />
        <div className="container mt-4">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                token ? (
                  <TodoList token={token} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={() =>
                token ? (
                  <Redirect to="/" />
                ) : (
                  <Login setAuth={this.setAuth} />
                )
              }
            />
            <Route
              path="/register"
              render={() =>
                token ? (
                  <Redirect to="/" />
                ) : (
                  <Register setAuth={this.setAuth} />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
