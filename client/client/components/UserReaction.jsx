import React from 'react';
import ReactTooltip from 'react-tooltip'
import store from "../store.jsx"
import { updateLikes } from "../actions/UserActions.jsx";
import axios from "axios";
import config from "../config.json";
import moment from "moment"

export default class UserReaction extends React.Component {
    constructor(props) {
        super(props);
        var storeState = store.getState();
        this.updateReaction(storeState.loggedInUser.userId, storeState.viewUserId);
        this.storeSubscribtion = store.subscribe(() => {
            const storeState = store.getState();
            this.updateReaction(storeState.loggedInUser.userId, storeState.viewUserId);
        });
        this.state = {
            isEnabled: true,
            isLoggedInUser: storeState.loggedInUser.userId === storeState.viewUserId
        };
    }

    updateReaction(userId, viewUserId) {
        const fromDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
        const url = `${config.serverUrl}/user/reaction?userId=${userId}&targetUserId=${viewUserId}&likeId=${this.props.like._id}&fromDate=${fromDate}`;
        axios.get(url).then((response) => {
            const reactions = response.data;
            const isEnabled = reactions.length == 0;
            this.setState({
                isEnabled,
                isLoggedInUser: userId === viewUserId
            });
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.storeSubscribtion();
    }

    renderReactionButton() {
        if (this.state.isLoggedInUser) {
            return (
                <button type="button" className="btn btn-light" style={{ cursor: 'initial' }} data-tip={this.props.like.description}>
                    {this.props.like.content}
                    <ReactTooltip />
                </button>
            )
        }
        if (this.state.isEnabled) {
            return (
                <button type="button" className="btn btn-primary" data-tip={this.props.like.description} onClick={this.onReactionClicked.bind(this)}>
                    {this.props.like.content} +1
                    <ReactTooltip />
                </button>);
        } else {
            return (
                <button type="button" className="btn btn-primary" disabled data-tip={this.props.like.description}>
                    {this.props.like.content} +1
                    <ReactTooltip />
                </button>);
        }
    }

    render() {
        return (
            this.renderReactionButton()
        );
    }

    onReactionClicked() {
        this.setState({
            isEnabled: false
        });
        const storeState = store.getState();
        const url = `${config.serverUrl}/user/like`
        axios.post(url, {
            executingUserId: storeState.loggedInUser.userId,
            targetUserId: storeState.viewUserId,
            likeId: this.props.like._id
        }).then(() => {
            store.dispatch(updateLikes());
        });
    }
}