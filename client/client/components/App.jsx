import React from 'react';
import Chart from 'chart.js'
import FacebookLogin from 'react-facebook-login';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom';
import { browserHistory, Redirect } from "react-router";
import MainPage from "./MainPage.jsx";
import store from "../store.jsx";
import { loginWithUser } from "../actions/UserActions.jsx";
require('./styles.scss');

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
            store.dispatch(loginWithUser(response.id, response.name, response.picture.data.url))
            this.setState({
                isLoggedIn: true,
                user: response
            });
        }
    }

    getContent() {
        if (this.state.isLoggedIn) {
            return (<MainPage />);
        }
        else return (
            <div className="login-page">
                <div className="login-header">
                    <span>LikeMe 😇😂😘😎🤓</span>
                </div>
                <FacebookLogin
                    appId="501738386867737"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="user_friends"
                    callback={this.facebookResponse.bind(this)} />
            </div>);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.getContent()}
            </div>);
    }
}