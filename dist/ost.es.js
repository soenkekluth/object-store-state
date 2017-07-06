var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var MicroDispatch$1 = function () {
  function MicroDispatch(target) {
    classCallCheck(this, MicroDispatch);

    this.types = {};
    this.target = target || this;
    this.emit = this.dispatch.bind(this);
  }

  MicroDispatch.prototype.on = function on(type, handler) {
    if (!this.types[type]) {
      this.types[type] = [];
    }
    if (this.types[type].indexOf(handler) === -1) {
      this.types[type].push(handler);
    }
    return this;
  };

  MicroDispatch.prototype.off = function off(type, handler) {
    if (this.types[type]) {
      if (handler) {
        this.types[type].splice(this.types[type].indexOf(handler), 1);
      } else {
        this.types[type].length = 0;
        delete this.types[type];
      }
    }
    return this;
  };

  MicroDispatch.prototype.dispatch = function dispatch(type, obj) {
    var this$1 = this;

    var evtObj = obj || {};
    if (!evtObj.target) {
      evtObj.target = this.target;
    }
    evtObj.type = type;
    if (this.types[type]) {
      for (var i = 0, l = this.types[type].length; i < l; i++) {
        this$1.types[type][i](evtObj);
      }
    }
    return this;
  };

  return MicroDispatch;
}();

// export default decorate;

// function wrap(target, fnName, fn) {

//   const { prototype } = target;
//   const origin = prototype[fnName];
//   prototype[fnName] = fn;
// }

/*
decorate(target, 'dispatch', function(origin, ...args) {
  micro.dispatch(...args)
  // if (origin) {
  //   origin.apply(this, ...args);
  // }
});
 */
// import wrap from 'lodash/wrap';

// function decorate(target, functionName, fn) {
//   const { prototype } = target;
//   prototype[functionName] = wrap(prototype[functionName], fn);
// }

var dispatcher = new MicroDispatch$1();

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var toString = Object.prototype.toString;

var index$1 = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$2 = createCommonjsModule(function (module) {
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  {
    module.exports = factory();
  }
})(commonjsGlobal, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  };

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {};

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath);
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    };

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true});
  return mod;
});
});

var objToDot = function (obj) {
  if(!index$1(obj) || typeof obj === 'string'){
    return obj;
  }

  var objToDotNotation = function (obj, result, dotPathArr) {
    if ( result === void 0 ) result = {};
    if ( dotPathArr === void 0 ) dotPathArr = [];

    var keys = Object.keys(obj);
    for(var i = 0, l = keys.length; i < l; i++){
      var key = keys[i];
      var val = obj[key];
      if (index$1(val)) {
        return objToDotNotation(val, result, dotPathArr.concat(key));
      }
      result[dotPathArr.concat(key).join('.')] = val;
    }
    return result;
  };
  return objToDotNotation(obj);

};

var get = index$2.get;
var set = index$2.set;
var insert = index$2.insert;
var push = index$2.push;
var del = index$2.del;
var has = index$2.has;
var empty = index$2.empty;

var Store = function Store(initialState) {
  if ( initialState === void 0 ) initialState = {};

  this.emitter = new MicroDispatch$1(this);
  this.state = index({}, initialState);
  this.stateClone = index({}, this.state);
};

var prototypeAccessors = { size: {} };

Store.prototype.setState = function setState (nextState, partial, pathValue) {
    var this$1 = this;

  this.prevState = index({}, this.state);
  this.state = index({}, nextState);
  this.stateClone = index({}, this.state);
  this.emitter.emit('update', { state: this.getState(), payload:partial });

  if(pathValue){
    var paths = Object.keys(pathValue);
    for (var i = 0, l = paths.length; i < l; i++) {
      // console.log('emit', paths[i], pathValue[paths[i]]);
      this$1.emitter.emit(paths[i], {
        key: paths[i],
        value: pathValue[paths[i]],
        state: this$1.getState(),
      });
    }
  }
  return this.stateClone;
};

Store.prototype.getState = function getState () {
  return this.stateClone;
};

Store.prototype.getPrevState = function getPrevState () {
  return this.prevState;
};

Store.prototype.subscribe = function subscribe (key, handler) {
    var this$1 = this;

  this.emitter.on(key, handler);
  return function () { return this$1.unsubscribe(key, handler); };
};

