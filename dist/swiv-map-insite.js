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

const AbstractModel = __webpack_require__(8);
const NotImplementedError = __webpack_require__(4).default;
const resolve = __webpack_require__(20);
const filter = __webpack_require__(21);
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

var NotImplementedError = __webpack_require__(4);

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

const AbstractDataModel = __webpack_require__(5);

module.exports = class ActionFieldDataModel extends AbstractDataModel {

	static get modelName() {
		return 'ActionFieldDataModel';
	}

};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = class NotImplementedError extends Error {

	constructor(method) {
		// eslint-disable-next-line no-caller
		super(`Method ${(method || arguments.callee.caller.name)}() must be implemented.`);
	}

};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractModel = __webpack_require__(8);

module.exports = class AbstractDataModel extends AbstractModel {

	getRequiredFields() {
		return {};
	}

};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

const NotImplementedError = __webpack_require__(4);
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

const defaultConfigs = __webpack_require__(18);

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
			return this.mappers[event] || this.mappers[event.getMainDataType().modelName] || null;
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
	events: [
		__webpack_require__(19),
		__webpack_require__(22),
		__webpack_require__(23),
		__webpack_require__(24),
		__webpack_require__(25),
		__webpack_require__(26),
		__webpack_require__(27),
		__webpack_require__(28),
		__webpack_require__(29),
		__webpack_require__(30),
		__webpack_require__(31),
		__webpack_require__(32)
	]
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (path, obj = {}) => {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, obj);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = (obj, predicate) => {
	const result = {};

	for (const key in obj) {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	}

	return result;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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
				actionField: {
					step: 1,
					option: this.getConfigRepository().get('defaultCreditCard', '')
				},
				products: []
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractEventModel = __webpack_require__(0);
const ActionFieldModel = __webpack_require__(3);

module.exports = class CheckoutOptionEventModel extends AbstractEventModel {

	static get modelName() {
		return 'CheckoutOptionEventModel';
	}

	getDefaultModelData() {
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

	getMainDataKey() {
		return 'ecommerce.checkout_option.actionField';
	}

	getMainDataType() {
		return ActionFieldModel;
	}

};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractEventModel = __webpack_require__(0);
const ActionFieldModel = __webpack_require__(3);

module.exports = class PurchaseEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PurchaseEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'purchase',
			ecommerce: {
				purchase: {
					actionField: new ActionFieldModel()
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.purchase.actionField';
	}

	getMainDataType() {
		return ActionFieldModel;
	}

};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractEventModel = __webpack_require__(0);
const ActionFieldModel = __webpack_require__(3);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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
	if (productDto.properties) {
		productImpressionDataModel.brand = productDto.properties.brand;
	}
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
	delete productImpressionDataModel.position;

	if (productDto.properties && productDto.properties.position) {
		productImpressionDataModel.position = parseInt(productDto.properties.position, 10);
	} else if (context.products) {
		var page = context.pagination ? context.pagination.currentPage : 1;
		var perPage = context.pagination ? context.pagination.pageSize : 1;
		var pos = 0;

		for (var i = context.products.length - 1; i >= 0; i--) {
			if (context.products[i].id === productDto.id) {
				pos = i;
				break;
			}
		}

		productImpressionDataModel.position = (page - 1) * perPage + pos + 1;
	}
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var getPricing = function getPricing(productDto) {
	if (productDto.pricing && productDto.pricing.unitListPrice && productDto.canShowPrice && productDto.canAddToCart) {
		return productDto.pricing.unitListPrice.toFixed(2);
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