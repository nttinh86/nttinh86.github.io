import io from 'socket.io-client';
import {SOCKET_SERVER_URL} from "config";


function socketIoClient() {
    return io.connect(SOCKET_SERVER_URL);
}

export default socketIoClient;