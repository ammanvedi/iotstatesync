module.exports = {
    WS_EVENT: {
        REQUEST: 'request',
        CLOSE: 'close',
        MESSAGE: 'message',
        ERROR: 'error',
        CONNECT: 'connect'
    },
    WS_MESSAGE_TYPE: {
        UTF_8: 'utf8'
    },
    WS_ACTIONS: {
        REGISTER: 'register',
        REGISTER_RESPONSE: 'register-response',
        DEVICE_STATE_UPDATE: 'device-state-update',
        DEVICE_INITIAL_STATE: 'device-initial-state',
        SERVER_INITIAL_STATE_ACK: 'server-initial-state-ack'
    },
    WS_CLIENT_TYPE: {
        CLIENT: 'client',
        DEVICE: 'device'
    },
    DEVICE_CONNECTION_STATE: {
        DISCONNECTED: 'device-disconnected',
        CONNECTED: 'device-connected',
        // device is connected and has sent and confirmed the initial state
        READY: 'device-ready'
    },
    SERVER_STATE: {
        NO_DEVICE: 'server-no-device',
        DEVICE_CONNECTED: 'server-device-connected',
        READY: 'server-ready'
    }
}
