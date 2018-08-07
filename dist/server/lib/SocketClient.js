const WSClient = require( 'websocket' ).client;
const CONSTANTS = require( './Constants.js' );

const DEFAULT_OPTIONS = {
    host: '127.0.0.1',
    port: 1337,
    onConnected: () => false,
    onRegister: () => false
}

const WS_PROTOCOL = 'ws://';

/* Client socket connection for node JS device */
class SocketClient {

    constructor( clientOptions ) {

        this.config = { ...DEFAULT_OPTIONS, ...clientOptions };
        this.client = new WSClient();
        this.client.connect( `${ WS_PROTOCOL }${ this.config.host }:${ this.config.port }` );
        this.client.on( CONSTANTS.WS_EVENT.CONNECT, this.onSocketConnect.bind( this ) );
    }

    onSocketConnect( connection ) {

        console.log( 'Device connected to socket...' );
        this.connection = connection;
        this.connection.on( CONSTANTS.WS_EVENT.ERROR, this.onSocketError.bind( this ) );
        this.connection.on( CONSTANTS.WS_EVENT.CLOSE, this.onSocketClose.bind( this ) );
        this.connection.on( CONSTANTS.WS_EVENT.MESSAGE, this.onSocketMessage.bind( this ) );
        const registerMessage = { action: CONSTANTS.WS_ACTIONS.REGISTER, type: CONSTANTS.WS_CLIENT_TYPE.DEVICE };
        this.sendData( registerMessage );
    }

    onSocketMessage( message ) {

        if( message.type !== CONSTANTS.WS_MESSAGE_TYPE.UTF_8 ) {
            console.log( 'data not utf8' );
            return;
        }

        const messageData = JSON.parse( message.utf8Data );

        switch( messageData.action ) {
            case CONSTANTS.WS_ACTIONS.REGISTER_RESPONSE:
                console.log( 'registering device' );
                console.log( this.config );
                this.config.onRegister();
                break;
            case CONSTANTS.WS_ACTIONS.SERVER_INITIAL_STATE_ACK:
                console.log( 'registering device' );
                console.log( this.config );
                this.config.onReady();
                break;
        }
    }

    onSocketError( err ) {
        console.log( 'Socket Error', err );
    }

    onSocketClose() {
        console.log( 'Socket Closed...' )
    }

    sendData( data ) {
        console.log( 'Sending Data...', data );
        this.connection.sendUTF( JSON.stringify( data ) );
    }
}

module.exports = SocketClient;
