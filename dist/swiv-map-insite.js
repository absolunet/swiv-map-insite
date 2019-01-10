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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractModel = __webpack_require__(8);
const NotImplementedError = __webpack_require__(3).default;
const resolve = __webpack_require__(21);
const filter = __webpack_require__(22);
let _configs;

module.exports = class AbstractEventModel extends AbstractModel {

	constructor() {
		super();
		this.mainDataType = Object;
		_configs = _configs || __webpack_require__(9);
	}

	setMainData(data = {}) {
		const keyList = this.getMainDataKey().split('.');
		const lastKey = keyList.pop();
		const key = keyList.join('.');
		const container = resolve(key, this) || {};

		if (container) {
			const isOfMainType = data.constructor !== Array ? this.isOfMainType(data) : data.every((d) => {
				return this.isOfMainType(d);
			});

			if (!isOfMainType) {
				if (_configs.get('debug', false)) {
					// eslint-disable-next-line no-console
					console.warn(`The main data does not fit the expected type: ${this.getMainDataType().name}`);
				}
			}
			if (container[lastKey] && container[lastKey].constructor === Array && data.constructor !== Array) {
				container[lastKey].push(data);
			} else {
				container[lastKey] = data;
			}
		}
	}

	getMainDataKey() {
		if (this.mainDataKey) {
			return this.mainDataKey;
		}

		throw new NotImplementedError();
	}

	getMainDataType() {
		return this.mainDataType || Object;
	}

	isOfMainType(data) {
		return Object.keys(filter((new (this.getMainDataType())()).getRequiredFields(), (val, key) => {
			return typeof val === 'function' ? val(key, this) : Boolean(val);
		})).every((key) => {
			return typeof data[key] === 'boolean' || data[key];
		});
	}

	getWhitelistedFunctions() {
		return ['eventCallback'];
	}

	getEventName() {
		const cleanName = this.modelName.replace(/(Event)?Model$/, '');

		return `${cleanName.charAt(0).toLowerCase()}${cleanName.slice(1)}`;
	}

};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ImpressionDataModel = __webpack_require__(6);

module.exports = class ProductDataModel extends ImpressionDataModel {

	static get modelName() {
		return 'ProductDataModel';
	}

	getDefaultModelData() {
		const data = super.getDefaultModelData();
		const additionalData = {
			quantity: 1,
			coupon: ''
		};

		Object.keys(additionalData).forEach((k) => {
			data[k] = additionalData[k];
		});

		return data;
	}

};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotImplementedError = __webpack_require__(3);
// const resolve = require('swiv/src/utils/resolve');

