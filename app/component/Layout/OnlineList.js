import React from "react";
var {connect} = require('react-redux');
import OnlineListItem from './OnlineListItem.js';
import {onlineListDisplayAction} from 'onlineListDisplayAction';


class OnlineList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.videoConnectingStatus === 'not-connection' && this.props.onlineListDisplayState === false) {
            // open online list
            // this.openOnlineList();
            this.toggleClose();
        }
    }

    handleClick = (e) => {
        if(this.node.contains(e.target)) {
            // Click inside
            return;
        }
        this.handleClickOutSide();
    };

    handleClickOutSide() {
        if (this.props.onlineListDisplayState) {
            const {dispatch} = this.props;
            dispatch(onlineListDisplayAction(false));
        }
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    closeOnlineListListener() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    toggleClose() {
        // if (this.props.videoConnectingStatus === 'connected') {
        //     alert('Đang thực hiện cuộc gọi, để chọn nhân viên khác vui lòng kết thúc cuộc gọi này!');
        //     return;
        // }
        const {dispatch} = this.props;
        dispatch(onlineListDisplayAction(!this.props.onlineListDisplayState));
    }

    render () {
        console.log('userOnlineList', this.props.userOnlineState);
        const onlineListItemComponent = this.props.userOnlineState.map((user) => {
            return <OnlineListItem key={user.id} user={user} call={this.props.call}/>
        });

        if (this.props.onlineListDisplayState) { // open online list
            this.closeOnlineListListener();
            return (
                <div className="online-list" ref={node => this.node = node}>
                    <i className="my-close fas fa-times" onClick={this.toggleClose.bind(this)} ></i>
                    <ul>
                        {onlineListItemComponent}
                    </ul>
                </div>
            );
        } else { // close online list
            return (
                <div className="online-list-close" onClick={this.toggleClose.bind(this)} ref={node => this.node = node}>
                    <i className="fas fa-chevron-left"></i>
                    <ul className="hide">
                        {onlineListItemComponent}
                    </ul>
                </div>
            );
        }
    };
}

export default connect(function(state){
    return {
        userOnlineState: state.userOnlineState,
        videoConnectingStatus: state.videoConnectingStatus,
        onlineListDisplayState: state.onlineListDisplayState
    }
})(OnlineList);