const Character = require("./character");
const enums = require("./enums");

const Renderer = (function(){

    /**
     * @param {Object} options
     * @param {boolean} options.isLoading 
     */
    function displayLoadingState({isLoading} = {isLoading: false}) {
        // document.querySelector('.grid').classList.add('is-loading');
        // document.querySelector('.loader').classList.add('active');
        document.querySelector('section.characters-container').classList.toggle('loading', isLoading);
    }

    /**
     * 
     * @param {Character[]} characters 
     */
    function renderGrid(characters) {
        const characterElems = characters.map(character => getGridElem(character));
        const gridHtml = characterElems.reduce(
            (gridHtmlUntilNow, characterElem) => {
                return (
                    `${gridHtmlUntilNow}
                    ${characterElem}`
                );
            }, ''
        );
        
        document.querySelector(".grid").innerHTML = gridHtml;
    }

    /**
     * @param {Character} character 
     * @returns {string} The HTML string of the grid element
     */
    function getGridElem(character) {
        const htmlString = (
            `<div class="character-card" data-character-id="${character.id}">
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

        return htmlString;
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
        const htmlString = (
            `<div class="modal-content">
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>`
        );

        document.querySelector("#modal").innerHTML = htmlString;
    }



    return {
        displayLoadingState,
        renderGrid,
        renderModal
    };
})();

module.exports = Renderer;