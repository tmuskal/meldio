/* @ flow */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.syntaxError = syntaxError;

var _location = require('./location');

var _graphql = require('graphql');

var SyntaxError = (function (_Error) {
  _inherits(SyntaxError, _Error);

  function SyntaxError(message, description, line, column, source) {
    _classCallCheck(this, SyntaxError);

    _get(Object.getPrototypeOf(SyntaxError.prototype), 'constructor', this).call(this, message);
    this.message = message;

    Object.defineProperty(this, 'name', {
      get: function get() {
        return 'Syntax Error';
      }
    });

    Object.defineProperty(this, 'description', {
      get: function get() {
        return description;
      }
    });

    Object.defineProperty(this, 'line', {
      get: function get() {
        return line;
      }
    });

    Object.defineProperty(this, 'column', {
      get: function get() {
        return column;
      }
    });

    Object.defineProperty(this, 'source', {
      get: function get() {
        return source;
      }
    });
  }

  /**
   * Produces a GraphQLError representing a syntax error, containing useful
   * descriptive information about the syntax error's position in the source.
   */
  return SyntaxError;
})(Error);

exports.SyntaxError = SyntaxError;

function syntaxError(source, position, description) {
  var location = (0, _location.getLocation)(source, position);
  var error = new SyntaxError('Syntax Error ' + source.name + ' (' + location.line + ':' + location.column + ') ' + description + '\n\n' + highlightSourceAtLocation(source, location), description, location.line, location.column, source);
  return error;
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var prevLineNum = (line - 1).toString();
  var lineNum = line.toString();
  var nextLineNum = (line + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  return (line >= 2 ? lpad(padLen, prevLineNum) + ': ' + lines[line - 2] + '\n' : '') + lpad(padLen, lineNum) + ': ' + lines[line - 1] + '\n' + Array(2 + padLen + location.column).join(' ') + '^\n' + (line < lines.length ? lpad(padLen, nextLineNum) + ': ' + lines[line] + '\n' : '');
}

function lpad(len, str) {
  return Array(len - str.length + 1).join(' ') + str;
}