import Peer from 'simple-peer';
import iceServer from 'iceServer';

function myPeer(stream, initiator) {
   return new Peer({
       initiator: initiator,
       stream: stream,
       config: {iceServers: iceServer()},
       trickle: false,
   });
}

export default myPeer;