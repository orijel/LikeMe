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
            user: null
        }
    }

    componentDidMount() {
    }

    facebookResponse(response) {
        if (response.userID) {
            this.setState({
                isLoggedIn: true,
                user: response
            });
        }
    }

    getContent() {
        if (this.state.isLoggedIn) {
            return (<MainPage user={this.state.user} />);
        }
        else return (<FacebookLogin
            appId="501738386867737"
            autoLoad={true}
            fields="name,email,picture"
            scope="user_friends"
            callback={this.facebookResponse.bind(this)} />);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.getContent()}
            </div>);
    }
}