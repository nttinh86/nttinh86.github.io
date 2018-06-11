import React from 'react';
import {Link} from 'react-router';

class OnlineSupport extends React.Component
{
    render() {
        return (
            <Link to={"/"}>
            <div className="online-support">
                <div className="help">Hỗ trợ</div>
                <div class="logo-chat"></div>
            </div>
            </Link>
        );
    };
}

export default OnlineSupport;