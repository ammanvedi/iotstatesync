const wss = require( 'websocket' ).server;
const http = require( 'http' );
const CONSTANTS = require( './Constants.js' );

/**
 * Define options for the socket server
 * @typedef {Object} ServerOptions
 * @property {Integer} [port=1337] the port to listen on
 */

const DEFAULT_OPTIONS = {
    port: 1337
};

/* Socket Server creates a server to listen on a port for client connections */
class SocketServer {
    /**
     * [constructor description]
     * @param  {ServerOptions} serverOptions options to start the server with
     */
    constructor( serverOptions ) {
        this.config = { ...DEFAULT_OPTIONS, ...serverOptions };
        this.clients = {
            [ CONSTANTS.WS_CLIENT_TYPE.CLIENT ]: [],
            [ CONSTANTS.WS_CLIENT_TYPE.DEVICE ]: []
        }
        this.state = {};
        this.connectionState = CONSTANTS.SERVER_STATE.NO_DEVICE;
        this.createWebServer();
        this.createWSServer();
    }

    handleServerRequest( request, response ) {
        // we are only using web sockets so we dont care about ttp requests
        // hence the empty function
    }

    createWebServer() {
        this.server = http.createServer( this.handleServerRequest );
        this.server.listen( this.config.port, () => {
            console.log( `Serving on port ${ this.config.port }` );
        } )
        .on( 'error', err => {
            console.log( err );
        } )
    }

    createWSServer() {
        this.WSServer = new wss( {
            httpServer: this.server
        } );

        this.WSServer.on( CONSTANTS.WS_EVENT.REQUEST, this.handleWSRequest.bind( this ) );
        this.WSServer.on( CONSTANTS.WS_EVENT.CLOSE, this.handleWSClose.bind( this ) );
    }

    handleWSClose( connection ) {
    }

    handleWSRequest( request ) {

        const connection = request.accept( null, request.origin );

        connection.on( CONSTANTS.WS_EVENT.MESSAGE, message => {

            if( message.type !== CONSTANTS.WS_MESSAGE_TYPE.UTF_8 ) {
                return;
            }

            let messageData = {};

            try {
                messageData = JSON.parse( message.utf8Data );
            } catch ( error ) {
                console.log( 'Server Error!! could not parse json payload', error, message );
                return;
            }


            switch( messageData.action ) {
                case CONSTANTS.WS_ACTIONS.REGISTER:
                    this.handleRegistration( connection, messageData.type );
                    break;
                case CONSTANTS.WS_ACTIONS.DEVICE_INITIAL_STATE:
                    this.setInitialState( messageData.initialState )
                    break;
            }
        } );
    }

    getDeviceConnection() {
        return this.clients[ CONSTANTS.WS_CLIENT_TYPE.DEVICE ][ 0 ];
    }

    sendToDevice( data ) {
        this.getDeviceConnection().sendUTF( JSON.stringify( data ) );
    }

    setInitialState( state ) {
        this.state = state;
        this.sendToDevice( {
            action: CONSTANTS.WS_ACTIONS.SERVER_INITIAL_STATE_ACK
        } )
    }

    handleRegistration( connection, type ) {
        console.log( 'Sending registration response...', type );
        this.clients[ type ].push( connection );
        connection.sendUTF( JSON.stringify( {
            action: CONSTANTS.WS_ACTIONS.REGISTER_RESPONSE,
            type,
            success: true
        } ) );

        if( type === CONSTANTS.WS_CLIENT_TYPE.DEVICE ) {
            this.connectionState = CONSTANTS.SERVER_STATE.DEVICE_CONNECTED;
        }
    }
}

module.exports = SocketServer;
