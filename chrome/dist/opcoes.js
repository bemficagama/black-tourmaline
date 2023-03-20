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

/***/ "./src/scripts/opcoes.js":
/*!*******************************!*\
  !*** ./src/scripts/opcoes.js ***!
  \*******************************/
/***/ (() => {

eval("window.onload = function () {\r\n\tvar opcao1 = document.getElementById(\"opcao1\");\r\n\tvar opcao2 = document.getElementById(\"opcao2\");\r\n\tvar opcao3 = document.getElementById(\"opcao3\");\r\n\tvar opcao4 = document.getElementById(\"opcao4\");\r\n\tvar iframeConteudo = document.getElementById(\"iframeConteudo\");\r\n\t\r\n\tvar op = location.search.split('op=')[1];\r\n\tif (typeof op != 'undefined') {\r\n\t\tcarregar(parseInt(op));\r\n\t} else {\r\n\t\tlocation.href =\"opcoes.html?op=0\";\r\n\t}\r\n\t\t\r\n}\r\n\r\nfunction carregar(op) {\r\n\t\r\n\tif (sessionStorage.adminMode) {\r\n\t\tif (sessionStorage.adminMode != '1') {\r\n\t\t\top = 0;\r\n\t\t}\r\n\t} else {\r\n\t\top = 0;\r\n\t}\r\n\t\r\n\tswitch (op) { \r\n\t\tcase 0:\r\n\t\t\topcao1.className = \"\";\r\n\t\t\topcao2.className = \"\";\r\n\t\t\topcao3.className = \"\";\r\n\t\t\topcao4.className = \"\";\r\n\t\t\tiframeConteudo.src = \"login.html\";\r\n\t\t\tbreak;\r\n\t\tcase 1:\r\n\t\t\topcao1.className = \"active\";\r\n\t\t\topcao2.className = \"\";\r\n\t\t\topcao3.className = \"\";\r\n\t\t\topcao4.className = \"\";\r\n\t\t\tiframeConteudo.src = \"status.html\";\r\n\t        break;\r\n\t\tcase 2:\r\n\t\t\topcao1.className = \"\";\r\n\t\t\topcao2.className = \"active\";\r\n\t\t\topcao3.className = \"\";\r\n\t\t\topcao4.className = \"\";\r\n\t\t\tiframeConteudo.src = \"preferencias.html\";\r\n\t        break;\r\n\t\tcase 3:\r\n\t\t\topcao1.className = \"\";\r\n\t\t\topcao2.className = \"\";\r\n\t\t\topcao3.className = \"active\";\r\n\t\t\topcao4.className = \"\";\r\n\t\t\tiframeConteudo.src = \"relatorio.html\";\r\n\t        break;\r\n\t\tcase 4:\r\n\t\t\topcao1.className = \"\";\r\n\t\t\topcao2.className = \"\";\r\n\t\t\topcao3.className = \"\";\r\n\t\t\topcao4.className = \"active\";\r\n\t\t\tiframeConteudo.src = \"ajuda.html\";\r\n\t        break;\r\n\t\tcase 5:\r\n\t\t\topcao1.className = \"\";\r\n\t\t\topcao2.className = \"active\";\r\n\t\t\topcao3.className = \"\";\r\n\t\t\topcao4.className = \"\";\r\n\t\t\tiframeConteudo.src = \"personalizar.html\";\r\n\t        break;\r\n\t\tdefault:\r\n\t\t\tiframeConteudo.src = \"\";\r\n\t}\r\n}\n\n//# sourceURL=webpack://tourmaline-ext/./src/scripts/opcoes.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/opcoes.js"]();
/******/ 	
/******/ })()
;