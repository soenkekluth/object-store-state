'use strict';

exports.__esModule = true;
exports.dotToObj = exports.objToDot = undefined;

var _objectPath = require('object-path');

var _isPlainObj = require('is-plain-obj');

var _isPlainObj2 = _interopRequireDefault(_isPlainObj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objToDot = exports.objToDot = function objToDot(obj) {

  var objToDotNotation = function objToDotNotation(obj) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var dotPathArr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      var val = obj[key];
      if ((0, _isPlainObj2.default)(val)) {
        return objToDotNotation(val, result, dotPathArr.concat(key));
      }
      result[dotPathArr.concat(key).join('.')] = val;
    }
    return result;
  };
  return objToDotNotation(obj);
};

var dotToObj = exports.dotToObj = function dotToObj(path, value) {
  var obj = {};
  (0, _objectPath.set)(obj, path, value);
  return obj;
};