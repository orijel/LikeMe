import React from 'react';
import ReactTooltip from 'react-tooltip'

export default class Friend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            name: props.friend.name
        }
        FB.api(`/${this.props.friend.id}/picture`, 'GET', {}, (response) => {
            this.setState({
                image: response.data.url
            })
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <img data-tip={this.state.name} src={this.state.image}/>
                <ReactTooltip />
            </div>
        );
    }
}