module.exports = function () {
	function AbstractInsiteMapper() {
		_classCallCheck(this, AbstractInsiteMapper);

		this.pipes = [];
	}

	_createClass(AbstractInsiteMapper, [{
		key: 'getMappedData',
		value: function getMappedData(data, event) {
			var mainData = this.getMappedMainData(data, event);
			var miscData = this.getMiscData(data);

			var dataProps = data instanceof Array ? [] : Object.keys(data);
			var miscDataProps = Object.keys(miscData);
			var miscIsMain = dataProps.every(function (val) {
				return miscDataProps.indexOf(val) > -1;
			});

			var mappedData = {
				main: mainData
			};

			if (mainData instanceof Array || !miscIsMain) {
				mappedData.misc = miscData;
			}

			return mappedData;
		}
	}, {
		key: 'getMappedMainData',
		value: function getMappedMainData(data, event) {
			var _this = this;

			var mappedData = [];
			this.getDataCollection(data).forEach(function (item) {
				var dataModel = _this.getModel();
				_this.executePipeline(dataModel, item, data, event);
				mappedData.push(dataModel.getData());
			});

			return mappedData;
		}
	}, {
		key: 'getMiscData',
		value: function getMiscData(data) {
			return data.misc || {};
		}
	}, {
		key: 'getMainDataKeys',
		value: function getMainDataKeys() {
			return ['main'];
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
		value: function executePipeline(dataModel) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			this.pipes.sort(function (a, b) {
				return a.order > b.order;
			}).forEach(function (pipeData) {
				pipeData.pipe.apply(pipeData, [dataModel].concat(args));
			});

			this.cleanDataModel(dataModel);
		}
	}, {
		key: 'cleanDataModel',
		value: function cleanDataModel(dataModel) {
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
			return this.getModel().modelName;
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

"use strict";


module.exports = class NotImplementedError extends Error {

	constructor(method) {
		// eslint-disable-next-line no-caller
		super(`Method ${(method || arguments.callee.caller.name)}() must be implemented.`);
	}

};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractDataModel = __webpack_require__(5);

module.exports = class ActionFieldDataModel extends AbstractDataModel {

	static get modelName() {
		return 'ActionFieldDataModel';
	}

};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractModel = __webpack_require__(8);

module.exports = class AbstractDataModel extends AbstractModel {

	getRequiredFields() {
		return {};
	}

};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractDataModel = __webpack_require__(5);

module.exports = class ImpressionDataModel extends AbstractDataModel {

	static get modelName() {
		return 'ImpressionDataModel';
	}

	getDefaultModelData() {
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

	getRequiredFields() {
		return {
			id: (product) => {
				return !product.name;
			},
			name: (product) => {
				return !product.id;
			}
		};
	}

};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractDataModel = __webpack_require__(5);

module.exports = class PromotionDataModel extends AbstractDataModel {

	static get modelName() {
		return 'PromotionDataModel';
	}

	getDefaultModelData() {
		return {
			id: '',
			name: '',
			creative: '',
			position: ''
		};
	}

	getRequiredFields() {
		return {
			id: (promotion, event) => {
				return ['purchase', 'refund'].indexOf(event.modelName) !== -1;
			}
		};
	}

};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const NotImplementedError = __webpack_require__(3);
let _configs;

module.exports = class AbstractModel {

	static get modelName() {
		throw new NotImplementedError();
	}

	constructor(data = {}) {
		_configs = _configs || __webpack_require__(9);
		this.map(this.getDefaultModelData()).map(data);
	}

	map(data) {
		for (const prop in data) {
			if (typeof data[prop] !== 'undefined') {
				this.set(prop, data[prop], data);
			}
		}

		return this;
	}

	set(prop, value, context) {
		this[prop] = this.mapPropertyValue(prop, value, context);

		return this;
	}

	getData() {
		const data = {};
		const whitelistedFunctions = this.getWhitelistedFunctions();

		for (const prop in this) {
			if (typeof this[prop] !== 'undefined') {
				const type = typeof this[prop];

				if (type !== 'undefined' && (typeof this[prop] !== 'function' || whitelistedFunctions.indexOf(prop) !== -1)) {
					data[prop] = this[prop];
				}
			}
		}

		return data;
	}

	getConfigRepository() {
		return _configs;
	}

	getWhitelistedFunctions() {
		return [];
	}

	mapPropertyValue(prop, value, context = {}) { // eslint-disable-line no-unused-vars
		return value;
	}

	getDefaultModelData() {
		return {};
	}

	get modelName() {
		return this.constructor.modelName;
	}

};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultConfigs = __webpack_require__(19);

const _config = {};

class ConfigRepository {

	get(key, defaultValue = null) {
		return this.has(key) ? _config[key] : defaultValue;
	}

	set(key, value) {
		_config[key] = value;

		if (!(Object.getOwnPropertyDescriptor(this, key) || {}).get) {
			Object.defineProperty(this, key, {
				get: function() {
					return this.get(key);
				},
				set: function(v) {
					this.set(key, v);
				}
			});
		}

		return this;
	}

	has(key) {
		return typeof _config[key] !== 'undefined';
	}

	remove(key) {
		delete _config[key];

		return this;
	}

	all() {
		const constantsCopy = {};

		for (const key in _config) {
			if (typeof _config[key] !== 'undefined') {
				constantsCopy[key] = _config[key];
			}
		}

		return constantsCopy;
	}

}

const configs = new ConfigRepository();

for (const key in defaultConfigs) {
	if (defaultConfigs[key]) {
		configs.set(key, defaultConfigs[key]);
	}
}

module.exports = configs;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var ImpressionDataModel = __webpack_require__(6);

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
			if (data.main) {
				return data.main instanceof Array ? data.main : [data.main];
			}

			return data.products || (data instanceof Array ? data : [data.main || data.product || data]);
		}
	}, {
		key: 'cleanDataModel',
		value: function cleanDataModel(dataModel) {
			_get(InsiteProductDataModelMapper.prototype.__proto__ || Object.getPrototypeOf(InsiteProductDataModelMapper.prototype), 'cleanDataModel', this).call(this, dataModel);
			this.cleanQuantity(dataModel);
			if (!dataModel.list) {
				delete dataModel.list;
			}
		}
	}, {
		key: 'cleanQuantity',
		value: function cleanQuantity(dataModel) {
			delete dataModel.quantity;
		}
	}]);

	return InsiteProductDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42)];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16)();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var InsiteMapperService = __webpack_require__(17);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function InsiteMapperService() {
		var _this = this;

		_classCallCheck(this, InsiteMapperService);

		var mappers = [{
			mapper: __webpack_require__(18),
			defaultPipes: __webpack_require__(34)
		}, {
			mapper: __webpack_require__(10),
			defaultPipes: __webpack_require__(11)
		}, {
			mapper: __webpack_require__(43),
			defaultPipes: __webpack_require__(44)
		}, {
			mapper: __webpack_require__(48),
			defaultPipes: __webpack_require__(49)
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
			var mappedData = mapper ? mapper.getMappedData(data, event) : data;

			if (mappedData && (mappedData.constructor !== Array || mappedData.length > 0)) {
				var mainData = mappedData.main || mappedData;
				var miscData = mappedData.misc || null;

				event.setMainData(mainData);

				if (miscData) {
					this.merge(event.ecommerce, miscData);
				}

				return event.getData();
			}

			return null;
		}
	}, {
		key: 'merge',
		value: function merge(target, data) {
			var _this2 = this;

			Object.keys(data).forEach(function (key) {
				if (_typeof(data[key]) === 'object' && data[key]) {
					target[key] = target[key] || (data[key] instanceof Array ? [] : {});
					_this2.merge(target[key], data[key]);
				} else {
					target[key] = data[key];
				}
			});
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
			return this.mappers[event] || this.mappers[event.getMainDataType().modelName] || null;
		}
	}]);

	return InsiteMapperService;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(2);
