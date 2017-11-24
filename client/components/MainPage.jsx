import React from 'react';
import Chart from 'chart.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Friends from "./Friends.jsx";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            friends: []
        };
        FB.api(`/${this.props.user.id}/friends`, 'GET', {}, (response) => {
            console.log(response.data)
            this.setState({
                friends: response.data
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

        var ctx = this.refs.secondChart.getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: ["😂", "😎", "🤓", "😇", "😘"],
                datasets: [{
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.generateRandomArray()
                }]
            },

            // Configuration options go here
            options: { legend: { display: false } }
        });
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
                <div>
                    <img src={this.props.user.picture.data.url} />
                    <span>
                        {this.props.user.name}
                    </span>
                </div>
                <div>
                    Likes Today:
                    <canvas ref="firstChart"></canvas>
                    Likes All Times:
                    <canvas ref="secondChart"></canvas>
                    {this.renderFriends()}

                </div>
            </div>);
    }
}