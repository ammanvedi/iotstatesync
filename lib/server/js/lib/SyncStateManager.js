const Server = require( './SocketServer.js' );

/* Main Export from the library, will handle registration of devices and clients and mediating state updates between the two */
class SyncStateManager {

    /**
     * Create an insatnce that will manage state between the device and clients across the network
     * @param  {ServerOptions} serverSettings the seetings to use with the socjetServer
     */
    constructor( serverSettings = {} ) {

        this.server = new Server( serverSettings );
        this.stateUpdateQueue = [];
        console.log( 'SyncStateManager created...' );
    }
}

module.exports = SyncStateManager;
