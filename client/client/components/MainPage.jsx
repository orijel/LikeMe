import { ACTION, changeViewUser } from '../actions/UserActions.jsx';
import React from 'react';
import Chart from 'chart.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Friends from "./Friends.jsx";
import AllLikes from "./AllLikes.jsx";
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

    generateRandomArray() {
        var array = [];
        for (var i = 0; i < 4; i++) {
            array.push(Math.floor((Math.random() * 100)));
        }
        return array;
    }

    generateRandomNumber() {
        return Math.floor((Math.random() * 100));
    }

    componentDidMount() {
        this.updateViewUser(this.state.viewUserId);
        var ctx = this.refs.firstChart.getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["morning", "noon", "afternoon", "evening"],
                datasets: [{
                    fill: false,
                    label: "😂",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.generateRandomArray(),
                },
                {
                    fill: false,
                    label: "😎",
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                    data: this.generateRandomArray(),
                }, {
                    fill: false,
                    label: "🤓",
                    backgroundColor: 'rgb(255, 255, 0)',
                    borderColor: 'rgb(255, 255, 0)',
                    data: this.generateRandomArray(),
                }, {
                    fill: false,
                    label: "😇",
                    backgroundColor: 'rgb(0, 102, 102)',
                    borderColor: 'rgb(0, 102, 102)',
                    data: this.generateRandomArray(),
                }, {
                    fill: false,
                    label: "😘",
                    backgroundColor: 'rgb(204, 0, 153)',
                    borderColor: 'rgb(204, 0, 153)',
                    data: this.generateRandomArray(),
                }]
            },

            // Configuration options go here
            options: {}
        });
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
                <div>
                    Likes Today:
                    <canvas ref="firstChart"></canvas>
                    <AllLikes likes={this.state.likes} />
                    {this.renderFriends()}
                </div>
            </div>);
    }
}