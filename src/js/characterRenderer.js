const Character = require("./character");
const enums = require("./enums");

const CharacterRenderer = (function(){


    function displayLoadingState() {
        // document.querySelector('.grid').classList.add('is-loading');
        // document.querySelector('.loader').classList.add('active');
        document.querySelector('section.characters-container').classList.add('loading');
    }

    function displayCharacters() {
        // document.querySelector('.grid').classList.remove('is-loading');
        // document.querySelector('.loader').classList.remove('active');
        document.querySelector('section.characters-container').classList.remove('loading');
    }

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
                        <span class="status ${getStatusHtmlClass(character.status)}"></span>
                        <span>${character.status} - ${character.species}</span>
                    </div>
                </div>                
            </div>`
        );

        let characterElem = document.createElement("div");
        characterElem.innerHTML = htmlString;
        characterElem = characterElem.firstChild;

        // characterElem.onclick = function(event) {
        //     renderModal(character);
        //     document.querySelector("#modal").classList.add("opened");
        // }

        document.querySelector(".grid").append(characterElem);
    }

    function getStatusHtmlClass(status){
        let htmlClass = '';

        switch (status) {
            case enums.character.status.ALIVE:
                htmlClass += 'status-alive';
                break;
            case enums.character.status.DEAD:
                htmlClass += 'status-dead';
                break;
            case enums.character.status.UNKNOWN:
                htmlClass += 'status-unknown';
                break;        
            default:
                break;
        }

        return htmlClass;
    }

    /**
     * @param {Character} character 
     */
    function renderModal(character){
        const htmlString = `<div class="modal-content">Hello!</div>`;

        document.querySelector("#modal").innerHTML = htmlString;
    }



    return {
        displayLoadingState,
        displayCharacters,
        renderPreview,
        renderModal
    };
})();

module.exports = CharacterRenderer;