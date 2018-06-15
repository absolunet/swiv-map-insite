/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModel = __webpack_require__(8);
var NotImplementedError = __webpack_require__(7).default;
var resolve = __webpack_require__(20);
var filter = __webpack_require__(21);
var configs = __webpack_require__(9);

module.exports = function (_AbstractModel) {
	_inherits(AbstractEventModel, _AbstractModel);

	function AbstractEventModel() {
		_classCallCheck(this, AbstractEventModel);

		var _this = _possibleConstructorReturn(this, (AbstractEventModel.__proto__ || Object.getPrototypeOf(AbstractEventModel)).call(this));

		_this.mainDataType = Object;
		return _this;
	}

	_createClass(AbstractEventModel, [{
		key: 'setMainData',
		value: function setMainData() {
			var _this2 = this;

			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var keyList = this.getMainDataKey().split('.');
			var lastKey = keyList.pop();
			var key = keyList.join('.');
			var container = resolve(key, this) || {};

			if (container) {
				var isOfMainType = data.constructor !== Array ? this.isOfMainType(data) : data.every(function (d) {
					return _this2.isOfMainType(d);
				});

				if (!isOfMainType) {
					if (configs.get('debug', false)) {
						// eslint-disable-next-line no-console
						console.warn('The main data does not fit the expected type: ' + this.getMainDataType().name);
					}
				}
				if (container[lastKey] && container[lastKey].constructor === Array && data.constructor !== Array) {
					container[lastKey].push(data);
				} else {
					container[lastKey] = data;
				}
			}
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			if (this.mainDataKey) {
				return this.mainDataKey;
			}

			throw new NotImplementedError();
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return this.mainDataType || Object;
		}
	}, {
		key: 'isOfMainType',
		value: function isOfMainType(data) {
			var _this3 = this;

			return Object.keys(filter(new (this.getMainDataType())().getRequiredFields(), function (val, key) {
				return typeof val === 'function' ? val(key, _this3) : Boolean(val);
			})).every(function (key) {
				return typeof data[key] === 'boolean' || data[key];
			});
		}
	}, {
		key: 'getWhitelistedFunctions',
		value: function getWhitelistedFunctions() {
			return ['eventCallback'];
		}
	}, {
		key: 'getEventName',
		value: function getEventName() {
			return this.constructor.getEventName();
		}
	}]);

	return AbstractEventModel;
}(AbstractModel);

module.exports.getEventName = function () {
	var name = this.eventName || this.name;

	return name.replace(/(Event)?Model$/, '');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImpressionDataModel = __webpack_require__(5);

module.exports = function (_ImpressionDataModel) {
	_inherits(ProductDataModel, _ImpressionDataModel);

	function ProductDataModel() {
		_classCallCheck(this, ProductDataModel);

		return _possibleConstructorReturn(this, (ProductDataModel.__proto__ || Object.getPrototypeOf(ProductDataModel)).apply(this, arguments));
	}

	_createClass(ProductDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			var data = _get(ProductDataModel.prototype.__proto__ || Object.getPrototypeOf(ProductDataModel.prototype), 'getDefaultModelData', this).call(this);
			var additionalData = {
				quantity: 1,
				coupon: ''
			};

			Object.keys(additionalData).forEach(function (k) {
				data[k] = additionalData[k];
			});

			return data;
		}
	}]);

	return ProductDataModel;
}(ImpressionDataModel);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotImplementedError = __webpack_require__(7);

