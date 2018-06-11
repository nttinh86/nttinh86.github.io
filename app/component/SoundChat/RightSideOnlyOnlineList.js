import React from "react";
var {connect} = require('react-redux');
import OnlineList from '../Layout/OnlineList.js';
import OwnerCamera from '../VideoChat/OwnerCamera.js';

class RightSideOnlyOnlineList extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="right-side">
                <OnlineList />
            </div>
        );
    };
}

// export default RightSide;
export default connect()(RightSideOnlyOnlineList);