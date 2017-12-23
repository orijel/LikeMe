import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import _ from 'lodash';
import store from "../store.jsx"
import config from "../config.json";

export default class AllLikes extends React.Component {
    constructor(props) {
        super(props);
        var storeState = store.getState();
        this.updateUserGraph(storeState.viewUserId);
        store.subscribe(() => {
            const storeState = store.getState();
            this.updateUserGraph(storeState.viewUserId);
        });
        this.state = {
            data: []
        };
    }

    componentDidUpdate() {
        this.renderGraph()
    }

    updateUserGraph(viewUserId) {
        axios.get(`${config.serverUrl}/user/allLikes?userId=${viewUserId}`).then((response) => {
            const likesData = this.props.likes.map((like) => {
                const matchingLikeData = _.find(response.data, {
                    _id: like._id
                });
                return matchingLikeData ? matchingLikeData.count : 0;
            });
            this.setState({
                data: likesData
            });
        });
    }

    renderGraph() {
        var ctx = this.refs.chart.getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: this.props.likes.map((like) => {
                    return like.content;
                }),
                datasets: [{
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.state.data
                }]
            },

            // Configuration options go here
            options: { legend: { display: false } }
        });
    }

    render() {
        return (
            <div>
                Likes All Times:
                <canvas ref="chart"></canvas>
            </div>
        );
    }
}