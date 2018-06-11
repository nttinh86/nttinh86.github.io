import React from 'react';
import {connect} from 'react-redux';
import ContentItem from './ContentItem.js';

class Content extends React.Component
{
    scrollToBottom(id) {
        var chatting = document.getElementById(id);
        chatting.scrollTop = chatting.scrollHeight;
    }

    componentDidMount() {
        this.scrollToBottom('chatting');
    }

    componentDidUpdate() {
        this.scrollToBottom('chatting');
    }

    render() {
        var {textChatContentState} = this.props;
        return (
            <div className="chatting" id="chatting">
                {
                    textChatContentState.map((data) => {
                        return <ContentItem key={data.id} data={data}/>
                    })
                }
            </div>
        );
    };
}

export default connect(function(state) {
    return { textChatContentState : state.textChatContentState };
})(Content);