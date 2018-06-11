import React from 'react';

class Option extends React.Component
{
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            // Click inside
            return;
        }
        this.handleClickOutside();
    };

    handleClickOutside() {
      document.removeEventListener('mousedown', this.handleClick, false);
      var {onOffDisplayOption} = this.props;
        onOffDisplayOption(false);
    }

    clickItem() {
        alert('Click item');
        var {onOffDisplayOption} = this.props;
        onOffDisplayOption(false);
    }

    render() {
        return (
            <div className="option-open" ref={node => this.node = node}>
                <div className="item" onClick={this.clickItem.bind(this)}>Đính kèm file</div>
                <div className="line" onClick={this.clickItem.bind(this)}></div>
                <div className="item" onClick={this.clickItem.bind(this)}>Đính kèm hình</div>
            </div>
        );
    }
}

export default Option;