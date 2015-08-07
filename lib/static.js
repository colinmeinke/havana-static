import fs from 'fs';
import path from 'path';

const _ = new WeakMap();

class Static {
  constructor ( config ) {
    const mimeTypes = {
      'css': 'text/css',
      'hbs': 'text/x-handlebars-template',
      'htm': 'text/html',
      'html': 'text/html',
      'ico': 'image/x-icon',
      'jp2': 'image/jp2',
      'jpeg': 'image/jpeg',
      'jpg': 'image/jpeg',
      'js': 'text/javascript',
      'md': 'text/x-markdown',
      'png': 'image/png',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
    };

    const props = {
      'event': config.event,
      'files': [],
      'mimeTypes': mimeTypes,
      'name': 'static',
      'reporting': config.reporting,
      'rootDir': config.rootDir,
      'staticDir': config.staticDir,
    };

    _.set( this, props );

    this.init();
  }

  init () {
    const { event, files, name, reporting, rootDir, staticDir } = _.get( this );

    if ( reporting.level > 1 ) {
      reporting.reporter( `-- Response handler registered: ${name}` );
    }

    event.publish( 'response.handler.register', {
      'name': name,
    });

    this.getFiles( path.join( rootDir, staticDir ));

    event.subscribe( 'request.received', data => {
      let file = path.join( rootDir, staticDir, data.url );

      if ( files.indexOf( file ) !== -1 ) {
        fs.readFile( file, 'utf8', ( error, content ) => {
          if ( reporting.level > 0 ) {
            reporting.reporter( `-- Response sent from handler: ${name}` );
          }

          event.publish( 'response.send', {
            'content': content,
            'contentType': this.getMimeType( file ),
            'id': data.id,
            'name': name,
            'statusCode': 200,
            'time': Date.now(),
            'url': data.url,
          });
        });
      } else {
        if ( reporting.level > 1 ) {
          reporting.reporter( `-- No response from handler: ${name}` );
        }

        event.publish( 'response.handler.error', {
          'id': data.id,
          'name': name,
          'time': Date.now(),
          'url': data.url,
        });
      }
    });
  }

  getFiles ( directory ) {
    fs.readdir( directory, ( error, files ) => {
      if ( files ) {
        for ( let i = 0, l = files.length; i < l; i++ ) {
          this.handleFile( path.join( directory, files[ i ]));
        }
      }
    });
  }

  handleFile ( file ) {
    fs.stat( file, ( err, stats ) => {
      if ( err ) {
        throw err;
      }

      if ( stats.isDirectory()) {
        this.getFiles( file );
      } else {
        _.get( this ).files.push( file );
      }
    });
  }

  getMimeType ( file ) {
    const extension = file.split( '.' ).pop();
    const { mimeTypes } = _.get( this );

    for ( let ext in mimeTypes ) {
      if ( extension === ext ) {
        return mimeTypes[ ext ];
      }
    }

    return 'text/plain';
  }
}

export default Static;
