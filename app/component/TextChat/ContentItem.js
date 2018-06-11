import React from 'react';

class ContentItem extends React.Component
{
    render() {
        var {data} = this.props;
        if (data.style == 'asking') {
            return (
                <div>
                    <div className={data.style}>
                        <div className="logo"></div>
                        <div className="content">{ data.content }</div>
                    </div>
                    <div className="time">{ data.time }</div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={data.style}>
                        <div className="content">{ data.content }</div>
                    </div>
                    <div className="time">{ data.time }</div>
                </div>
            );
        }

    };
}

export default ContentItem;