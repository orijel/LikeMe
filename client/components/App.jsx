import React from 'react';
import Chart from 'chart.js'
import FacebookLogin from 'react-facebook-login';

export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var ctx = this.refs.myChart.getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            // Configuration options go here
            options: {}
        });
    }
    responseFacebook(response) {
        console.log(response);
        FB.api(
            `/${response.id}/friends`,
            function (response) {
                if (response && !response.error) {
                    console.log(response);
                }
            }
        );

    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <FacebookLogin
                    appId=""
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
                <canvas ref="myChart" id="myChart"></canvas>
                <h1>Hello World</h1>
            </div>);
    }
}