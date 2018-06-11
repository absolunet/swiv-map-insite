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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function AbstractInsiteMapper() {
        _classCallCheck(this, AbstractInsiteMapper);
    }

    _createClass(AbstractInsiteMapper, [{
        key: 'map',
        value: function map(data) {
            return data;
        }
    }, {
        key: 'getModelName',
        value: function getModelName() {
            return this.constructor.name.replace(/^Insite(.*)Mapper$/, '$1');
        }
    }]);

    return AbstractInsiteMapper;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

if (window.swiv && window.swiv.gee) {
    var InsiteMapperService = __webpack_require__(5);
    window.swiv.gee.setMapperService(new InsiteMapperService());
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function InsiteMapperService() {
        var _this = this;

        _classCallCheck(this, InsiteMapperService);

        var mappers = [__webpack_require__(6), __webpack_require__(7), __webpack_require__(8)];

        this.mappers = {};

        mappers.forEach(function (Mapper) {
            var mapper = new Mapper();
            _this.mappers[mapper.getModelName()] = mapper;
        });
    }

    _createClass(InsiteMapperService, [{
        key: 'map',
        value: function map(data, event) {
            var mapper = this.getDedicatedMapper(event.getMainDataType().name);

            if (mapper) {
                event.setMainData(mapper.map(data));
            }

            return event.getData();
        }
    }, {
        key: 'getDedicatedMapper',
        value: function getDedicatedMapper(event) {
            return this.mappers[event] || null;
        }
    }]);

    return InsiteMapperService;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);

module.exports = function (_AbstractInsiteMapper) {
    _inherits(InsiteActionFieldDataModelMapper, _AbstractInsiteMapper);

    function InsiteActionFieldDataModelMapper() {
        _classCallCheck(this, InsiteActionFieldDataModelMapper);

        return _possibleConstructorReturn(this, (InsiteActionFieldDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteActionFieldDataModelMapper)).apply(this, arguments));
    }

    _createClass(InsiteActionFieldDataModelMapper, [{
        key: 'map',
        value: function map(data) {
            return data;
        }
    }]);

    return InsiteActionFieldDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);

module.exports = function (_AbstractInsiteMapper) {
    _inherits(InsitePromotionDataModelMapper, _AbstractInsiteMapper);

    function InsitePromotionDataModelMapper() {
        _classCallCheck(this, InsitePromotionDataModelMapper);

        return _possibleConstructorReturn(this, (InsitePromotionDataModelMapper.__proto__ || Object.getPrototypeOf(InsitePromotionDataModelMapper)).apply(this, arguments));
    }

    _createClass(InsitePromotionDataModelMapper, [{
        key: 'map',
        value: function map(data) {
            return data;
        }
    }]);

    return InsitePromotionDataModelMapper;
}(AbstractInsiteMapper);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInsiteMapper = __webpack_require__(0);

module.exports = function (_AbstractInsiteMapper) {
    _inherits(InsiteProductDataModelMapper, _AbstractInsiteMapper);

    function InsiteProductDataModelMapper() {
        _classCallCheck(this, InsiteProductDataModelMapper);

        return _possibleConstructorReturn(this, (InsiteProductDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteProductDataModelMapper)).apply(this, arguments));
    }

    _createClass(InsiteProductDataModelMapper, [{
        key: 'map',
        value: function map(data) {
            var _this2 = this;

            return (data.products || [data.product || data]).map(function (productDto) {
                return _this2.mapOne(productDto);
            });
        }
    }, {
        key: 'mapOne',
        value: function mapOne(productDto) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var product = {
                id: productDto.id,
                name: productDto.name,
                list: 'Detail Page',
                brand: productDto.properties.brand || '',
                category: productDto.properties.category || '',
                variant: '',
                position: 1,
                price: productDto.pricing.unitListPrice
            };

            Object.keys(data).forEach(function (k) {
                product[k] = data[k];
            });

            return product;
        }
    }]);

    return InsiteProductDataModelMapper;
}(AbstractInsiteMapper);

/***/ })
/******/ ]);