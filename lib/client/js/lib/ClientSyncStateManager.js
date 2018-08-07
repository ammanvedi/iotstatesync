import { SocketClient } from './SocketClient.js';
import { CONSTANTS } from './Constants.js';

/* This class handles sending state and receiveing new state. Its abstracts the websocket implementation */
export class ClientSyncStateManager {

    constructor( clientOptions ) {

        this.socket = new SocketClient( clientOptions );
    }

    updateState( update ) {

        this.socket.sendData( {
            action: CONSTANTS.WS_ACTIONS.CLIENT_STATE_UPDATE,
            type: CONSTANTS.WS_CLIENT_TYPE.CLIENT,
            update: update
        } );
    }
}
