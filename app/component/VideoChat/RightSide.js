import React from "react";
import OnlineList from '../Layout/OnlineList.js';
import OwnerCamera from './OwnerCamera.js';

class RightSide extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="right-side">
                <OnlineList socket={this.props.socket} call={this.props.call}/>
                <OwnerCamera stream={this.props.stream}/>
            </div>
        );
    };
}

export default RightSide;