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

        let characterElem = document.createElement("div");
        characterElem.innerHTML = htmlString;
        characterElem = characterElem.firstChild;

        characterElem.onclick = function(event) {
            renderModal(character);
            document.querySelector("#modal").classList.add("opened");
        }

        document.querySelector(".grid").append(characterElem);
    }

    /**
     * @param {Character} character 
     */
    function renderModal(character){
        const htmlString = `<div class="modal-content">Hello!</div>`;

        document.querySelector("#modal").innerHTML = htmlString;
    }



    return {renderPreview, renderModal};
})();

module.exports = CharacterRenderer;