Store.prototype.unsubscribe = function unsubscribe (key, handler){
  this.emitter.off(key, handler);
};

// ensureExists(path, value) {
// return this.set(path, value, true);
// }

Store.prototype.empty = function empty$1 (key) {
  var state = this.getState();
  var path = objToDot(key);
  empty(state, path);
  this.setState(state, get(state, path), {path:null });
  // this.setState(state);
  // this.emitter.emit(path, { state: this.getState(), payload:this.get(path) });
};

// ensureExists(key, value) {

// }

Store.prototype.push = function push$1 (key){
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

  var state = this.getState();
  var path = objToDot(key);
  push.apply(void 0, [ state, path ].concat( values ));
  this.setState(state, get(state, path), {path:values });
  // this.emitter.emit(path, { state: this.getState(), payload:this.get(path) });
};

Store.prototype.insert = function insert$1 (key, value, index$$1) {
    if ( index$$1 === void 0 ) index$$1= 0;

  var state = this.getState();
  var path = objToDot(key);
  insert(state, path, value, index$$1);
  this.setState(state, get(state, path), {path:value });

  // this.emitter.emit(path, { state: this.getState(), payload:this.get(path) });
};

Store.prototype.get = function get$1 (key, fallback) {
    if ( fallback === void 0 ) fallback = null;

  return get(this.getState(), key, fallback);
};

Store.prototype.set = function set$1 () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


  var state = this.getState();
  var partial = {};
  var pathValue = {};
  if(args.length === 2 && (typeof args[0] === 'string')){
    set(state, args[0], args[1]);
    set(partial, args[0], args[1]);
    pathValue[args[0]] = args[1];
  }else if(args.length === 1 && index$1(args[0])){
    var paths = objToDot(args[0]);
    var keys = Object.keys(paths);
    for(var i = 0, l = keys.length; i < l; i++) {
      pathValue[keys[i]] = paths[keys[i]];
      set(state, keys[i], paths[keys[i]]);
    }
    partial = index({}, args[0]);
  }

  this.setState(state, partial, pathValue);
};

Store.prototype.has = function has$1 (key) {
  return has(this.state, key);
};

Store.prototype.delete = function delete$1 (key) {
  var state = this.getState();
  var partial = get(state, key);
  del(state, key);
  this.setState(state, partial);
  this.emitter.emit(key, { state: this.getState(), payload:null });
};

Store.prototype.clone = function clone () {
  return new Store(this.cloneState());
};

Store.prototype.cloneState = function cloneState () {
  return JSON.parse(this.toJSON());
};

Store.prototype.toJSON = function toJSON () {
  return JSON.stringify(this.getState(), null, 2);
};

prototypeAccessors.size.get = function () {
  return Object.keys(this.state).length;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

var store = function (initialState) {
  if ( initialState === void 0 ) initialState = {};

  var newStore = new Store(initialState);
  return {
    getState: newStore.getState.bind(newStore),
    getPrevState: newStore.getPrevState.bind(newStore),
    subscribe: newStore.subscribe.bind(newStore),
    unsubscribe: newStore.unsubscribe.bind(newStore),
    get: newStore.get.bind(newStore),
    set: newStore.set.bind(newStore),
    has: newStore.has.bind(newStore),
    delete: newStore.delete.bind(newStore),
    empty: newStore.empty.bind(newStore),
    push:newStore.push.bind(newStore),
    insert:newStore.insert.bind(newStore),
    clone: newStore.clone.bind(newStore),
    size: newStore.size,
    toJSON: newStore.toJSON.bind(newStore),
    // toJSONString: newStore.toJSONString.bind(newStore),
  };
};


// export const subscriber = (store) => {
//   const { subscribe, get, getState, getPrevState } = store;
//   return {
//     subscribe,
//     get,
//     getState,
//     getPrevState
//   }
// }
// export const select = (keyValue) => {
//   const props = Object.keys(keyValue);
//   for (let i = 0, l = props.length; i < l; i++) {
//     this.emit(props[i], { prop: props[i], value: get(stateClone, props[i]), state: stateClone });
//   }
// }

export { Store, store };export default store;
//# sourceMappingURL=ost.es.js.map
