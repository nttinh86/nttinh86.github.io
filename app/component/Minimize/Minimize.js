import React from 'react';
import {Link} from 'react-router';

class Minimize extends React.Component
{
    render() {
        return (
            <Link to="/">
            <div className="minimize">
                <div className="online">
                    <i className="fas fa-circle online-circle"></i>
                    Nguyễn Trung Tính
                    <Link to="/online-support"><i className="fas fa-times closing"></i></Link>
                </div>
            </div>
            </Link>
        );
    }
}

export default Minimize;