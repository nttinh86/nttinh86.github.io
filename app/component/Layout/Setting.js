import React from 'react';

class Setting extends React.Component
{
    constructor(props) {
        super(props);
    }

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
        var {onOffSetting} = this.props;
        onOffSetting(false);
    }

    clickItem() {
        alert('Click item');
    }

    render() {
       return(
            <div className='setting' ref={node => this.node = node}>
                <div className="item" onClick={this.clickItem.bind(this)}>Đánh gía nhân viên</div>
                <div className="line" ></div>
                <div className="item" onClick={this.clickItem.bind(this)}>Báo cáo vi phạm</div>
                <div className="line"></div>
                <div className="item" onClick={this.clickItem.bind(this)}>Báo cáo chất lượng chat</div>
                <div className="line" onClick={this.clickItem.bind(this)}></div>
                <div className="item">Báo cáo sự cố</div>
            </div>
        );
    };
}

export default Setting;