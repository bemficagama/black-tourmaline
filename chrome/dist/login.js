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

/***/ "./src/scripts/login.js":
/*!******************************!*\
  !*** ./src/scripts/login.js ***!
  \******************************/
/***/ (() => {

eval("var db = {};\r\n\r\nfunction disparaListeners() {\r\n\tvar botaoLogin = document.getElementById(\"botaoLogin\");\r\n\t\r\n\tbotaoLogin.onclick = function (e) {\r\n\t\te.preventDefault();\r\n\t\tlogin();\r\n\t}\r\n}\r\n\r\nfunction login() {\r\n\tvar senha = document.getElementById('senha').value;\r\n\t\r\n\tvar transaction = db.transaction(['user'], 'readonly');\r\n\tvar objectStore = transaction.objectStore('user');\r\n\tvar request = objectStore.get(\"admin\");\r\n\t\r\n\trequest.onsuccess = function(evt) {\r\n\t\tvar value = request.result;\r\n\t\t\r\n\t\tif (value.senha == senha) {\r\n\t\t\tsessionStorage.adminMode = 1;\r\n\t\t\twindow.frameElement.ownerDocument.location.href =\"opcoes.html?op=1\";\r\n\t\t} else {\r\n\t\t\tsenha = \"\";\r\n\t\t\talert(\"Senha Inválida!\");\r\n\t\t}\r\n\t\t\r\n\t};\r\n}\r\n\r\nfunction imprimeMensagem(msg) {\r\n\tvar mensagem = document.querySelector('#mensagem');\r\n\tmensagem.innerHTML = msg;\r\n\tsessionStorage.setItem(\"mensagem\", msg);\r\n\tsetTimeout(function() {\r\n\t\t$(\"#mensagem\").html(\"\");\r\n\t\tsessionStorage.setItem(\"mensagem\", \"\");\r\n\t}, 4000);\r\n}\r\n\r\nwindow.onload = function() {\r\n\t\r\nconst request = window.indexedDB.open(\"tourmaline\", 1);\r\n\t\r\n\t\r\n\trequest.onsuccess = function(event) {\r\n\t\tdb = request.result;\r\n\t\tdisparaListeners();\r\n\t};\r\n\t\r\n\trequest.onupgradeneeded = function(event) {\r\n\t\tdb = event.target.result\r\n\r\n\t\tdbUpgrade(db);\r\n\t}\r\n};\r\n\r\n\n\n//# sourceURL=webpack://tourmaline-ext/./src/scripts/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/login.js"]();
/******/ 	
/******/ })()
;