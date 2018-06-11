import React from 'react';
import Header from './Header.js';
import {addUserOnline, removeUserOnline, updateUserOnline} from "userOnlineAction";
import {connect} from 'react-redux';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUserOnline();
    }

    getUserOnline() {

        const {socket} = this.props;

        new Promise((resolve, reject) => {

            socket.on('server-send-user-out', (data) =>{
                const {dispatch} = this.props;
                dispatch(removeUserOnline(data.userOutId));
            });
            socket.on('server-send-update-user-online', (user) => {
                const {dispatch} = this.props;
                dispatch(updateUserOnline(user));
            });
            socket.on('server-send-user-online-list', (data) => {
                const {dispatch} = this.props;
                // data is array
                data.userOnline.map((user) => {
                    dispatch(addUserOnline(user));
                });
                resolve();
            });
            socket.emit('client-request-user-online-list');

        }).then(() => {

            socket.on('server-send-new-user', (newUser) => {
                console.log('newuser', newUser);
                const {dispatch} = this.props;
                dispatch(addUserOnline(newUser));
            });
            socket.emit('client-send-new-user');

        });
    }

    render() {
        return (
            <div className="container">
                <div className="main">
                    <Header/>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function(state) {
    return {userOnlineState: state.userOnlineState}
})(Main);