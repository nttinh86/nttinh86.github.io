// import boostrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import boostrap
// import 'bootstrap';
// import scss
import '../scss/styles.scss';

// import reactjs
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

// route
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';
const history = syncHistoryWithStore(hashHistory, store);
//action
import {addUserOnline, removeUserOnline} from './action/userOnlineAction.js';
import videoConnectingStatusAction from './action/videoConnectingStatusAction.js';
import soundConnectingStatusAction from './action/soundConnectingStatusAction.js';

// store.dispatch(videoConnectingStatusAction('connecting'));
// store.dispatch(soundConnectingStatusAction('connecting'));
// store.dispatch(videoConnectingStatusAction('connected'));
// store.dispatch(soundConnectingStatusAction('connected'));

// import component
import Main from '../component/Layout/Main.js';
import VideoChat from '../component/VideoChat/VideoChat.js';
import TextChat from '../component/TextChat/TextChat.js';
import SoundChat from '../component/SoundChat/SoundChat.js'
import Minimize from '../component/Minimize/Minimize.js';
import OnlineSupport from '../component/Minimize/OnlineSupport.js';
import socketIoClient from "socketIoClient";
const socket = socketIoClient();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={(props) => {return (<Main {...props} socket={socket}/>)}}>
                <IndexRoute component={TextChat} />
                <Route path="video-chat" component={(props) => {return (<VideoChat {...props} socket={socket}/>)}}/>
                <Route path="sound-chat" component={SoundChat}/>
                <Route path="text-chat" component={TextChat}/>
            </Route>
            <Route path="minimize" component={Minimize}/>
            <Route path="online-support" component={OnlineSupport}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
