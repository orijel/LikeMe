import React from 'react';
import Chart from 'chart.js'
import FacebookLogin from 'react-facebook-login';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom';
import { browserHistory, Redirect } from "react-router";
import MainPage from "./MainPage.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: null
    }
    console.log('hi app');
  }

  componentDidMount() {
    console.log('hi app');
  }

  facebookResponse(response) {
    console.log(this);
    if (response.userID) {
      this.setState({
        isLoggedIn: true,
        userId: response.userID
      });
    }
  }

  getContent() {
    if (this.state.isLoggedIn) {
      return (<MainPage />);
    }
    else return (<FacebookLogin
      appId="501738386867737"
      autoLoad={true}
      fields="name,email,picture"
      scope="read_custom_friendlists"
      callback={this.facebookResponse.bind(this)} />);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.getContent()}
      </div>);
  }
}