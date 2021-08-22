const Character = require("./character");

const CharacterRenderer = (function(){

    /**
     * @param {Character} character 
     */
    function renderPreview(character) {
        const htmlString = (
            `<div class="character-card">
                <img src="${character.avatarUrl}" />
                <div class="details">
                    <div class="title">${character.name}</div>
                    <div class="info">
                        <span class="status status-unknown"></span>
                        <span>${character.status} - ${character.species}</span>
                    </div>
                </div>                
            </div>`
        );

        const characterElem = document.createElement("div");
        characterElem.innerHTML = htmlString;

        document.querySelector(".grid").append(characterElem.firstChild);
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