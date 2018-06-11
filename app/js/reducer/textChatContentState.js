var myState = [
    {
        id: 0,
        style: 'asking',
        content: 'Giá xăng, dầu bán lẻ trong nước đồng loạt tăng 500-678 đồng một lít, kg tuỳ loại từ chiều 23/5, theo thông báo của liên Bộ Công Thương - Tài chính.\n' +
        '\n',
        time: '12:00'
    },
    {
        id: 1,
        style: 'answer',
        content: 'Mỗi lít xăng E5 RON92 tăng 500 đồng, xăng RON 95 tăng 600 đồng;',
        time: '13:00'
    },
    {
        id: 2,
        style: 'answer',
        content: 'Mỗi lít xăng',
        time: '13:00'
    },
    {
        id: 3,
        style: 'answer',
        content: 'Giá xăng, dầu bán lẻ trong nước đồng loạt tăng 500-678 đồng một lít, kg tuỳ loại từ chiều 23/5, theo thông báo của liên Bộ Công Thương - Tài chính.',
        time: '13:00'
    }

];

var textChatContentState = (state = myState, action) => {
    switch (action.type) {
        case 'TEXT_CHAT_CONTENT':
            return [...state,action.content];
        default:
            return state;
    }
};

export default textChatContentState;