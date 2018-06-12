function iceServer() {
    return [
        {
            urls: "stun:139.162.58.82:3478?transport=udp"
        },
        {
            urls: "turn:139.162.58.82:3478?transport=udp",
            username: "nttinh86",
            credential: "123456"
        }
    ];
}

export default iceServer;
