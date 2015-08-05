/* global describe before it */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _havanaEvent = require('havana-event');

var _havanaEvent2 = _interopRequireDefault(_havanaEvent);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _distStaticWithPolyfill = require('../../dist/static.with-polyfill');

var _distStaticWithPolyfill2 = _interopRequireDefault(_distStaticWithPolyfill);

var expect = _chai2['default'].expect;

var event = new _havanaEvent2['default']();

var staticHandler = new _distStaticWithPolyfill2['default']({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log
  },
  'rootDir': _path2['default'].join(__dirname, '..', 'lib'),
  'staticDir': 'files'
});

describe('Static', function () {
  describe('_', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('_');
    });
  });

  describe('event', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('event');
    });
  });

  describe('files', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('files');
    });
  });

  describe('mimeTypes', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('mimeTypes');
    });
  });

  describe('name', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('name');
    });
  });

  describe('reporting', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('reporting');
    });
  });

  describe('rootDir', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('rootDir');
    });
  });

  describe('staticDir', function () {
    it('should be private', function () {
      expect(staticHandler).to.not.have.property('staticDir');
    });
  });

  describe('response.handler.register', function () {
    before(function () {
      staticHandler = null;
    });

    it('should be published when class is instantiated', function (done) {
      var token = event.subscribe('response.handler.register', function () {
        event.unsubscribe(token);
        done();
      });

      staticHandler = new _distStaticWithPolyfill2['default']({
        'event': event,
        'reporting': {
          'level': 0,
          'reporter': console.log
        },
        'rootDir': _path2['default'].join(__dirname, '..'),
        'staticDir': 'public'
      });
    });
  });

  describe('response.send', function () {
    it('should be published when request.received file found', function (done) {
      var token = event.subscribe('response.send', function () {
        event.unsubscribe(token);
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css'
      });
    });

    it('should send a name of static', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.name).to.equal('static');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css'
      });
    });

    it('should send a statusCode of 200', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.statusCode).to.equal(200);
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css'
      });
    });

    it('should send a mimeType of text/css for files with a .css extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/css');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.css'
      });
    });

    it('should send a mimeType of text/x-handlebars-template for files with an .hbs extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/x-handlebars-template');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.hbs'
      });
    });

    it('should send a mimeType of text/html for files with an .htm extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/html');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.htm'
      });
    });

    it('should send a mimeType of text/html for files with an .html extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/html');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.html'
      });
    });

    it('should send a mimeType of image/x-icon for files with an .ico extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/x-icon');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.ico'
      });
    });

    it('should send a mimeType of image/jp2 for files with a .jp2 extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/jp2');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jp2'
      });
    });

    it('should send a mimeType of image/jpeg for files with a .jpeg extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/jpeg');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jpeg'
      });
    });

    it('should send a mimeType of image/jpeg for files with a .jpg extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/jpeg');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.jpg'
      });
    });

    it('should send a mimeType of text/javascript for files with a .js extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/javascript');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.js'
      });
    });

    it('should send a mimeType of text/x-markdown for files with a .md extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/x-markdown');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.md'
      });
    });

    it('should send a mimeType of image/png for files with a .png extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/png');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.png'
      });
    });

    it('should send a mimeType of image/svg+xml for files with a .svg extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/svg+xml');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.svg'
      });
    });

    it('should send a mimeType of image/webp for files with a .webp extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('image/webp');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.webp'
      });
    });

    it('should send a mimeType of text/plain for files with an unknown extension', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.contentType).to.equal('text/plain');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'test.abc'
      });
    });
  });

  describe('response.handler.error', function () {
    it('should be published when request.received file not found', function (done) {
      var token = event.subscribe('response.handler.error', function () {
        event.unsubscribe(token);
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'not-found.txt'
      });
    });

    it('should send a name of static', function (done) {
      var token = event.subscribe('response.handler.error', function (data) {
        event.unsubscribe(token);
        expect(data.name).to.equal('static');
        done();
      });

      event.publish('request.received', {
        'id': 1,
        'method': 'GET',
        'url': 'not-found.txt'
      });
    });
  });
});