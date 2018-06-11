import React from 'react';
import {Link} from 'react-router';
import Setting from './Setting.js';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {settingDisplay: false};
    }

    settingToggle() {
        this.setState({settingDisplay: !this.state.settingDisplay});
    }

    onOffSetting(status) {
        this.setState({settingDisplay: status});
    }

    render() {
        var setting = null;
        if (this.state.settingDisplay) setting =  <Setting onOffSetting={this.onOffSetting.bind(this)}/>;
        return (

            <div className="header">

                <div className="online"><i className="fas fa-circle"></i> Nguyễn Trung Tính</div>
                <div className="tools">
                    <Link to={'/video-chat'}><i className="fas fa-video"></i></Link>
                    <Link to={'/sound-chat'}><i className="fas fa-phone"></i></Link>
                    <i className="fas fa-cog" onClick={this.settingToggle.bind(this)}></i>
                    <Link to={'/minimize'}><i className="fas fa-times"></i></Link>
                </div>
                {setting}

            </div>
        );
    }
}

export default Header;