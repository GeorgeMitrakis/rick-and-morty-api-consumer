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

eval("\r\nconst ApiConsumer = __webpack_require__(/*! ./js/apiConsumer */ \"./src/js/apiConsumer.js\");\r\nconst Renderer = __webpack_require__(/*! ./js/renderer */ \"./src/js/renderer.js\");\r\n\r\nwindow.addEventListener('load', async function() {\r\n\r\n    document.addEventListener('click', function(event){\r\n        const characterClicked = getCharacterClicked(event.target);\r\n        \r\n        if(!characterClicked){\r\n            return;\r\n        }\r\n\r\n        console.log(characterClicked.getAttribute(\"data-character-id\"))\r\n    });\r\n\r\n    Renderer.displayLoadingState({isLoading: true});\r\n\r\n    document.querySelector(\".js-previous\").onclick = function(event) {\r\n        console.log({event})\r\n    }\r\n    document.querySelector(\".js-next\").onclick = function(event) {\r\n        console.log({event})\r\n    }\r\n\r\n    const page = getQuerystringParams()[\"p\"];\r\n    const characters = await ApiConsumer.fetchAllCharacters({page});\r\n    \r\n    Renderer.renderGrid(characters);\r\n    Renderer.displayLoadingState({isLoading: false});\r\n})\r\n\r\nfunction getQuerystringParams() {\r\n    const urlSearchParams = new URLSearchParams(window.location.search) \r\n    const qsParams = Object.fromEntries(urlSearchParams.entries());\r\n\r\n    return qsParams;\r\n}\r\n\r\n/**\r\n * \r\n * @param {EventTarget} eventTarget \r\n * @returns {Element}\r\n */\r\nfunction getCharacterClicked(eventTarget){\r\n    if(eventTarget.classList.contains(\"character-card\")){\r\n        return eventTarget;\r\n    }\r\n\r\n    if(eventTarget.closest(\".character-card\") != null){\r\n        return eventTarget.closest(\".character-card\");\r\n    }\r\n\r\n    return null;\r\n}\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/index.js?");

/***/ }),

/***/ "./src/js/apiConsumer.js":
/*!*******************************!*\
  !*** ./src/js/apiConsumer.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\r\nconst Character = __webpack_require__(/*! ./character.js */ \"./src/js/character.js\");\r\nconst characterMap = __webpack_require__(/*! ./characterMap.js */ \"./src/js/characterMap.js\");\r\nconst enums = __webpack_require__(/*! ./enums.js */ \"./src/js/enums.js\");\r\n\r\nconst ApiConsumer = (function(){\r\n    const URL = 'https://rickandmortyapi.com/api';\r\n    \r\n\r\n    /**\r\n     * \r\n     * @param {string} endpoint\r\n     * @returns {Promise<Character | Character[]>}\r\n     */\r\n    const consume = (endpoint, callback = () => {}) => {\r\n        const response = fetch(URL + endpoint)\r\n                            .then(res => res.json())\r\n                            .then(res => postProcessResponse(res))\r\n                            .then(res => callback(res));\r\n        return response;\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {number} id \r\n     * @returns {Promise<Character>}\r\n     */\r\n    const fetchCharacter = (id) => {\r\n        return consume(\"/character/\" + id, (res) => characterMap(res));\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @returns {Promise<Character[]>}\r\n     */\r\n    const fetchAllCharacters = ({page} = {}) => {\r\n        let consumeUrl = \"/character\";\r\n        if(Number(page) && page > 1 && page <= 34){\r\n            consumeUrl += `?page=${page}`;\r\n        }\r\n\r\n        const response = consume(consumeUrl, (res => {\r\n            const characterEntities = res.results;\r\n            const characters = characterEntities.map(characterEntity => characterMap(characterEntity));\r\n            \r\n            return characters;\r\n        }));\r\n\r\n        return response;\r\n    }\r\n\r\n    function postProcessResponse(response){\r\n        try {\r\n            response.results.forEach(character => {\r\n                character.gender = formatGender(character.gender);\r\n                character.status = formatStatus(character.status);\r\n            });\r\n        } catch (error) {\r\n            console.error(error);\r\n        }\r\n\r\n        return Promise.resolve().then(() => response);\r\n    }\r\n\r\n    function formatGender(gender){\r\n        switch (gender.toLowerCase()) {\r\n            case 'male':\r\n                return enums.character.gender.MALE;\r\n            case 'female':\r\n                return enums.character.gender.FEMALE;\r\n            default:\r\n                return '';\r\n        }\r\n    }\r\n\r\n    function formatStatus(status){\r\n        switch (status.toLowerCase()) {\r\n            case 'alive':\r\n                return enums.character.status.ALIVE;\r\n            case 'dead':\r\n                return enums.character.status.DEAD;\r\n            case 'unknown':\r\n                return enums.character.status.UNKNOWN;\r\n            default:\r\n                return '';\r\n        }        \r\n    }\r\n\r\n    return {\r\n        consume,\r\n        fetchCharacter,\r\n        fetchAllCharacters\r\n    }\r\n    \r\n})();\r\n\r\nmodule.exports = ApiConsumer;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/apiConsumer.js?");

/***/ }),

/***/ "./src/js/character.js":
/*!*****************************!*\
  !*** ./src/js/character.js ***!
  \*****************************/
