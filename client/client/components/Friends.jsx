import React from 'react';
import Friend from "./Friend.jsx";

export default class Friends extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }



    render() {
        return (
            <div className="friends">
                {this.props.friends.map(friend => {
                    return (
                        <Friend key={friend.id} friend={friend} />
                    )
                })
                }
            </div>
        );
    }
}