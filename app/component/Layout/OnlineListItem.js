import React from 'react';

class OnlineListItem extends React.Component
{
    constructor(props) {
        super(props);
    }

    call() {
        this.props.call(this.props.user);
    }

    render() {
        return (
            <li onClick={this.call.bind(this)}><i className = {this.props.user.status === 'enable' ? 'fas fa-circle i-blue' : 'fas fa-circle i-red'}></i> {this.props.user.name}</li>
        );
    }
}

export default OnlineListItem;