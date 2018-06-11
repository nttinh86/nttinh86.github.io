function iceServer() {
    return [
        {
            url: "stun:139.162.58.82:3478?transport=tcp"
        },
        {
            url: "turn:139.162.58.82:3478?transport=tcp",
            username: "nttinh86",
            credential: "123456"
        }
    ];
}

export default iceServer;
