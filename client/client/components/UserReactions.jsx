import React from 'react';
import UserReaction from "./UserReaction.jsx";

export default class UserReactions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="btn-group" role="group" style={{ marginTop: '30px' }}>
                {this.props.likes.map(like => {
                    return (
                        <UserReaction key={like._id} like={like} />
                    );
                })
                }
            </div>
        );
    }
}