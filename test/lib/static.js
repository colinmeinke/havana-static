/* global describe before it */

import chai from 'chai';
import Event from 'havana-event';
import path from 'path';
import Static from '../../dist/static.with-polyfill';

const expect = chai.expect;

const event = new Event();

let staticHandler = new Static({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log,
  },
  'rootDir': path.join( __dirname, '..', 'lib' ),
  'staticDir': 'files',
});

describe( 'Static', () => {
  describe( '_', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( '_' );
    });
  });

  describe( 'event', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'event' );
    });
  });

  describe( 'files', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'files' );
    });
  });

  describe( 'mimeTypes', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'mimeTypes' );
    });
  });

  describe( 'name', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'name' );
    });
  });

  describe( 'reporting', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'reporting' );
    });
  });

  describe( 'rootDir', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'rootDir' );
    });
  });

  describe( 'staticDir', () => {
    it( 'should be private', () => {
      expect( staticHandler ).to.not.have.property( 'staticDir' );
    });
  });

  describe( 'response.handler.register', () => {
    before(() => {
      staticHandler = null;
    });

    it( 'should be published when class is instantiated', done => {
      const token = event.subscribe( 'response.handler.register', () => {
        event.unsubscribe( token );
        done();
      });

      staticHandler = new Static({
        'event': event,
        'reporting': {
          'level': 0,
          'reporter': console.log,
        },
        'rootDir': path.join( __dirname, '..' ),
        'staticDir': 'public',
      });
    });
  });

  describe( 'response.send', () => {
    it( 'should be published when request.received file found', done => {
      const token = event.subscribe( 'response.send', () => {
        event.unsubscribe( token );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css',
      });
    });

    it( 'should send a name of static', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.name ).to.equal( 'static' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css',
      });
    });

    it( 'should send a statusCode of 200', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.statusCode ).to.equal( 200 );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css',
      });
    });

    it( 'should send a mimeType of text/css for files with a .css extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/css' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css',
      });
    });

    it( 'should send a mimeType of text/x-handlebars-template for files with an .hbs extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/x-handlebars-template' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.hbs',
      });
    });

    it( 'should send a mimeType of text/html for files with an .htm extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/html' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.htm',
      });
    });

    it( 'should send a mimeType of text/html for files with an .html extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/html' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.html',
      });
    });

    it( 'should send a mimeType of image/x-icon for files with an .ico extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/x-icon' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.ico',
      });
    });

    it( 'should send a mimeType of image/jp2 for files with a .jp2 extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/jp2' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jp2',
      });
    });

    it( 'should send a mimeType of image/jpeg for files with a .jpeg extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/jpeg' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jpeg',
      });
    });

    it( 'should send a mimeType of image/jpeg for files with a .jpg extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/jpeg' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jpg',
      });
    });

    it( 'should send a mimeType of text/javascript for files with a .js extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/javascript' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.js',
      });
    });

    it( 'should send a mimeType of text/x-markdown for files with a .md extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/x-markdown' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.md',
      });
    });

    it( 'should send a mimeType of image/png for files with a .png extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/png' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.png',
      });
    });

    it( 'should send a mimeType of image/svg+xml for files with a .svg extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/svg+xml' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.svg',
      });
    });

    it( 'should send a mimeType of image/webp for files with a .webp extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'image/webp' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.webp',
      });
    });

    it( 'should send a mimeType of text/plain for files with an unknown extension', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.contentType ).to.equal( 'text/plain' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.abc',
      });
    });
  });

  describe( 'response.handler.error', () => {
    it( 'should be published when request.received file not found', done => {
      const token = event.subscribe( 'response.handler.error', () => {
        event.unsubscribe( token );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'not-found.txt',
      });
    });

    it( 'should send a name of static', done => {
      const token = event.subscribe( 'response.handler.error', data => {
        event.unsubscribe( token );
        expect( data.name ).to.equal( 'static' );
        done();
      });

      event.publish( 'request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'not-found.txt',
      });
    });
  });
});
