'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ = new WeakMap();

var Static = (function () {
  function Static(config) {
    _classCallCheck(this, Static);

    var mimeTypes = {
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
      'webp': 'image/webp'
    };

    var props = {
      'event': config.event,
      'files': [],
      'mimeTypes': mimeTypes,
      'name': 'static',
      'reporting': config.reporting,
      'rootDir': config.rootDir,
      'staticDir': config.staticDir
    };

    _.set(this, props);

    this.init();
  }

  _createClass(Static, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var event = _.get(this).event;
      var files = _.get(this).files;
      var name = _.get(this).name;
      var reporting = _.get(this).reporting;
      var rootDir = _.get(this).rootDir;
      var staticDir = _.get(this).staticDir;

      if (reporting.level > 1) {
        reporting.reporter('-- Response handler registered: ' + name);
      }

      event.publish('response.handler.register', {
        'name': name
      });

      this.getFiles(_path2['default'].join(rootDir, staticDir));

      event.subscribe('request.received', function (data) {
        var file = _path2['default'].join(rootDir, staticDir, data.url);

        if (files.indexOf(file) !== -1) {
          _fs2['default'].readFile(file, 'utf8', function (error, content) {
            if (reporting.level > 0) {
              reporting.reporter('-- Response sent from handler: ' + name);
            }

            event.publish('response.send', {
              'content': content,
              'contentType': _this.getMimeType(file),
              'id': data.id,
              'name': name,
              'statusCode': 200,
              'time': Date.now(),
              'url': data.url
            });
          });
        } else {
          if (reporting.level > 1) {
            reporting.reporter('-- No response from handler: ' + name);
          }

          event.publish('response.handler.error', {
            'id': data.id,
            'name': name,
            'time': Date.now(),
            'url': data.url
          });
        }
      });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(directory) {
      var _this2 = this;

      _fs2['default'].readdir(directory, function (error, files) {
        if (files) {
          for (var i = 0, l = files.length; i < l; i++) {
            _this2.handleFile(_path2['default'].join(directory, files[i]));
          }
        }
      });
    }
  }, {
    key: 'handleFile',
    value: function handleFile(file) {
      var _this3 = this;

      _fs2['default'].stat(file, function (err, stats) {
        if (err) {
          throw err;
        }

        if (stats.isDirectory()) {
          _this3.getFiles(file);
        } else {
          _.get(_this3).files.push(file);
        }
      });
    }
  }, {
    key: 'getMimeType',
    value: function getMimeType(file) {
      var extension = file.split('.').pop();
      var mimeTypes = _.get(this).mimeTypes;

      for (var ext in mimeTypes) {
        if (extension === ext) {
          return mimeTypes[ext];
        }
      }

      return 'text/plain';
    }
  }]);

  return Static;
})();

exports['default'] = Static;
module.exports = exports['default'];