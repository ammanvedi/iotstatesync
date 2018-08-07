/**
 * Define options for the socket client
 * @typedef {Object} ClientOptions
 * @property {Integer} [port=1337] the port to listen on
 * @property {String} [host="127.0.0.1"] the host where the server resides
 * @property {Function} onConnected function to call when we connected to the server successfully
 */

const DEFAULT_OPTIONS = {
    host: '127.0.0.1',
    port: 1337,
    onConnected: () => false,
    onRegister: () => false
}

const WS_ACTIONS = {
    REGISTER: 'register',
    REGISTER_RESPONSE: 'register-response'
}

const WS_CLIENT_TYPE = {
    CLIENT: 'client',
    DEVICE: 'device'
}

const WS_PROTOCOL = 'ws://';

export class SocketClient {

    static log( message ) {
        console.log( 'Socket Client:', message )
    }

    /**
     * Create an instance to manage the socket connection to the server
     * @param  {ClientOptions} clientOptions define where the server is
     */
    constructor( clientOptions ) {

        this.config = { ...DEFAULT_OPTIONS, ...clientOptions };
        this.WSImplementation = window.WebSocket || window.MozWebSocket;
        this.connection = new this.WSImplementation( `${ WS_PROTOCOL }${ this.config.host }:${ this.config.port }` );
        this.connection.onopen = this.onSocketOpen.bind( this );
        this.connection.onerror = this.onSocketError.bind( this );
        this.connection.onmessage = this.onSocketMessage.bind( this );
    }

    onSocketOpen() {
        SocketClient.log( 'Opened Connection' );
        const registerMessage = { action: WS_ACTIONS.REGISTER, type: WS_CLIENT_TYPE.CLIENT };
        this.connection.send( JSON.stringify( registerMessage ) );
        this.config.onConnected();
    }

    onSocketError( error ) {
        console.log( error );
        SocketClient.log( 'Error' + JSON.stringify( error ) );
    }

    onSocketMessage( message ) {

        const messageData = JSON.parse( message.data );
        switch( messageData.action ) {
            case WS_ACTIONS.REGISTER_RESPONSE:
                this.config.onRegister();
                break;
        }
    }

    sendData( data ) {
        console.log( 'Sending', data );
        this.connection.send( JSON.stringify( data ) );
    }
}
