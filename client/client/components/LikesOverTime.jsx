import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import _ from 'lodash';
import store from "../store.jsx"
import config from "../config.json";
import moment from "moment";

export default class LikesOverTime extends React.Component {
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
        const dateFormat = 'YYYY-MM-DD';
        const startDate = moment().subtract(1, 'day').format(dateFormat);
        const endDate = moment().format(dateFormat);
        const intervalInHours = 6;
        const url = `${config.serverUrl}/user/likesByDateRange?userId=${viewUserId}&startDate=${startDate}&endDate=${endDate}&intervalInHours=${intervalInHours}`;

        axios.get(url)
            .then((response) => {
                const likesData = _.map(this.props.likes, (like) => {
                    const likeData = this.CreateLikeItemData(response.data, like, intervalInHours);
                    return {
                        fill: false,
                        label: like.content,
                        backgroundColor: like.color,
                        borderColor: like.color,
                        data: likeData
                    };
                });
                this.setState({
                    data: likesData
                });
            });
    }

    CreateLikeItemData(responseData, like, intervalInHours) {
        const intervals = 24 / intervalInHours
        const data = [];
        for (let i = 0; i < intervals; i++) {
            const matchingLikes = _.find(responseData, {
                '_id': {
                    'likeId': like._id,
                    'interval': i * intervalInHours
                }
            });
            const itemCount = matchingLikes ? matchingLikes.count : 0;
            data.push(itemCount);
        }
        return data;
    }

    renderGraph() {
        var ctx = this.refs.chart.getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["morning", "noon", "afternoon", "evening"],
                datasets: this.state.data
            },

            // Configuration options go here
            options: {}
        });
    }

    render() {
        return (
            <div>
                Likes Today:
                <canvas ref="chart"></canvas>
            </div>
        );
    }
}