var ActionFieldDataModel = __webpack_require__(4);

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
	}, {
		key: 'getMappedData',
		value: function getMappedData(data) {
			return data;
		}
	}]);

	return InsiteActionFieldDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	dataLayer: 'dataLayer',
	gtm: 'google_tag_manager',
	eventPrefix: 'swiv.gee.',
	events: [
		__webpack_require__(20),
		__webpack_require__(23),
		__webpack_require__(24),
		__webpack_require__(25),
		__webpack_require__(26),
		__webpack_require__(27),
		__webpack_require__(28),
		__webpack_require__(29),
		__webpack_require__(30),
		__webpack_require__(31),
		__webpack_require__(32),
		__webpack_require__(33)
	]
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);

module.exports = class DefaultEventModel extends AbstractEventModel {

	static get modelName() {
		return 'DefaultEventModel';
	}

	getDefaultModelData() {
		return {
			ecommerce: {}
		};
	}

	getMainDataKey() {
		return 'ecommerce';
	}

	getMainDataType() {
		return Object;
	}

};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (path, obj = {}) => {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, obj);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (obj, predicate) => {
	const result = {};

	Object.keys(obj).forEach((key) => {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	});

	return result;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductModel = __webpack_require__(1);

module.exports = class AddToCartEventModel extends AbstractEventModel {

	static get modelName() {
		return 'AddToCartEventModel';
	}

	getDefaultModelData() {
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

	getMainDataKey() {
		return 'ecommerce.add.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductModel = __webpack_require__(1);

module.exports = class CheckoutEventModel extends AbstractEventModel {

	static get modelName() {
		return 'CheckoutEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'checkout',
			ecommerce: {
				checkout: {
					actionField: {},
					products: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.checkout.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ActionFieldModel = __webpack_require__(4);

module.exports = class CheckoutOptionEventModel extends AbstractEventModel {

	static get modelName() {
		return 'CheckoutOptionEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'checkoutOption',
			ecommerce: {
				checkout_option: { // eslint-disable-line camelcase
					actionField: {}
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.checkout_option.actionField';
	}

	getMainDataType() {
		return ActionFieldModel;
	}

};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ImpressionDataModel = __webpack_require__(6);

module.exports = class ProductImpressionEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductImpressionEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'productImpression',
			ecommerce: {
				currencyCode: this.getConfigRepository().get('currencyCode', 'USD'),
				impressions: []
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.impressions';
	}

	getMainDataType() {
		return ImpressionDataModel;
	}

};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductModel = __webpack_require__(1);

module.exports = class ProductClickEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductClickEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'productClick',
			ecommerce: {
				click: {
					actionField: {},
					products: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.click.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductModel = __webpack_require__(1);

module.exports = class ProductDetailEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductDetailEventModel';
	}

	getDefaultModelData() {
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

	getMainDataKey() {
		return 'ecommerce.detail.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const PromotionModel = __webpack_require__(7);

module.exports = class PromoClickEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PromoClickEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'promotionClick',
			ecommerce: {
				promoClick: {
					promotions: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.promoClick.promotions';
	}

	getMainDataType() {
		return PromotionModel;
	}

};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const PromotionModel = __webpack_require__(7);

module.exports = class PromoViewEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PromoViewEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'promotionView',
			ecommerce: {
				promoView: {
					promotions: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.promoView.promotions';
	}

	getMainDataType() {
		return PromotionModel;
	}

};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductDataModel = __webpack_require__(1);

module.exports = class PurchaseEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PurchaseEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'purchase',
			ecommerce: {
				purchase: {
					actionField: {},
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.purchase.products';
	}

	getMainDataType() {
		return ProductDataModel;
	}

};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ActionFieldModel = __webpack_require__(4);

module.exports = class RefundEventModel extends AbstractEventModel {

	static get modelName() {
		return 'RefundEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'refund',
			ecommerce: {
				refund: {
					actionField: new ActionFieldModel()
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.refund.actionField';
	}

	getMainDataType() {
		return ActionFieldModel;
	}

};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbstractEventModel = __webpack_require__(0);
const ProductModel = __webpack_require__(1);

module.exports = class RemoveFromCartEventModel extends AbstractEventModel {

	static get modelName() {
		return 'RemoveFromCartEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'removeFromCart',
			ecommerce: {
				remove: {
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.remove.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = [];

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.id = productDto.productId || productDto.id;
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
	productImpressionDataModel.list = context.list || (context.common ? context.common.list : null) || (context.properties ? context.properties.list : null);
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	if (productDto.properties) {
		productImpressionDataModel.brand = productDto.properties.brand;
	}
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var resolveCategory = function resolveCategory(productDto, context) {
	if (context.common && context.common.category) {
		return context.common.category;
	}

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

var getPositionFromPagination = function getPositionFromPagination(pagination, products, productDto) {
	var page = pagination ? pagination.currentPage : 1;
	var perPage = pagination ? pagination.pageSize : 1;
	var pos = 0;

	for (var i = products.length - 1; i >= 0; i--) {
		if (products[i].id === productDto.id) {
			pos = i;
			break;
		}
	}

	return (page - 1) * perPage + pos + 1;
};

module.exports = function (productImpressionDataModel, productDto, context) {
	delete productImpressionDataModel.position;
	if (context.common && context.common.position) {
		productImpressionDataModel.position = context.common.position;
	} else if (productDto.properties && productDto.properties.position) {
		productImpressionDataModel.position = productDto.properties.position;
	} else if (context.common && context.common.pagination) {
		productImpressionDataModel.position = getPositionFromPagination(context.common.pagination, context.main, productDto);
	} else if (context.products) {
		productImpressionDataModel.position = getPositionFromPagination(context.pagination, context.products, productDto);
	}

	if (productImpressionDataModel.position) {
		productImpressionDataModel.position = parseInt(productImpressionDataModel.position, 10);
	}
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var getPricing = function getPricing(productDto) {
	if (productDto.pricing && !productDto.pricing.requiresRealTimePrice && productDto.pricing.unitNetPrice && (typeof productDto.canShowPrice === 'undefined' || productDto.canShowPrice) && productDto.canAddToCart) {
		return productDto.pricing.unitNetPrice.toFixed(2);
	}

	return undefined;
};

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.price = getPricing(productDto);
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
var PromotionDataModel = __webpack_require__(7);

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
	}, {
		key: 'getDataCollection',
		value: function getDataCollection(data) {
			if (data.main) {
				return data.main instanceof Array ? data.main : [data.main];
			}

			return data instanceof Array ? data : [data];
		}
	}]);

	return InsitePromotionDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(45), __webpack_require__(46), __webpack_require__(47)];

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel, promotionDto) {
	promotionDataModel.id = promotionDto.id;
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel, promotionDto) {
	promotionDataModel.name = promotionDto.promotionCode || promotionDto.name;
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel) {
	promotionDataModel.position = 'checkout';
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImpressionMapper = __webpack_require__(10);
var ProductDataModel = __webpack_require__(1);

module.exports = function (_ImpressionMapper) {
	_inherits(InsiteProductDataModelMapper, _ImpressionMapper);

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
		key: 'cleanQuantity',
		value: function cleanQuantity() {
			// eslint-disable-line no-empty-function
		}
	}]);

	return InsiteProductDataModelMapper;
}(ImpressionMapper);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11).concat([__webpack_require__(50), __webpack_require__(51)]);

/***/ }),
/* 50 */
/***/ (function(module, exports) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function (productDataModel, productDto, context, event) {
	var properties = productDto.properties || {};
	if (['productClick', 'productDetail'].indexOf(event.event) === -1 && productDataModel.price && typeof productDataModel.quantity !== 'undefined') {
		var _filter = [productDto.qtyAdded, productDto.qtyRemoved, properties.qtyAdded, properties.qtyRemoved, context.qtyAdded, context.qtyRemoved, productDto.qtyOrdered].filter(function (value) {
			return typeof value !== 'undefined';
		});

		var _filter2 = _slicedToArray(_filter, 1);

		productDataModel.quantity = _filter2[0];
	} else {
		delete productDataModel.quantity;
	}
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (productDataModel) {
	if (productDataModel.coupon === '') {
		delete productDataModel.coupon;
	}
};

/***/ })
/******/ ]);