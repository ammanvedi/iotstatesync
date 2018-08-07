const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const path = require('path');
const sass = require( 'gulp-sass' );
const rename = require( 'gulp-rename' );
const jsdoc = require('gulp-jsdoc3');
const webserver = require('gulp-webserver');
const runSequence = require('run-sequence');
const run = require('gulp-run');

const CONFIG = {
    docRoot: './docs/developer/',
    pagesRoot: './docs/',
    testRoot: './test/'
}

gulp.task('run-tests', function() {
  return run('npm test').exec()
})

gulp.task( 'serve:docs:client', function() {
    gulp.src( path.join( CONFIG.docRoot, 'client' ) )
        .pipe( webserver( {
            livereload: true,
            directoryListing: false,
            open: true,
            port: 9001
        } ) );
} );

gulp.task( 'serve:docs:server', function() {
    gulp.src( path.join( CONFIG.docRoot, 'server' ) )
        .pipe( webserver( {
            livereload: true,
            directoryListing: false,
            open: true,
            port: 9009
        } ) );
} );

gulp.task( 'serve:pages', function() {
    gulp.src( CONFIG.pagesRoot )
        .pipe( webserver( {
            livereload: true,
            directoryListing: false,
            open: true,
            port: 9002
        } ) );
} );

gulp.task( 'serve:tests', function() {
    gulp.src( '.' )
        .pipe( webserver( {
            open: 'http://localhost:9003/test/',
            livereload: true,
            directoryListing: false,
            port: 9003,
            fallback: 'index.html'
        } ) );
} );

gulp.task( 'js-client', function() {
    return gulp.src('./lib/client/js/Index.js')
      .pipe(webpack( require( './webpack.conf.js' ) ))
      .pipe(gulp.dest('dist/client/'))
      .pipe(gulp.dest('docs/js/'))
} );

gulp.task( 'js-server', function() {
    return gulp.src( './lib/server/js/**/*.js' )
        .pipe( gulp.dest( 'dist/server/' ) );
} )

gulp.task( 'docs-client', function( cb ) {
    gulp.src( [ 'readme.md', './lib/client/js/**/*.js' ], { read: false } )
        .pipe( jsdoc( require('./jsdoc.client.conf.js'), cb ) );
} );

gulp.task( 'docs-server', function( cb ) {
    gulp.src( [ 'readme.md', './lib/server/js/**/*.js' ], { read: false } )
        .pipe( jsdoc( require('./jsdoc.server.conf.js'), cb ) );
} );

gulp.task( 'docs-server', function( cb ) {
    gulp.src( [ 'readme.md', './lib/server/js/**/*.js' ], { read: false } )
        .pipe( jsdoc( require('./jsdoc.server.conf.js'), cb ) );
} );

gulp.task( 'watch:js', function() {
    gulp.watch( [ './lib/**/*', './test/**/*.js' ], [ 'onwatch' ] );
} );


gulp.task( 'onwatch', function() {
    return runSequence( 'js-client', 'js-server', 'run-tests' );
} );

gulp.task( 'default', [ 'js-client', 'js-server', 'docs-client', 'docs-server', 'serve:tests', 'serve:docs:client', 'serve:docs:server', 'serve:pages' ] );
