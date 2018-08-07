const SocketClient = require( '../SocketClient.js' );

/* This class handles sending state and receiveing new state. Its abstracts the websocket implementation */
class DeviceSyncStateManager {

    constructor( clientOptions ) {

        this.socket = new SocketClient( clientOptions );
    }

    updateState( update ) {

        this.socket.sendData( update );
    }
}

module.exports = DeviceSyncStateManager;
