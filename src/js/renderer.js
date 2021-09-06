const Character = require("./character");
const enums = require("./enums");

const Renderer = (function(){

    /**
     * @param {Object} options
     * @param {boolean} options.isLoading 
     */
    function displayGridLoadingState({isLoading} = {isLoading: false}) {
        document.querySelector('section.characters-container').classList.toggle('loading', isLoading);
    }

    /**
     * @param {Object} options
     * @param {boolean} options.isLoading 
     */
    function displayModalLoadingState({isLoading} = {isLoading: false}) {
        console.log({isLoading});
    }

    function openModal() {
        document.querySelector('#modal').classList.add('opened');
    }

    function closeModal() {
        document.querySelector('#modal').classList.remove('opened');
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
            `<div class="character">
                <img src="${character.avatarUrl}" />
                <h3>${character.name}</h3>
                <p>
                    <span class="status ${getStatusHtmlClass(character.status)}"></span>
                    <span>${character.status} - ${character.species}</span>
                </p>

            </div>
            <div class="character-info">
                <p>Gender: <span class="${getGenderHtmlClass(character.gender)}"></span> ${character.gender}</p>
                <p>Last seen location: ${character.location}</p>
                <p>Number of episodes appeared: ${character.episodes.length}</p>
            </div>`
        );

        document.querySelector("#modal .modal-content").innerHTML = htmlString;
    }

    function getGenderHtmlClass(gender) {
        switch (gender) {
            case enums.character.gender.MALE:
                return 'icon-male';
            case enums.character.gender.FEMALE:
                return 'icon-female';
            default:
                return '';
        }
    }



    return {
        displayGridLoadingState,
        displayModalLoadingState,
        renderGrid,
        renderModal,
        openModal,
        closeModal
    };
})();

module.exports = Renderer;