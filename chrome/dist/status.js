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

/***/ "./src/scripts/status.js":
/*!*******************************!*\
  !*** ./src/scripts/status.js ***!
  \*******************************/
/***/ (() => {

eval("function disparaListeners() {\r\n\r\n}\r\n\r\nwindow.onload = function () {\r\n\twindow.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;\r\n\twindow.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;\r\n\twindow.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;\r\n\r\n\tif (typeof db != 'Object') {\r\n\t\tvar DBOpenRequest = window.indexedDB.open(\"tourmaline\", 1);\r\n\r\n\t\tDBOpenRequest.onsuccess = function (event) {\r\n\t\t\tdb = DBOpenRequest.result;\r\n\t\t\tdisplayStatus()\r\n\t\t};\r\n\r\n\t\tDBOpenRequest.onupgradeneeded = function (event) {\r\n\t\t\tdb = event.target.result\r\n\r\n\t\t\tdbUpgrade(db);\r\n\t\t}\r\n\t} else {\r\n\t\tdisplayStatus()\r\n\t}\r\n\t//disparaListeners();\r\n};\r\n\r\nfunction displayStatus() {\r\n\tvar transaction = db.transaction(['preferencia'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('preferencia');\r\n\tvar request = objectStore.get(1);\r\n\r\n\tvar upData = document.getElementById('upData');\r\n\r\n\trequest.onsuccess = function (evt) {\r\n\t\tvar value = request.result;\r\n\r\n\t\tupData.innerHTML = value.upData;\r\n\t\tgetTotalCategoria();\r\n\t\tgetTotalSite();\r\n\t\tgetTotalPalavra();\r\n\t};\r\n}\r\n\r\nfunction getTotalCategoria() {\r\n\tvar upCategoria = document.getElementById('upCategoria');\r\n\tvar transaction = db.transaction(['categoria'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('categoria');\r\n\r\n\t//var indice = objectStore.index('id'); \r\n\tvar countRequest = objectStore.count();\r\n\tcountRequest.onsuccess = function () {\r\n\t\tupCategoria.innerHTML = countRequest.result;\r\n\t}\r\n}\r\n\r\nfunction getTotalSite() {\r\n\tvar upSite = document.getElementById('upSite');\r\n\tvar transaction = db.transaction(['site'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('site');\r\n\r\n\t//var indice = objectStore.index('id'); \r\n\tvar countRequest = objectStore.count();\r\n\tcountRequest.onsuccess = function () {\r\n\t\tupSite.innerHTML = countRequest.result;\r\n\t}\r\n}\r\n\r\nfunction getTotalPalavra() {\r\n\tvar upPalavra = document.getElementById('upPalavra');\r\n\tvar transaction = db.transaction(['palavra'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('palavra');\r\n\r\n\tvar countRequest = objectStore.count();\r\n\tcountRequest.onsuccess = function () {\r\n\t\tupPalavra.innerHTML = countRequest.result;\r\n\t}\r\n}\n\n//# sourceURL=webpack://tourmaline-ext/./src/scripts/status.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/status.js"]();
/******/ 	
/******/ })()
;