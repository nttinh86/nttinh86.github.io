import React from 'react';
var {connect} = require('react-redux');
import OnlineList from '../Layout/OnlineList.js';
import Content from './Content.js';
import Editor from './Editor.js';

class TextChat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="right-side">
                   <OnlineList />
                </div>
                <Content/>
                <div className="footer">
                    <Editor/>
                </div>
            </div>
        );
    };
}

// export default TextChat;
export default connect()(TextChat);