import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userOnlineState from './userOnlineReducer.js';
import videoConnectingStatus from './videoConnectingStatusReducer.js';
import soundConnectingStatus from './soundConnectingStatusReducer.js';
import microStatusState from './microStatusReducer.js';
import textChatContentState from './textChatContentState.js'
import ownerVideoStatusState from 'ownerVideoStatusState';
import onlineListDisplayState from './onlineListDisplayState.js';

// Combine reducer
var reducer = combineReducers(
    {
        userOnlineState,
        videoConnectingStatus,
        soundConnectingStatus,
        microStatusState,
        textChatContentState,
        ownerVideoStatusState,
        onlineListDisplayState,
        routing: routerReducer
    }
);

export default reducer;

