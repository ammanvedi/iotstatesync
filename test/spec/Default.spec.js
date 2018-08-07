describe( 'Socket Client', function() {
    this.timeout( 10000 );

    it( 'Connects to Server', function( done ) {

        var client = new  IOTStateSync.SocketClient( {
            onConnected: function() {
                expect( true ).to.equal( true );
                done();
            }
        } );

    } );
} );


describe( 'Sync State Manager', function() {
    this.timeout( 5000 );

    it( 'Registers client', function( done ) {

        var manager = new IOTStateSync.ClientSyncStateManager( {
            onConnected: function() {},
            onRegister: function( err ) {

                if( err ) {
                    expect( true ).to.equal( false );
                }
                done();
            }
        } );
    } ); 
} );
