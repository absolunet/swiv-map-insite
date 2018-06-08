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

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nmodule.exports = function () {\n    function AbstractInsiteMapper() {\n        _classCallCheck(this, AbstractInsiteMapper);\n    }\n\n    _createClass(AbstractInsiteMapper, [{\n        key: \"map\",\n        value: function map(data) {\n            return data;\n        }\n    }]);\n\n    return AbstractInsiteMapper;\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGVyL2Fic3RyYWN0L21hcHBlci5qcz8wOWNmIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUFBLE9BQU9DLE9BQVA7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLDRCQUVRQyxJQUZSLEVBRWM7QUFDTixtQkFBT0EsSUFBUDtBQUNIO0FBSkw7O0FBQUE7QUFBQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBYnN0cmFjdEluc2l0ZU1hcHBlciB7XHJcblxyXG4gICAgbWFwKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcHBlci9hYnN0cmFjdC9tYXBwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(3);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcz8yNjQ1Il0sIm5hbWVzIjpbInJlcXVpcmUiXSwibWFwcGluZ3MiOiJBQUFBLG1CQUFBQSxDQUFRLENBQVIiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vc3JjL2luZGV4Jyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

eval("if (window.swiv && window.swiv.gee) {\n    var InsiteMapperService = __webpack_require__(4);\n    window.swiv.gee.setMapperService(new InsiteMapperService());\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJzd2l2IiwiZ2VlIiwiSW5zaXRlTWFwcGVyU2VydmljZSIsInJlcXVpcmUiLCJzZXRNYXBwZXJTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxPQUFPQyxJQUFQLElBQWVELE9BQU9DLElBQVAsQ0FBWUMsR0FBL0IsRUFBb0M7QUFDaEMsUUFBTUMsc0JBQXNCLG1CQUFBQyxDQUFRLENBQVIsQ0FBNUI7QUFDQUosV0FBT0MsSUFBUCxDQUFZQyxHQUFaLENBQWdCRyxnQkFBaEIsQ0FBaUMsSUFBSUYsbUJBQUosRUFBakM7QUFDSCIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHdpbmRvdy5zd2l2ICYmIHdpbmRvdy5zd2l2LmdlZSkge1xyXG4gICAgY29uc3QgSW5zaXRlTWFwcGVyU2VydmljZSA9IHJlcXVpcmUoJy4vc2VydmljZS9tYXBwZXInKTtcclxuICAgIHdpbmRvdy5zd2l2LmdlZS5zZXRNYXBwZXJTZXJ2aWNlKG5ldyBJbnNpdGVNYXBwZXJTZXJ2aWNlKCkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ActionFieldDataModel = __webpack_require__(5);\nvar PromotionDataModelMapper = __webpack_require__(6);\nvar ProductDataModelMapper = __webpack_require__(7);\n\nmodule.exports = function () {\n    function InsiteMapperService() {\n        _classCallCheck(this, InsiteMapperService);\n\n        this.mappers = {\n            'ProductDataModel': new ProductDataModelMapper(),\n            'PromotionDataModel': new PromotionDataModelMapper(),\n            'ActionFieldDataModel': new ActionFieldDataModel()\n        };\n    }\n\n    _createClass(InsiteMapperService, [{\n        key: 'map',\n        value: function map(data, event) {\n            var dataType = event.getMainDataType().name;\n            var mapper = this.getDedicatedMapper(event.getMainDataType().name);\n\n            if (mapper) {\n                event.setMainData(mapper.map(data));\n            }\n\n            return event.getData();\n        }\n    }, {\n        key: 'getDedicatedMapper',\n        value: function getDedicatedMapper(event) {\n            return this.mappers[event] || null;\n        }\n    }]);\n\n    return InsiteMapperService;\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9tYXBwZXIuanM/YWFiNiJdLCJuYW1lcyI6WyJBY3Rpb25GaWVsZERhdGFNb2RlbCIsInJlcXVpcmUiLCJQcm9tb3Rpb25EYXRhTW9kZWxNYXBwZXIiLCJQcm9kdWN0RGF0YU1vZGVsTWFwcGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1hcHBlcnMiLCJkYXRhIiwiZXZlbnQiLCJkYXRhVHlwZSIsImdldE1haW5EYXRhVHlwZSIsIm5hbWUiLCJtYXBwZXIiLCJnZXREZWRpY2F0ZWRNYXBwZXIiLCJzZXRNYWluRGF0YSIsIm1hcCIsImdldERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSx1QkFBdUIsbUJBQUFDLENBQVEsQ0FBUixDQUE3QjtBQUNBLElBQU1DLDJCQUEyQixtQkFBQUQsQ0FBUSxDQUFSLENBQWpDO0FBQ0EsSUFBTUUseUJBQXlCLG1CQUFBRixDQUFRLENBQVIsQ0FBL0I7O0FBRUFHLE9BQU9DLE9BQVA7QUFFSSxtQ0FBYztBQUFBOztBQUNWLGFBQUtDLE9BQUwsR0FBZTtBQUNYLGdDQUFvQixJQUFJSCxzQkFBSixFQURUO0FBRVgsa0NBQXNCLElBQUlELHdCQUFKLEVBRlg7QUFHWCxvQ0FBd0IsSUFBSUYsb0JBQUo7QUFIYixTQUFmO0FBS0g7O0FBUkw7QUFBQTtBQUFBLDRCQVVRTyxJQVZSLEVBVWNDLEtBVmQsRUFVcUI7QUFDYixnQkFBTUMsV0FBV0QsTUFBTUUsZUFBTixHQUF3QkMsSUFBekM7QUFDQSxnQkFBTUMsU0FBUyxLQUFLQyxrQkFBTCxDQUF3QkwsTUFBTUUsZUFBTixHQUF3QkMsSUFBaEQsQ0FBZjs7QUFFQSxnQkFBSUMsTUFBSixFQUFZO0FBQ1JKLHNCQUFNTSxXQUFOLENBQWtCRixPQUFPRyxHQUFQLENBQVdSLElBQVgsQ0FBbEI7QUFDSDs7QUFFRCxtQkFBT0MsTUFBTVEsT0FBTixFQUFQO0FBQ0g7QUFuQkw7QUFBQTtBQUFBLDJDQXFCdUJSLEtBckJ2QixFQXFCOEI7QUFDdEIsbUJBQU8sS0FBS0YsT0FBTCxDQUFhRSxLQUFiLEtBQXVCLElBQTlCO0FBQ0g7QUF2Qkw7O0FBQUE7QUFBQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQWN0aW9uRmllbGREYXRhTW9kZWwgPSByZXF1aXJlKCcuLy4uL21hcHBlci9hY3Rpb24tZmllbGQnKTtcclxuY29uc3QgUHJvbW90aW9uRGF0YU1vZGVsTWFwcGVyID0gcmVxdWlyZSgnLi8uLi9tYXBwZXIvcHJvbW90aW9uJyk7XHJcbmNvbnN0IFByb2R1Y3REYXRhTW9kZWxNYXBwZXIgPSByZXF1aXJlKCcuLy4uL21hcHBlci9wcm9kdWN0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEluc2l0ZU1hcHBlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWFwcGVycyA9IHtcclxuICAgICAgICAgICAgJ1Byb2R1Y3REYXRhTW9kZWwnOiBuZXcgUHJvZHVjdERhdGFNb2RlbE1hcHBlcigpLFxyXG4gICAgICAgICAgICAnUHJvbW90aW9uRGF0YU1vZGVsJzogbmV3IFByb21vdGlvbkRhdGFNb2RlbE1hcHBlcigpLFxyXG4gICAgICAgICAgICAnQWN0aW9uRmllbGREYXRhTW9kZWwnOiBuZXcgQWN0aW9uRmllbGREYXRhTW9kZWwoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXAoZGF0YSwgZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGV2ZW50LmdldE1haW5EYXRhVHlwZSgpLm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gdGhpcy5nZXREZWRpY2F0ZWRNYXBwZXIoZXZlbnQuZ2V0TWFpbkRhdGFUeXBlKCkubmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChtYXBwZXIpIHtcclxuICAgICAgICAgICAgZXZlbnQuc2V0TWFpbkRhdGEobWFwcGVyLm1hcChkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXZlbnQuZ2V0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZGljYXRlZE1hcHBlcihldmVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcHBlcnNbZXZlbnRdIHx8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2UvbWFwcGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AbstractInsiteMapper = __webpack_require__(0);\n\nmodule.exports = function (_AbstractInsiteMapper) {\n    _inherits(InsiteActionFieldDataModelMapper, _AbstractInsiteMapper);\n\n    function InsiteActionFieldDataModelMapper() {\n        _classCallCheck(this, InsiteActionFieldDataModelMapper);\n\n        return _possibleConstructorReturn(this, (InsiteActionFieldDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteActionFieldDataModelMapper)).apply(this, arguments));\n    }\n\n    _createClass(InsiteActionFieldDataModelMapper, [{\n        key: 'map',\n        value: function map(data) {\n            return data;\n        }\n    }]);\n\n    return InsiteActionFieldDataModelMapper;\n}(AbstractInsiteMapper);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGVyL2FjdGlvbi1maWVsZC5qcz85YjYxIl0sIm5hbWVzIjpbIkFic3RyYWN0SW5zaXRlTWFwcGVyIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLHVCQUF1QixtQkFBQUMsQ0FBUSxDQUFSLENBQTdCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSw0QkFFUUMsSUFGUixFQUVjO0FBQ04sbUJBQU9BLElBQVA7QUFDSDtBQUpMOztBQUFBO0FBQUEsRUFBZ0VKLG9CQUFoRSIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQWJzdHJhY3RJbnNpdGVNYXBwZXIgPSByZXF1aXJlKCcuL2Fic3RyYWN0L21hcHBlcicpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBJbnNpdGVBY3Rpb25GaWVsZERhdGFNb2RlbE1hcHBlciBleHRlbmRzIEFic3RyYWN0SW5zaXRlTWFwcGVyIHtcclxuXHJcbiAgICBtYXAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXBwZXIvYWN0aW9uLWZpZWxkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AbstractInsiteMapper = __webpack_require__(0);\n\nmodule.exports = function (_AbstractInsiteMapper) {\n    _inherits(InsitePromotionDataModelMapper, _AbstractInsiteMapper);\n\n    function InsitePromotionDataModelMapper() {\n        _classCallCheck(this, InsitePromotionDataModelMapper);\n\n        return _possibleConstructorReturn(this, (InsitePromotionDataModelMapper.__proto__ || Object.getPrototypeOf(InsitePromotionDataModelMapper)).apply(this, arguments));\n    }\n\n    _createClass(InsitePromotionDataModelMapper, [{\n        key: 'map',\n        value: function map(data) {\n            return data;\n        }\n    }]);\n\n    return InsitePromotionDataModelMapper;\n}(AbstractInsiteMapper);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGVyL3Byb21vdGlvbi5qcz81Njk1Il0sIm5hbWVzIjpbIkFic3RyYWN0SW5zaXRlTWFwcGVyIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLHVCQUF1QixtQkFBQUMsQ0FBUSxDQUFSLENBQTdCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSw0QkFFUUMsSUFGUixFQUVjO0FBQ04sbUJBQU9BLElBQVA7QUFDSDtBQUpMOztBQUFBO0FBQUEsRUFBOERKLG9CQUE5RCIsImZpbGUiOiI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQWJzdHJhY3RJbnNpdGVNYXBwZXIgPSByZXF1aXJlKCcuL2Fic3RyYWN0L21hcHBlcicpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBJbnNpdGVQcm9tb3Rpb25EYXRhTW9kZWxNYXBwZXIgZXh0ZW5kcyBBYnN0cmFjdEluc2l0ZU1hcHBlciB7XHJcblxyXG4gICAgbWFwKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwcGVyL3Byb21vdGlvbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6\n");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AbstractInsiteMapper = __webpack_require__(0);\n\nmodule.exports = function (_AbstractInsiteMapper) {\n    _inherits(InsiteProductDataModelMapper, _AbstractInsiteMapper);\n\n    function InsiteProductDataModelMapper() {\n        _classCallCheck(this, InsiteProductDataModelMapper);\n\n        return _possibleConstructorReturn(this, (InsiteProductDataModelMapper.__proto__ || Object.getPrototypeOf(InsiteProductDataModelMapper)).apply(this, arguments));\n    }\n\n    _createClass(InsiteProductDataModelMapper, [{\n        key: 'map',\n        value: function map(data) {\n            return {\n                id: data.id,\n                name: data.name,\n                list: 'Detail Page',\n                brand: data.properties.brand || '',\n                category: data.properties.category || '',\n                variant: '',\n                position: 1,\n                price: data.pricing.unitListPrice\n            };\n        }\n    }]);\n\n    return InsiteProductDataModelMapper;\n}(AbstractInsiteMapper);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGVyL3Byb2R1Y3QuanM/NWQxZCJdLCJuYW1lcyI6WyJBYnN0cmFjdEluc2l0ZU1hcHBlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGF0YSIsImlkIiwibmFtZSIsImxpc3QiLCJicmFuZCIsInByb3BlcnRpZXMiLCJjYXRlZ29yeSIsInZhcmlhbnQiLCJwb3NpdGlvbiIsInByaWNlIiwicHJpY2luZyIsInVuaXRMaXN0UHJpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsdUJBQXVCLG1CQUFBQyxDQUFRLENBQVIsQ0FBN0I7O0FBRUFDLE9BQU9DLE9BQVA7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLDRCQUVRQyxJQUZSLEVBRWM7QUFDTixtQkFBTztBQUNIQyxvQkFBSUQsS0FBS0MsRUFETjtBQUVIQyxzQkFBTUYsS0FBS0UsSUFGUjtBQUdIQyxzQkFBTSxhQUhIO0FBSUhDLHVCQUFPSixLQUFLSyxVQUFMLENBQWdCRCxLQUFoQixJQUF5QixFQUo3QjtBQUtIRSwwQkFBVU4sS0FBS0ssVUFBTCxDQUFnQkMsUUFBaEIsSUFBNEIsRUFMbkM7QUFNSEMseUJBQVMsRUFOTjtBQU9IQywwQkFBVSxDQVBQO0FBUUhDLHVCQUFPVCxLQUFLVSxPQUFMLENBQWFDO0FBUmpCLGFBQVA7QUFVSDtBQWJMOztBQUFBO0FBQUEsRUFBNERmLG9CQUE1RCIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQWJzdHJhY3RJbnNpdGVNYXBwZXIgPSByZXF1aXJlKCcuL2Fic3RyYWN0L21hcHBlcicpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBJbnNpdGVQcm9kdWN0RGF0YU1vZGVsTWFwcGVyIGV4dGVuZHMgQWJzdHJhY3RJbnNpdGVNYXBwZXIge1xyXG5cclxuICAgIG1hcChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcclxuICAgICAgICAgICAgbGlzdDogJ0RldGFpbCBQYWdlJyxcclxuICAgICAgICAgICAgYnJhbmQ6IGRhdGEucHJvcGVydGllcy5icmFuZCB8fCAnJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IGRhdGEucHJvcGVydGllcy5jYXRlZ29yeSB8fCAnJyxcclxuICAgICAgICAgICAgdmFyaWFudDogJycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAxLFxyXG4gICAgICAgICAgICBwcmljZTogZGF0YS5wcmljaW5nLnVuaXRMaXN0UHJpY2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXBwZXIvcHJvZHVjdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///7\n");

/***/ })
/******/ ]);