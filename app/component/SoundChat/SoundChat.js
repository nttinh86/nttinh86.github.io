import React from "react";
var {connect} = require('react-redux');
import RightSideOnlyOnlineList from './RightSideOnlyOnlineList.js';
import Footer from './Footer.js';
import SoundConnect from '../SoundChat/SoundConnect';

class SoundChat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <RightSideOnlyOnlineList />
                <SoundConnect/>
                <Footer />
            </div>
        );
    }
}


// export default VideoCall;
export default connect()(SoundChat);