module.exports = function () {
	function AbstractInsiteMapper() {
		_classCallCheck(this, AbstractInsiteMapper);

		this.pipes = [];
	}

	_createClass(AbstractInsiteMapper, [{
		key: 'map',
		value: function map(data) {
			var _this = this;

			var mappedData = [];
			this.getDataCollection(data).forEach(function (item) {
				var dataModel = _this.getModel();
				_this.executePipeline(dataModel, item, data);
				mappedData.push(dataModel.getData());
			});

			return mappedData;
		}
	}, {
		key: 'registerPipe',
		value: function registerPipe(pipe) {
			var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			this.pipes.push({ pipe: pipe, order: order });

			return this;
		}
	}, {
		key: 'executePipeline',
		value: function executePipeline(dataModel, rawData, context) {
			this.pipes.sort(function (a, b) {
				return a.order > b.order;
			}).forEach(function (pipeData) {
				pipeData.pipe(dataModel, rawData, context);
			});

			Object.keys(dataModel).forEach(function (k) {
				if (typeof dataModel[k] === 'undefined') {
					delete dataModel[k];
				}
			});
		}
	}, {
		key: 'getModel',
		value: function getModel() {
			throw new NotImplementedError();
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			return this.getModel().constructor.name;
		}
	}, {
		key: 'getDataCollection',
		value: function getDataCollection(data) {
			return data.constructor === Array ? data : [data];
		}
	}]);

	return AbstractInsiteMapper;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(4);

module.exports = function (_AbstractDataModel) {
  _inherits(ActionFieldDataModel, _AbstractDataModel);

  function ActionFieldDataModel() {
    _classCallCheck(this, ActionFieldDataModel);

    return _possibleConstructorReturn(this, (ActionFieldDataModel.__proto__ || Object.getPrototypeOf(ActionFieldDataModel)).apply(this, arguments));
  }

  return ActionFieldDataModel;
}(AbstractDataModel);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModel = __webpack_require__(8);

module.exports = function (_AbstractModel) {
	_inherits(AbstractDataModel, _AbstractModel);

	function AbstractDataModel() {
		_classCallCheck(this, AbstractDataModel);

		return _possibleConstructorReturn(this, (AbstractDataModel.__proto__ || Object.getPrototypeOf(AbstractDataModel)).apply(this, arguments));
	}

	_createClass(AbstractDataModel, [{
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {};
		}
	}]);

	return AbstractDataModel;
}(AbstractModel);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(4);

module.exports = function (_AbstractDataModel) {
	_inherits(ImpressionDataModel, _AbstractDataModel);

	function ImpressionDataModel() {
		_classCallCheck(this, ImpressionDataModel);

		return _possibleConstructorReturn(this, (ImpressionDataModel.__proto__ || Object.getPrototypeOf(ImpressionDataModel)).apply(this, arguments));
	}

	_createClass(ImpressionDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				name: '',
				id: '',
				brand: '',
				category: '',
				variant: '',
				list: '',
				position: 1,
				price: 0
			};
		}
	}, {
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {
				id: function id(product) {
					return !product.name;
				},
				name: function name(product) {
					return !product.id;
				}
			};
		}
	}]);

	return ImpressionDataModel;
}(AbstractDataModel);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(4);

module.exports = function (_AbstractDataModel) {
	_inherits(PromotionDataModel, _AbstractDataModel);

	function PromotionDataModel() {
		_classCallCheck(this, PromotionDataModel);

		return _possibleConstructorReturn(this, (PromotionDataModel.__proto__ || Object.getPrototypeOf(PromotionDataModel)).apply(this, arguments));
	}

	_createClass(PromotionDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				id: '',
				name: '',
				creative: '',
				position: ''
			};
		}
	}, {
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {
				id: function id(promotion, event) {
					return ['purchase', 'refund'].indexOf(event.getEventName()) !== -1;
				}
			};
		}
	}]);

	return PromotionDataModel;
}(AbstractDataModel);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Error) {
	_inherits(NotImplementedError, _Error);

	function NotImplementedError(method) {
		_classCallCheck(this, NotImplementedError);

		// eslint-disable-next-line no-caller
		return _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, "Method " + (method || arguments.callee.caller.name) + "() must be implemented."));
	}

	return NotImplementedError;
}(Error);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configs = void 0;

module.exports = function () {
	function AbstractModel() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, AbstractModel);

		_configs = _configs || __webpack_require__(9);
		this.map(this.getDefaultModelData()).map(data);
	}

	_createClass(AbstractModel, [{
		key: 'map',
		value: function map(data) {
			for (var prop in data) {
				if (typeof data[prop] !== 'undefined') {
					this.set(prop, data[prop], data);
				}
			}

			return this;
		}
	}, {
		key: 'set',
		value: function set(prop, value, context) {
			this[prop] = this.mapPropertyValue(prop, value, context);

			return this;
		}
	}, {
		key: 'getData',
		value: function getData() {
			var data = {};
			var whitelistedFunctions = this.getWhitelistedFunctions();

			for (var prop in this) {
				if (typeof this[prop] !== 'undefined') {
					var type = _typeof(this[prop]);

					if (type !== 'undefined' && (typeof this[prop] !== 'function' || whitelistedFunctions.indexOf(prop) !== -1)) {
						data[prop] = this[prop];
					}
				}
			}

			return data;
		}
	}, {
		key: 'getConfigRepository',
		value: function getConfigRepository() {
			return _configs;
		}
	}, {
		key: 'getWhitelistedFunctions',
		value: function getWhitelistedFunctions() {
			return [];
		}
	}, {
		key: 'mapPropertyValue',
		value: function mapPropertyValue(prop, value) {
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			// eslint-disable-line no-unused-vars
			return value;
		}
	}, {
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {};
		}
	}]);

	return AbstractModel;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfigs = __webpack_require__(18);

