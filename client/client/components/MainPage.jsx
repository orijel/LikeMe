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

    render() {
        return (
            <div>
                <h1 className="app-title">LikeMe</h1>
                <div className="profile-header my-profile-toolbar">
                    <img src={this.state.userPicture} onClick={this.navigateToMyProfile.bind(this)} />
                    <div className="user-name">
                        {this.state.userName}
                    </div>
                </div>
                <div className="profile-header display-user-toolbar">
                    <img src={this.state.viewUserPicture} />
                    <div className="user-name">
                        {this.state.viewUserName}
                    </div>
                </div>
                <UserReactions likes={this.state.likes} />
                <div>
                    <LikesOverTime likes={this.state.likes} />
                    <AllLikes likes={this.state.likes} />
                    {this.renderFriends()}
                </div>
            </div>);
    }
}