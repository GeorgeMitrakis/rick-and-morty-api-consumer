const Character = require("./character");

const CharacterRenderer = (function(){

    /**
     * @param {Character} character 
     */
    function renderPreview(character) {
        const htmlString = (
            `<div>
                ${character.name}
            </div>`
        );

        const characterElem = document.createElement(htmlString);

        document.querySelector(".grid").append(characterElem);
    }

    /**
     * @param {Character} character 
     */
    function renderModal(character){
        const htmlString = '';

        document.querySelector("#modal").innerHTML = htmlString;
    }



    return {renderPreview, renderModal};
})();

module.exports = CharacterRenderer;