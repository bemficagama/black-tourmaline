/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/logout.js":
/*!*******************************!*\
  !*** ./src/scripts/logout.js ***!
  \*******************************/
/***/ (() => {

eval("window.onload = function() {\r\n  logout();\r\n}\r\n\r\nfunction logout() {\r\n\tif (localStorage['adminMode'] == '1') {\r\n\t\tlocalStorage['adminMode'] = '0';\r\n\t\twindow.location.href=\"login.html\";\r\n\t\treturn;\r\n\t}\r\n}\n\n//# sourceURL=webpack://tourmaline-ext/./src/scripts/logout.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/logout.js"]();
/******/ 	
/******/ })()
;