var _config = {};

var ConfigRepository = function () {
	function ConfigRepository() {
		_classCallCheck(this, ConfigRepository);
	}

	_createClass(ConfigRepository, [{
		key: 'get',
		value: function get(key) {
			var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			return this.has(key) ? _config[key] : defaultValue;
		}
	}, {
		key: 'set',
		value: function set(key, value) {
			_config[key] = value;

			if (!(Object.getOwnPropertyDescriptor(this, key) || {}).get) {
				Object.defineProperty(this, key, {
					get: function get() {
						return this.get(key);
					},
					set: function set(v) {
						this.set(key, v);
					}
				});
			}

			return this;
		}
	}, {
		key: 'has',
		value: function has(key) {
			return typeof _config[key] !== 'undefined';
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			delete _config[key];

			return this;
		}
	}, {
		key: 'all',
		value: function all() {
			var constantsCopy = {};

			for (var key in _config) {
				if (typeof _config[key] !== 'undefined') {
					constantsCopy[key] = _config[key];
				}
			}

			return constantsCopy;
		}
	}]);

	return ConfigRepository;
}();

var configs = new ConfigRepository();

for (var key in defaultConfigs) {
	if (defaultConfigs[key]) {
		configs.set(key, defaultConfigs[key]);
	}
}

module.exports = configs;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42)];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15)();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var InsiteMapperService = __webpack_require__(16);
var hasBooted = false;

var boot = function boot() {
	if (!hasBooted && window.swiv && window.swiv.gee) {
		hasBooted = true;
		window.swiv.gee.setMapperService(new InsiteMapperService());
	}
};

window.addEventListener('swiv.gee.ready', boot);

module.exports = boot;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function InsiteMapperService() {
		var _this = this;

		_classCallCheck(this, InsiteMapperService);

		var mappers = [{
			mapper: __webpack_require__(17),
			defaultPipes: __webpack_require__(33)
		}, {
			mapper: __webpack_require__(34),
			defaultPipes: __webpack_require__(10)
		}, {
			mapper: __webpack_require__(43),
			defaultPipes: __webpack_require__(44)
		}, {
			mapper: __webpack_require__(45),
			defaultPipes: __webpack_require__(46)
		}];

		this.mappers = {};

		mappers.forEach(function (mapperData) {
			var MapperClass = mapperData.mapper;
			var mapper = new MapperClass();
			var event = mapper.getModelName();
			_this.mappers[event] = mapper;

			mapperData.defaultPipes.forEach(function (pipe) {
				_this.registerPipe(event, pipe);
			});
		});
	}

	_createClass(InsiteMapperService, [{
		key: 'map',
		value: function map(data, event) {
			var mapper = this.getDedicatedMapper(event);
			var mappedData = mapper ? mapper.map(data) : data;

			if (mappedData && (mappedData.constructor !== Array || mappedData.length > 0)) {
				event.setMainData(mappedData);

				return event.getData();
			}

			return null;
		}
	}, {
		key: 'registerPipe',
		value: function registerPipe(event, pipe) {
			var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			var mapper = this.getDedicatedMapper(event);

			if (mapper) {
				mapper.registerPipe(pipe, order);
			}
		}
	}, {
		key: 'getDedicatedMapper',
		value: function getDedicatedMapper(event) {
			return this.mappers[event] || this.mappers[event.getMainDataType().name] || null;
		}
	}]);

	return InsiteMapperService;
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var ActionFieldDataModel = __webpack_require__(3);

