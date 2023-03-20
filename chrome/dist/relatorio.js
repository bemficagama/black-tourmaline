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

/***/ "./src/scripts/relatorio.js":
/*!**********************************!*\
  !*** ./src/scripts/relatorio.js ***!
  \**********************************/
/***/ (() => {

eval("var db = {};\r\n\r\nwindow.onload = function () {\r\n\twindow.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;\r\n\twindow.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;\r\n\twindow.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;\r\n\t\r\n\tvar DBOpenRequest = window.indexedDB.open(\"tourmaline\", 1);\r\n\r\n\tDBOpenRequest.onsuccess = function(event) {\r\n\t\tdb = DBOpenRequest.result;\r\n\t\tdisparaListeners();\r\n\t}\r\n\t\r\n\tDBOpenRequest.onupgradeneeded = function(event) {\r\n\t\tdb = event.target.result\r\n\r\n    \tdbUpgrade(db);\r\n\t}\r\n};\r\n\r\nfunction disparaListeners() {\r\n\tvar botaoPesquisar = document.getElementById(\"botaoPesquisar\");\r\n\r\n\tbotaoPesquisar.onclick = function () {\r\n\t    console.log(\"Pesquisar ...\");\r\n\t    displayResultados();\r\n\t}\r\n}\r\n\r\n/**\r\n * @param {IDBObjectStore=} store\r\n */\r\nfunction displayResultados() {\r\n\tvar resultadoList = document.getElementById('resultadoList');\r\n\tvar dataInicial = document.getElementById(\"edDataInicial\").value;\r\n\tvar dataFinal = document.getElementById(\"edDataFinal\").value;\r\n\t\r\n\twhile(resultadoList.tBodies[0].hasChildNodes()){                \r\n\t\tresultadoList.tBodies[0].removeChild(resultadoList.tBodies[0].firstChild);\r\n\t}\r\n\tconsole.log(\"display resultadoList\");\r\n\r\n\tvar transaction = db.transaction(['acesso'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('acesso');\r\n\tvar indice = objectStore.index('data');\r\n\t\r\n\tdataInicial = new Date(dataInicial);\r\n\tdataFinal = new Date(dataFinal);\r\n\t\r\n\trange = IDBKeyRange.bound(dataInicial.toJSON(), dataFinal.toJSON());\r\n \r\n\tindice.openCursor(range).onsuccess = function(evt) {\r\n\t\tvar cursor = evt.target.result;\r\n\t\t// If the cursor is pointing at something, ask for the data\r\n\t\tif (cursor) {\r\n\t\t\tvar value = cursor.value;\r\n\t\t\t\r\n\t\t\tvar linha = resultadoList.tBodies[0].insertRow(-1);\r\n\t\t\tvar celula1 = linha.insertCell(-1);\r\n\t\t\tvar celula2 = linha.insertCell(-1);\r\n\t\t\tvar celula3 = linha.insertCell(-1);\r\n\t\t\tcelula1.innerHTML = new Date(value.data).toLocaleDateString();\r\n\t\t\tcelula2.innerHTML = value.url;\r\n\t\t\tcelula3.innerHTML = (value.bloqueado == \"true\" ? \"Bloqueado\" : \"\");\r\n\t\t\tcelula1.style.width = \"70px\";\r\n\t\t\tcelula2.style.width = \"300px\";\r\n\t\t\r\n\t\t\t// Move on to the next object in store\r\n\t\t\tcursor.continue();\r\n\t\t\r\n\t\t// This counter serves only to create distinct ids\r\n\t\t} else {\r\n\t\t\tconsole.log(\"No more entries: Acesso\");\r\n\t\t}\r\n\t};\r\n}\n\n//# sourceURL=webpack://tourmaline-ext/./src/scripts/relatorio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/relatorio.js"]();
/******/ 	
/******/ })()
;