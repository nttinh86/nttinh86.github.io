import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {microStatus: true};
    }

    toogleMicroStatus() {
        this.state.microStatus = !this.state.microStatus;
        this.setState(this.state);
    }

    render() {
        return (
            <div className="footer">
                <div className="items camera-off"></div>
                <Link to={'/text-chat'}> <div className="items phone"></div></Link>
                <div className={this.state.microStatus === true ? "items microphone" : "items microphone-off"}
                     onClick={this.toogleMicroStatus.bind(this)}></div>
            </div>
        );
    }
}

export default Footer;