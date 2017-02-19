/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tab = __webpack_require__(2);
var footer = __webpack_require__(1);

function tabList(tabListData) {
  return JSON.parse(tabListData).reduce(function (acc, story) {
    var tabItem = tab(story);
    var checked = story.source === "RK" ? "checked" : "";
    var attribution = story.source === "RK" ? "RisingKashmir" : "GreaterKashmir";
    var tabWrapper = '\n<div class="tab">\n  <input type="radio" id="tab__' + story.source + '" name="news" class="radio" ' + checked + ' />\n  <label for="tab__' + story.source + '" class="label label__' + story.source + '">' + story.source + '</label>\n  <ul class="tab-list ' + story.source + '">\n    <h1 class="attribution">Source: <a href="http://' + attribution.toLowerCase() + '.com">' + attribution + '</a></h1>\n    ' + tabItem + '\n    ' + footer + '\n  </ul>\n</div>\n    ';
    acc += tabWrapper;

    return acc;
  }, '');
};

module.exports = tabList;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var footer = "<footer>\n    <hr />\n    <p><a href=\"https://bassam.co\">Bassam Ismail</a> &middot; <a href=\"https://twitter.com/skippednote\">@skippednote</a></p>\n</footer>";

module.exports = footer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function tab(story) {
  return story.data.reduce(function (acc, item) {
    var url = story.source === "RK" ? "http://www.risingkashmir.com/news/" : "http://www.greaterkashmir.com";
    var content = item.content ? "<p>" + item.content + "</p>" : "";
    var storyItem = "\n<li class=\"tab-item\">\n  <h3 class=\"tab-title\">\n    <a href=" + url + item.url + ">" + item.title + "</a>\n  </h3>\n  " + content + "\n</li>\n    ";
    acc += storyItem;

    return acc;
  }, '');
}

module.exports = tab;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tabList = __webpack_require__(0);

var _tabList2 = _interopRequireDefault(_tabList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.querySelector('.news');

if (localStorage.getItem("news")) {
    var markup = (0, _tabList2.default)(localStorage.getItem("news"));
    container.innerHTML = markup;
}
getNews();

function getNews() {
    fetch("http://kashmirnews.herokuapp.com/api/all").then(function (blob) {
        return blob.json();
    }).then(function (json) {
        localStorage.setItem("news", JSON.stringify(json));
        return json;
    }).then(function () {
        return (0, _tabList2.default)(localStorage.getItem("news"));
    }).then(function (markup) {
        return container.innerHTML = markup;
    });
}

/***/ })
/******/ ]);