module.exports = function (_AbstractInsiteMapper) {
	_inherits(InsiteActionFieldDataModelMapper, _AbstractInsiteMapper);

	function InsiteActionFieldDataModelMapper() {
		_classCallCheck(this, InsiteActionFieldDataModelMapper);

		return _possibleConstructorReturn(this, (InsiteActionFieldDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteActionFieldDataModelMapper)).apply(this, arguments));
	}

	_createClass(InsiteActionFieldDataModelMapper, [{
		key: 'getModel',
		value: function getModel() {
			return new ActionFieldDataModel();
		}
	}]);

	return InsiteActionFieldDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	dataLayer: 'dataLayer',
	gtm: 'google_tag_manager',
	eventPrefix: 'swiv.gee.',
	events: [__webpack_require__(19), __webpack_require__(22), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32)]
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);

module.exports = function (_AbstractEventModel) {
	_inherits(DefaultEventModel, _AbstractEventModel);

	function DefaultEventModel() {
		_classCallCheck(this, DefaultEventModel);

		return _possibleConstructorReturn(this, (DefaultEventModel.__proto__ || Object.getPrototypeOf(DefaultEventModel)).apply(this, arguments));
	}

	_createClass(DefaultEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				ecommerce: {}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return Object;
		}
	}]);

	return DefaultEventModel;
}(AbstractEventModel);

