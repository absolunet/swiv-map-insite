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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotImplementedError = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"swiv/src/gee/error/not-implemented\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);
var ImpressionDataModel = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"swiv/src/gee/model/data/impression\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18)];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7)();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var InsiteMapperService = __webpack_require__(8);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function InsiteMapperService() {
		var _this = this;

		_classCallCheck(this, InsiteMapperService);

		var mappers = [{
			mapper: __webpack_require__(9),
			defaultPipes: __webpack_require__(10)
		}, {
			mapper: __webpack_require__(1),
			defaultPipes: __webpack_require__(2)
		}, {
			mapper: __webpack_require__(19),
			defaultPipes: __webpack_require__(20)
		}, {
			mapper: __webpack_require__(24),
			defaultPipes: __webpack_require__(25)
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);
var ActionFieldDataModel = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"swiv/src/gee/model/data/action-field\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
/* 10 */
/***/ (function(module, exports) {

module.exports = [];

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.id = productDto.productId || productDto.id;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.name = productDto.shortDescription;
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto, context) {
	productImpressionDataModel.list = context.list || (context.common ? context.common.list : null) || (context.properties ? context.properties.list : null);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	if (productDto.properties) {
		productImpressionDataModel.brand = productDto.properties.brand;
	}
};

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

module.exports = function (productImpressionDataModel, productDto) {
	productImpressionDataModel.variant = productDto.name || productDto.shortDescription;

	if (productImpressionDataModel.variant === productImpressionDataModel.name) {
		delete productImpressionDataModel.variant;
	}
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);
var PromotionDataModel = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"swiv/src/gee/model/data/promotion\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(21), __webpack_require__(22), __webpack_require__(23)];

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel, promotionDto) {
	promotionDataModel.id = promotionDto.id;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel, promotionDto) {
	promotionDataModel.name = promotionDto.promotionCode || promotionDto.name;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (promotionDataModel) {
	promotionDataModel.position = 'checkout';
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImpressionMapper = __webpack_require__(1);
var ProductDataModel = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"swiv/src/gee/model/data/product\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).concat([__webpack_require__(26), __webpack_require__(27)]);

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports) {

module.exports = function (productDataModel) {
	if (productDataModel.coupon === '') {
		delete productDataModel.coupon;
	}
};

/***/ })
/******/ ]);