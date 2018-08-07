export const CONSTANTS = Object.freeze( {
    WS_EVENT: Object.freeze( {
        REQUEST: 'request',
        CLOSE: 'close',
        MESSAGE: 'message',
        ERROR: 'error',
        CONNECT: 'connect'
    } ),
    WS_MESSAGE_TYPE: Object.freeze( {
        UTF_8: 'utf8'
    } ),
    WS_ACTIONS: Object.freeze( {
        REGISTER: 'register',
        REGISTER_RESPONSE: 'register-response',
        DEVICE_STATE_UPDATE: 'device-state-update',
        CLIENT_STATE_UPDATE: 'client-state-update'
    } ),
    WS_CLIENT_TYPE: Object.freeze( {
        CLIENT: 'client',
        DEVICE: 'device'
    } )
} )
