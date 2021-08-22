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

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

"use strict";
eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof global !== 'undefined') { return global; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar global = getGlobal();\n\nmodule.exports = exports = global.fetch;\n\n// Needed for TypeScript and Webpack.\nif (global.fetch) {\n\texports.default = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst ApiConsumer = __webpack_require__(/*! ./js/apiConsumer */ \"./src/js/apiConsumer.js\");\r\nconst CharacterRenderer = __webpack_require__(/*! ./js/characterRenderer */ \"./src/js/characterRenderer.js\");\r\n\r\nwindow.onload = async function() {\r\n\r\n    \r\n    console.log(await ApiConsumer.fetchAllCharacters());\r\n}\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/index.js?");

/***/ }),

/***/ "./src/js/apiConsumer.js":
/*!*******************************!*\
  !*** ./src/js/apiConsumer.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\r\nconst Character = __webpack_require__(/*! ./character.js */ \"./src/js/character.js\");\r\nconst characterMap = __webpack_require__(/*! ./characterMap.js */ \"./src/js/characterMap.js\");\r\n\r\nconst ApiConsumer = (function(){\r\n    const URL = 'https://rickandmortyapi.com/api';\r\n    \r\n\r\n    /**\r\n     * \r\n     * @param {string} endpoint\r\n     * @returns {Promise<Character | Character[]>}\r\n     */\r\n    const consume = (endpoint, callback = () => {}) => {\r\n        const response = fetch(URL + endpoint)\r\n                            .then(res => res.json())\r\n                            .then(res => callback(res));\r\n        return response;\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {number} id \r\n     * @returns {Promise<Character>}\r\n     */\r\n    const fetchCharacter = (id) => {\r\n        return consume(\"/character/\" + id, (res) => characterMap(res));\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @returns {Promise<Character[]>}\r\n     */\r\n    const fetchAllCharacters = () => {\r\n        const response = consume(\"/character\", (res => {\r\n            const characterEntities = res.results;\r\n            const characters = characterEntities.map(characterEntity => characterMap(characterEntity));\r\n            \r\n            return characters;\r\n        }));\r\n\r\n        return response;\r\n    }\r\n\r\n    return {\r\n        consume,\r\n        fetchCharacter,\r\n        fetchAllCharacters\r\n    }\r\n    \r\n})();\r\n\r\nmodule.exports = ApiConsumer;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/apiConsumer.js?");

/***/ }),

/***/ "./src/js/character.js":
/*!*****************************!*\
  !*** ./src/js/character.js ***!
  \*****************************/
/***/ ((module) => {

eval("class Character{\r\n\r\n    constructor({name, status, gender, location, episodes} = {}){\r\n        this._name = name;\r\n        this._status = status;\r\n        this._gender = gender;\r\n        this._location = location;\r\n        this._episodes = episodes;        \r\n    }\r\n\r\n    get name(){\r\n        return this._name;\r\n    }\r\n    get status(){\r\n        return this._status;\r\n    }\r\n    get gender(){\r\n        return this._gender;\r\n    }\r\n    get location(){\r\n        return this._location;\r\n    }\r\n    get episodes(){\r\n        return this._episodes;\r\n    }\r\n    \r\n}\r\n\r\nmodule.exports = Character;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/character.js?");

/***/ }),

/***/ "./src/js/characterMap.js":
/*!********************************!*\
  !*** ./src/js/characterMap.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character.js */ \"./src/js/character.js\");\r\n\r\nconst characterMap = (characterEntity) => {\r\n    const {name, status, gender, location, episodes} = characterEntity\r\n    return new Character({name, status, gender, location, episodes});\r\n}\r\n\r\nmodule.exports = characterMap;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/characterMap.js?");

/***/ }),

/***/ "./src/js/characterRenderer.js":
/*!*************************************!*\
  !*** ./src/js/characterRenderer.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character */ \"./src/js/character.js\");\r\n\r\nconst CharacterRenderer = (function(){\r\n\r\n    /**\r\n     * @param {Character} character \r\n     */\r\n    function renderPreview(character) {\r\n        const htmlString = (\r\n            `<div>\r\n                ${character.name}\r\n            </div>`\r\n        );\r\n\r\n        const characterElem = document.createElement(htmlString);\r\n\r\n        document.querySelector(\".grid\").append(characterElem);\r\n    }\r\n\r\n    /**\r\n     * @param {Character} character \r\n     */\r\n    function renderModal(character){\r\n        const htmlString = '';\r\n\r\n        document.querySelector(\"#modal\").innerHTML = htmlString;\r\n    }\r\n\r\n\r\n\r\n    return {renderPreview, renderModal};\r\n})();\r\n\r\nmodule.exports = CharacterRenderer;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/characterRenderer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;