import React from 'react';
import {connect} from 'react-redux';
import {contentState} from 'textChatAction';
import date from 'date-and-time';
import Option from './Option.js';


class Editor extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {'display':false};
    }

    clickHandle() {
        if (this.refs.txtInput.value.trim() === '') return;

        var {dispatch, textChatContentState} = this.props;
        var addAsking = {
            id: textChatContentState.length,
            style: 'asking',
            content: this.refs.txtInput.value.trim(),
            time: date.format(new Date(), 'HH:mm:ss DD/MM/YY')
        };

        dispatch(contentState(addAsking));

        this.refs.txtInput.value = '';
    }

    keyPressHandle(e) {
        if (e.key == 'Enter') {
            this.clickHandle();
        }
    }

    toggleDisplayOption() {
        this.setState({display: !this.state.display});
    }

    onOffDisplayOption(status) {
        this.setState({display: status});
    }

    render() {
        var option = null;
        if (this.state.display) {
            option = <Option onOffDisplayOption={this.onOffDisplayOption.bind(this)}/>;
        }
        return (
            <div className="editor">
                {option}
                <div className="items option"><i className="fas fa-plus" onClick={this.toggleDisplayOption.bind(this)}></i></div>
                <input className="items my-input" type="text"
                       placeholder="Nhập nội dung..."
                       onKeyPress={this.keyPressHandle.bind(this)}
                       ref="txtInput"
                />
                <div className="items send" onClick={this.clickHandle.bind(this)}></div>
            </div>
        );
    };
}

export default connect(function(state) {
    return {textChatContentState: state.textChatContentState};
})(Editor);