module.exports.eventName = 'DefaultEventModel';

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
	var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	return path.split('.').reduce(function (prev, curr) {
		return prev ? prev[curr] : undefined;
	}, obj);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (obj, predicate) {
	var result = {};

	for (var key in obj) {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	}

	return result;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(1);

module.exports = function (_AbstractEventModel) {
	_inherits(AddToCartEventModel, _AbstractEventModel);

	function AddToCartEventModel() {
		_classCallCheck(this, AddToCartEventModel);

		return _possibleConstructorReturn(this, (AddToCartEventModel.__proto__ || Object.getPrototypeOf(AddToCartEventModel)).apply(this, arguments));
	}

	_createClass(AddToCartEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'addToCart',
				ecommerce: {
					currencyCode: this.getConfigRepository().get('currencyCode', 'USD'),
					add: {
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.add.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return AddToCartEventModel;
}(AbstractEventModel);

module.exports.eventName = 'AddToCartEventModel';

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(1);

module.exports = function (_AbstractEventModel) {
	_inherits(CheckoutEventModel, _AbstractEventModel);

	function CheckoutEventModel() {
		_classCallCheck(this, CheckoutEventModel);

		return _possibleConstructorReturn(this, (CheckoutEventModel.__proto__ || Object.getPrototypeOf(CheckoutEventModel)).apply(this, arguments));
	}

	_createClass(CheckoutEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'checkout',
				ecommerce: {
					actionField: {
						step: 1,
						option: this.getConfigRepository().get('defaultCreditCard', '')
					},
					products: []
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return CheckoutEventModel;
}(AbstractEventModel);

module.exports.eventName = 'CheckoutEventModel';

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(3);

module.exports = function (_AbstractEventModel) {
	_inherits(CheckoutOptionEventModel, _AbstractEventModel);

	function CheckoutOptionEventModel() {
		_classCallCheck(this, CheckoutOptionEventModel);

		return _possibleConstructorReturn(this, (CheckoutOptionEventModel.__proto__ || Object.getPrototypeOf(CheckoutOptionEventModel)).apply(this, arguments));
	}

	_createClass(CheckoutOptionEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'checkoutOption',
				ecommerce: {
					checkout_option: { // eslint-disable-line camelcase
						actionField: {
							step: 1,
							option: this.getConfigRepository().get('defaultCreditCard', '')
						}
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.checkout_option.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return CheckoutOptionEventModel;
}(AbstractEventModel);

module.exports.eventName = 'CheckoutOptionEventModel';

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ImpressionDataModel = __webpack_require__(5);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductImpressionEventModel, _AbstractEventModel);

	function ProductImpressionEventModel() {
		_classCallCheck(this, ProductImpressionEventModel);

		return _possibleConstructorReturn(this, (ProductImpressionEventModel.__proto__ || Object.getPrototypeOf(ProductImpressionEventModel)).apply(this, arguments));
	}

	_createClass(ProductImpressionEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productImpression',
				ecommerce: {
					currencyCode: this.getConfigRepository().get('currencyCode', 'USD'),
					impressions: []
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.impressions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ImpressionDataModel;
		}
	}]);

	return ProductImpressionEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductImpressionEventModel';

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(1);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductClickEventModel, _AbstractEventModel);

	function ProductClickEventModel() {
		_classCallCheck(this, ProductClickEventModel);

		return _possibleConstructorReturn(this, (ProductClickEventModel.__proto__ || Object.getPrototypeOf(ProductClickEventModel)).apply(this, arguments));
	}

	_createClass(ProductClickEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productClick',
				ecommerce: {
					click: {
						actionField: {},
						products: []
					}
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.click.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return ProductClickEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductClickEventModel';

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(1);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductDetailEventModel, _AbstractEventModel);

	function ProductDetailEventModel() {
		_classCallCheck(this, ProductDetailEventModel);

		return _possibleConstructorReturn(this, (ProductDetailEventModel.__proto__ || Object.getPrototypeOf(ProductDetailEventModel)).apply(this, arguments));
	}

	_createClass(ProductDetailEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productDetail',
				ecommerce: {
					detail: {
						actionField: {},
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.detail.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return ProductDetailEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductDetailEventModel';

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var PromotionModel = __webpack_require__(6);

module.exports = function (_AbstractEventModel) {
	_inherits(PromoClickEventModel, _AbstractEventModel);

	function PromoClickEventModel() {
		_classCallCheck(this, PromoClickEventModel);

		return _possibleConstructorReturn(this, (PromoClickEventModel.__proto__ || Object.getPrototypeOf(PromoClickEventModel)).apply(this, arguments));
	}

	_createClass(PromoClickEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'promotionClick',
				ecommerce: {
					promoClick: {
						promotions: []
					}
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.promoClick.promotions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return PromotionModel;
		}
	}]);

	return PromoClickEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PromoClickEventModel';

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var PromotionModel = __webpack_require__(6);

module.exports = function (_AbstractEventModel) {
	_inherits(PromoViewEventModel, _AbstractEventModel);

	function PromoViewEventModel() {
		_classCallCheck(this, PromoViewEventModel);

		return _possibleConstructorReturn(this, (PromoViewEventModel.__proto__ || Object.getPrototypeOf(PromoViewEventModel)).apply(this, arguments));
	}

	_createClass(PromoViewEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'promotionView',
				ecommerce: {
					promoView: {
						promotions: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.promoView.promotions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return PromotionModel;
		}
	}]);

	return PromoViewEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PromoViewEventModel';

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(3);

module.exports = function (_AbstractEventModel) {
	_inherits(PurchaseEventModel, _AbstractEventModel);

	function PurchaseEventModel() {
		_classCallCheck(this, PurchaseEventModel);

		return _possibleConstructorReturn(this, (PurchaseEventModel.__proto__ || Object.getPrototypeOf(PurchaseEventModel)).apply(this, arguments));
	}

	_createClass(PurchaseEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'purchase',
				ecommerce: {
					purchase: {
						actionField: new ActionFieldModel()
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.purchase.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return PurchaseEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PurchaseEventModel';

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(3);

module.exports = function (_AbstractEventModel) {
	_inherits(RefundEventModel, _AbstractEventModel);

	function RefundEventModel() {
		_classCallCheck(this, RefundEventModel);

		return _possibleConstructorReturn(this, (RefundEventModel.__proto__ || Object.getPrototypeOf(RefundEventModel)).apply(this, arguments));
	}

	_createClass(RefundEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'refund',
				ecommerce: {
					refund: {
						actionField: new ActionFieldModel()
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.refund.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return RefundEventModel;
}(AbstractEventModel);

module.exports.eventName = 'RefundEventModel';

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(1);

module.exports = function (_AbstractEventModel) {
	_inherits(RemoveFromCartEventModel, _AbstractEventModel);

	function RemoveFromCartEventModel() {
		_classCallCheck(this, RemoveFromCartEventModel);

		return _possibleConstructorReturn(this, (RemoveFromCartEventModel.__proto__ || Object.getPrototypeOf(RemoveFromCartEventModel)).apply(this, arguments));
	}

	_createClass(RemoveFromCartEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'removeFromCart',
				ecommerce: {
					remove: {
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.remove.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return RemoveFromCartEventModel;
}(AbstractEventModel);

module.exports.eventName = 'RemoveFromCartEventModel';

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = [];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var ImpressionDataModel = __webpack_require__(5);

module.exports = function (_AbstractInsiteMapper) {
	_inherits(InsiteProductDataModelMapper, _AbstractInsiteMapper);

	function InsiteProductDataModelMapper() {
		_classCallCheck(this, InsiteProductDataModelMapper);

		return _possibleConstructorReturn(this, (InsiteProductDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteProductDataModelMapper)).apply(this, arguments));
	}

	_createClass(InsiteProductDataModelMapper, [{
		key: 'getModel',
		value: function getModel() {
			return new ImpressionDataModel();
		}
	}, {
		key: 'getDataCollection',
		value: function getDataCollection(data) {
			return data.products || [data.product || data];
		}
	}]);

	return InsiteProductDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.id = productDto.id;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.name = productDto.shortDescription;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto, context) {
	var lists = {
		search: 'Search Results',
		list: 'List Page',
		detail: 'Detail Page'
	};

	productImpressionDataModel.list = context.products ? lists[context.originalQuery ? 'search' : 'list'] : lists.detail;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.brand = productDto.properties.brand;
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var resolveCategory = function resolveCategory(productDto, context) {
	if (productDto.properties && productDto.properties.category) {
		return productDto.properties.category;
	}

	if (context.properties && context.properties.category) {
		return context.properties.category;
	}

	var resolvedCategory = window.location.pathname.substr(1).replace(/-/g, ' ').split('/').map(function (category) {
		return '' + category.charAt(0).toUpperCase() + category.slice(1);
	}).join('/');

	if (context.product) {
		resolvedCategory = resolvedCategory.replace(/\/[^/]{1,}$/, '');
	}

	return resolvedCategory;
};

module.exports = function (productImpressionDataModel, productDto, context) {
	productImpressionDataModel.category = resolveCategory(productDto, context);
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto, context) {
	var page = context.pagination ? context.pagination.currentPage : 1;
	var perPage = context.pagination ? context.pagination.pageSize : 1;
	var pos = 0;

	if (context.products) {
		for (var i = context.products.length - 1; i >= 0; i--) {
			if (context.products[i].id === productDto.id) {
				pos = i;
				break;
			}
		}
	}

	productImpressionDataModel.position = (page - 1) * perPage + pos + 1;
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.price = productDto.pricing.unitListPrice || undefined;
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.variant = productDto.name || productDto.shortDescription;

	if (productImpressionDataModel.variant === productImpressionDataModel.name) {
		delete productImpressionDataModel.variant;
	}
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var PromotionDataModel = __webpack_require__(6);

module.exports = function (_AbstractInsiteMapper) {
	_inherits(InsitePromotionDataModelMapper, _AbstractInsiteMapper);

	function InsitePromotionDataModelMapper() {
		_classCallCheck(this, InsitePromotionDataModelMapper);

		return _possibleConstructorReturn(this, (InsitePromotionDataModelMapper.__proto__ || Object.getPrototypeOf(InsitePromotionDataModelMapper)).apply(this, arguments));
	}

	_createClass(InsitePromotionDataModelMapper, [{
		key: 'getModel',
		value: function getModel() {
			return new PromotionDataModel();
		}
	}]);

	return InsitePromotionDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = [];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var ProductDataModel = __webpack_require__(1);

module.exports = function (_AbstractInsiteMapper) {
	_inherits(InsiteProductDataModelMapper, _AbstractInsiteMapper);

	function InsiteProductDataModelMapper() {
		_classCallCheck(this, InsiteProductDataModelMapper);

		return _possibleConstructorReturn(this, (InsiteProductDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteProductDataModelMapper)).apply(this, arguments));
	}

	_createClass(InsiteProductDataModelMapper, [{
		key: 'getModel',
		value: function getModel() {
			return new ProductDataModel();
		}
	}, {
		key: 'getDataCollection',
		value: function getDataCollection(data) {
			return data.products || [data.product || data];
		}
	}]);

	return InsiteProductDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10).concat([__webpack_require__(47), __webpack_require__(48)]);

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (productDataModel, productDto) {
	if (productDataModel.price) {
		productDataModel.quantity = productDto.quantity;
	} else {
		delete productDataModel.quantity;
	}
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (productDataModel) {
	if (productDataModel.coupon === '') {
		delete productDataModel.coupon;
	}
};

/***/ })
/******/ ]);