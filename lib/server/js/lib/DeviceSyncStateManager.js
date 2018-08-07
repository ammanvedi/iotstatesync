const SocketClient = require( './SocketClient.js' );
const CONSTANTS = require( './Constants.js' );

const INITIAL_STATE = {
    hello: 'world',
    a: 1,
    b: 2
}

/* This class handles sending state and receiveing new state. Its abstracts the websocket implementation */
class DeviceSyncStateManager {

    constructor( initialState = INITIAL_STATE ) {

        this.socket = new SocketClient( {
            onConnected: this.onConnected.bind( this ),
            onRegister: this.onRegister.bind( this ),
            onReady: this.onReady.bind( this )
        } );
        this.state = initialState;
        this.connectionState = CONSTANTS.DEVICE_CONNECTION_STATE.DISCONNECTED;
    }

    onConnected() {
        this.connectionState = CONSTANTS.DEVICE_CONNECTION_STATE.CONNECTED;
    }

    onRegister() {
        this.socket.sendData( {
            action: CONSTANTS.WS_ACTIONS.DEVICE_INITIAL_STATE,
            type: CONSTANTS.WS_CLIENT_TYPE.DEVICE,
            initialState: this.state
        } );
    }

    onReady() {
        console.log( 'Device is now ready for state updates' );
        this.connectionState = CONSTANTS.DEVICE_CONNECTION_STATE.READY;
    }

    updateState( newState ) {

        if( this.connectionState !== CONSTANTS.DEVICE_CONNECTION_STATE.READY ) {
            console.log( 'State update called but the device is not ready yet its state is', this.connectionState );
            return;
        }

        this.socket.sendData( {
            action: CONSTANTS.WS_ACTIONS.DEVICE_STATE_UPDATE,
            type: CONSTANTS.WS_CLIENT_TYPE.DEVICE,
            newState
        } );
    }
}

module.exports = DeviceSyncStateManager;
