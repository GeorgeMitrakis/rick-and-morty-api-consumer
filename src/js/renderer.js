const Character = require("./character");
const enums = require("./enums");
const { getQuerystringParams } = require("./utils");

const Renderer = (function(){

    function init({ openModalCallback, closeModalCallback}) {
        this.openModalCallback = openModalCallback;
        this.closeModalCallback = closeModalCallback;
    }

    /**
     * @param {Object} options
     * @param {boolean} options.isLoading 
     */
    function displayGridLoadingState({isLoading} = {isLoading: false}) {
        document.querySelector('section.characters-container').classList.toggle('loading', isLoading);
    }

    function openModal() {
        document.querySelector('#modal').classList.add('opened');
        this.openModalCallback();
    }

    function closeModal() {
        document.querySelector('#modal').classList.remove('opened');
        document.querySelector("#modal .modal-content").innerHTML = "";
        this.closeModalCallback();
    }

    /**
     * 
     * @param {Character[]} characters 
     */
    function renderGrid({characters, error}) {
        if(!error && !characters){
            throw new Error("Renderer.renderGrid() : called with invalid argument");
        }

        if(error){
            document.querySelector(".characters-grid").classList.add("error");
            document.querySelector(".characters-grid").innerHTML = (
                `<p>There was an error while fetching the characters.</p>
                <p>Please try again later.</p>`
            )
        }
        else {
            const characterElems = characters.map(character => getGridElem(character));
            const gridHtml = characterElems.reduce(
                (gridHtmlUntilNow, characterElem) => {
                    return (
                        `${gridHtmlUntilNow}
                        ${characterElem}`
                    );
                }, ''
            );
            
            document.querySelector(".characters-grid").classList.remove("error");
            document.querySelector(".characters-grid").innerHTML = gridHtml;
        }
    }

    /**
     * @param {Character} character 
     * @returns {string} The HTML string of the grid element
     */
    function getGridElem(character) {
        const htmlString = (
            `<div class="character-card js-character-card" data-character-id="${character.id}">
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
     * @param {'character' | 'loading' | 'info'} content
     * @param {Character} character
     */
    function renderModal(content, character){
        if(content === 'character' && !character){
            throw new Error("Renderer.renderModal(): no character object provided.");
        }

        let htmlString;

        switch (content) {
            case 'character': 
                htmlString = (
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
                break;
            case 'info': 
                htmlString = (
                    `<div class="app-info">
                        <h2>Rick and Morty API Consumer</h2>
                        <hr/>
                        <p>Repo link: <a href="https://github.com/GeorgeMitrakis/rick-and-morty-api-consumer">here</a></p>
                        <p>App author: <a href="https://www.linkedin.com/in/george-mitrakis-867b74191/">George Mitrakis</a></p>
                        <p>UX designer, requirements author: <a href="https://www.linkedin.com/in/epaminondas-fakopoulos-751a03207/">Nondas Fakopoulos</a></p>
                        <hr/>
                        <p>
                            The following icons from 
                            <a href="https://fontawesome.com/"> fontawesome.com </a>
                            were used, under the 
                            <a href="https://fontawesome.com/license">Creative Commons Attribution 4.0 International license </a>:
                        </p>
                        <ul>
                            <li>mars-solid (path color changed)</li>
                            <li>venus-solid (path color changed)</li>
                            <li>info-circle-solid (path color changed)</li>
                        </ul>

                    </div>`
                );
                break;
            case 'loading': 
            default:
                htmlString = "<p>Loading...</p>"               
                break;
        }

        document.querySelector("#modal .modal-content").innerHTML = htmlString;
    }

    function getGenderHtmlClass(gender) {
        switch (gender) {
            case enums.character.gender.MALE:
                return 'icon-male';
            case enums.character.gender.FEMALE:
                return 'icon-female';
            case enums.character.gender.GENDERLESS:
            case enums.character.gender.UNKNOWN:
            default:
                return '';
        }
    }

    function preparePaginationButtons({prev, next}){
        preparePaginationButtonType(".js-previous", prev);
        preparePaginationButtonType(".js-next", next);       
    }

    function preparePaginationButtonType(buttonClass, targetPageUrl){
        document.querySelectorAll(buttonClass).forEach(item => item.disabled = !targetPageUrl);
        if(targetPageUrl){
            const page = getQuerystringParams(targetPageUrl.split("?")[1])["page"];
            document.querySelectorAll(buttonClass).forEach(item => item.setAttribute("data-target-page", page));
        }
    }



    return {
        init,
        displayGridLoadingState,
        renderGrid,
        renderModal,
        openModal,
        closeModal,
        preparePaginationButtons,
    };
})();

module.exports = Renderer;