/***/ ((module) => {

eval("class Character{\r\n\r\n    constructor({id, name, status, gender, location, episodes, avatarUrl, species} = {}){\r\n        this._id = id;\r\n        this._name = name;\r\n        this._status = status;\r\n        this._gender = gender;\r\n        this._location = location;\r\n        this._episodes = episodes;\r\n        this._avatarUrl = avatarUrl;\r\n        this._species = species;\r\n    }\r\n\r\n    get id(){\r\n        return this._id;\r\n    }\r\n    get name(){\r\n        return this._name;\r\n    }\r\n    get status(){\r\n        return this._status;\r\n    }\r\n    get gender(){\r\n        return this._gender;\r\n    }\r\n    get location(){\r\n        return this._location;\r\n    }\r\n    get episodes(){\r\n        return this._episodes;\r\n    }\r\n    get avatarUrl(){\r\n        return this._avatarUrl;\r\n    }\r\n    get species(){\r\n        return this._species;\r\n    }\r\n    \r\n}\r\n\r\nmodule.exports = Character;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/character.js?");

/***/ }),

/***/ "./src/js/characterMap.js":
/*!********************************!*\
  !*** ./src/js/characterMap.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character.js */ \"./src/js/character.js\");\r\n\r\nconst characterMap = (characterEntity) => {\r\n    const {id, name, status, gender, location, episodes, image: avatarUrl, species} = characterEntity\r\n    return new Character({id, name, status, gender, location, episodes, avatarUrl, species});\r\n}\r\n\r\nmodule.exports = characterMap;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/characterMap.js?");

/***/ }),

/***/ "./src/js/enums.js":
/*!*************************!*\
  !*** ./src/js/enums.js ***!
  \*************************/
/***/ ((module) => {

eval("const enums = {\r\n    character : {\r\n        gender : {\r\n            MALE: 'Male',\r\n            FEMALE: 'Female'\r\n        },\r\n        status : {\r\n            ALIVE : 'Alive',\r\n            DEAD: 'Dead',\r\n            UNKNOWN: 'Unknown'\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = enums;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/enums.js?");

/***/ }),

/***/ "./src/js/renderer.js":
/*!****************************!*\
  !*** ./src/js/renderer.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character */ \"./src/js/character.js\");\r\nconst enums = __webpack_require__(/*! ./enums */ \"./src/js/enums.js\");\r\n\r\nconst Renderer = (function(){\r\n\r\n    /**\r\n     * @param {Object} options\r\n     * @param {boolean} options.isLoading \r\n     */\r\n    function displayLoadingState({isLoading} = {isLoading: false}) {\r\n        // document.querySelector('.grid').classList.add('is-loading');\r\n        // document.querySelector('.loader').classList.add('active');\r\n        document.querySelector('section.characters-container').classList.toggle('loading', isLoading);\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {Character[]} characters \r\n     */\r\n    function renderGrid(characters) {\r\n        const characterElems = characters.map(character => getGridElem(character));\r\n        const gridHtml = characterElems.reduce(\r\n            (gridHtmlUntilNow, characterElem) => {\r\n                return (\r\n                    `${gridHtmlUntilNow}\r\n                    ${characterElem}`\r\n                );\r\n            }, ''\r\n        );\r\n        \r\n        document.querySelector(\".grid\").innerHTML = gridHtml;\r\n    }\r\n\r\n    /**\r\n     * @param {Character} character \r\n     * @returns {string} The HTML string of the grid element\r\n     */\r\n    function getGridElem(character) {\r\n        const htmlString = (\r\n            `<div class=\"character-card\" data-character-id=\"${character.id}\">\r\n                <img src=\"${character.avatarUrl}\" />\r\n                <div class=\"details\">\r\n                    <div class=\"title\">${character.name}</div>\r\n                    <div class=\"info\">\r\n                        <span class=\"status ${getStatusHtmlClass(character.status)}\"></span>\r\n                        <span>${character.status} - ${character.species}</span>\r\n                    </div>\r\n                </div>                \r\n            </div>`\r\n        );\r\n\r\n        return htmlString;\r\n    }\r\n\r\n    function getStatusHtmlClass(status){\r\n        let htmlClass = '';\r\n\r\n        switch (status) {\r\n            case enums.character.status.ALIVE:\r\n                htmlClass += 'status-alive';\r\n                break;\r\n            case enums.character.status.DEAD:\r\n                htmlClass += 'status-dead';\r\n                break;\r\n            case enums.character.status.UNKNOWN:\r\n                htmlClass += 'status-unknown';\r\n                break;        \r\n            default:\r\n                break;\r\n        }\r\n\r\n        return htmlClass;\r\n    }\r\n\r\n    /**\r\n     * @param {Character} character \r\n     */\r\n    function renderModal(character){\r\n        const htmlString = (\r\n            `<div class=\"modal-content\">\r\n                <span class=\"close\">&times;</span>\r\n                <p>Some text in the Modal..</p>\r\n            </div>`\r\n        );\r\n\r\n        document.querySelector(\"#modal\").innerHTML = htmlString;\r\n    }\r\n\r\n\r\n\r\n    return {\r\n        displayLoadingState,\r\n        renderGrid,\r\n        renderModal\r\n    };\r\n})();\r\n\r\nmodule.exports = Renderer;\n\n//# sourceURL=webpack://rick-and-morty-api-consumer/./src/js/renderer.js?");

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