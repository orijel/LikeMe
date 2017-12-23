import { ACTION, changeViewUser } from '../actions/UserActions.jsx';
import React from 'react';
import Chart from 'chart.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Friends from "./Friends.jsx";
import AllLikes from "./AllLikes.jsx";
import LikesOverTime from "./LikesOverTime.jsx";
import UserReactions from "./UserReactions.jsx";
import store from "../store.jsx";
import config from "../config.json";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        const self = this;
        axios.get(`${config.serverUrl}/like`).then((likes) => {
            self.setState({
                likes: likes.data
            });
        });

        var storeState = store.getState();
        store.subscribe(() => {
            const storeState = store.getState();
            this.updateViewUser(storeState.viewUserId);
        });
        this.state = {
            userId: storeState.loggedInUser.userId,
            userName: storeState.loggedInUser.userName,
            userPicture: storeState.loggedInUser.userPicture,
            viewUserId: storeState.viewUserId,
            viewUserName: storeState.loggedInUser.userName,
            viewUserPicture: storeState.loggedInUser.userPicture,
            friends: [],
            likes: []
        };
    }

    updateViewUser(viewUserId) {
        FB.api(`/${viewUserId}?fields=id,picture,name,friends`, 'GET', {}, (response) => {
            this.setState({
                viewUserId: viewUserId,
                viewUserName: response.name,
                viewUserPicture: response.picture.data.url,
                friends: response.friends.data
            });
        });
    }

    componentDidMount() {
        this.updateViewUser(this.state.viewUserId);
    }

    navigateToMyProfile() {
        store.dispatch(changeViewUser(this.state.userId));
    }

    renderFriends() {
        if (this.state.friends.length > 0) {
            return (
                <Friends friends={this.state.friends} />
            )
        }
    }

    renderReactions() {
        if (this.state.viewUserId !== this.state.userId) {
            return (<UserReactions likes={this.state.likes} />);
        }
    }

    render() {
        return (
            <div>
                <div style={{ background: 'grey' }} onClick={this.navigateToMyProfile.bind(this)}>
                    <img src={this.state.userPicture} />
                    <span>
                        {this.state.userName}
                    </span>
                </div>
                <div>
                    <img src={this.state.viewUserPicture} />
                    <span>
                        {this.state.viewUserName}
                    </span>
                </div>
                {this.renderReactions()}
                <div>
                    <LikesOverTime likes={this.state.likes} />
                    <AllLikes likes={this.state.likes} />
                    {this.renderFriends()}
                </div>
            </div>);
    }
}