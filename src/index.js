
const ApiConsumer = require("./js/apiConsumer");
const Renderer = require("./js/renderer");
const { getQuerystringParams, getElemClickedByClass } = require("./js/utils");

window.addEventListener('load', async function() {

    EventListenerHelper.init();

    EventListenerHelper.addCharacterGridListeners();

    Renderer.displayGridLoadingState({isLoading: true});
    
    const page = getQuerystringParams()["page"];
    const {pageInfo, characters} = await ApiConsumer.fetchCharactersPage({page});
    
    Renderer.renderGrid({characters});
    
    Renderer.preparePaginationButtons(pageInfo)
    Renderer.displayGridLoadingState({isLoading: false});
    
    EventListenerHelper.addModalListeners();
    EventListenerHelper.addPaginationListeners();
})



const EventListenerHelper = (function() {

    const modalOpenedEvent = new Event("modalOpened");
    const modalClosedEvent = new Event("modalClosed");
    const characterFetchErrorEvent = new Event("characterFetchError");


    function init() {
        ApiConsumer.init({
            onFetchErrorCallback: () => document.dispatchEvent(characterFetchErrorEvent)
        });
        Renderer.init({
            openModalCallback: () => document.dispatchEvent(modalOpenedEvent), 
            closeModalCallback: () => document.dispatchEvent(modalClosedEvent)
        });
    }

    function addCharacterGridListeners(params) {
        document.addEventListener('characterFetchError', function(event){
            Renderer.renderGrid({error: true});
        })
    }

    function addModalListeners() {
        
        // on character click
        document.addEventListener('click', async function(event){
            const characterClicked = getElemClickedByClass(event.target, "character-card");
            
            if(!characterClicked){
                return;
            }
            
            Renderer.renderModal('loading');
            Renderer.openModal();
            
            const characterId = characterClicked.getAttribute("data-character-id");
            const character = await ApiConsumer.fetchCharacter(characterId);
            
            Renderer.renderModal('character', character);
        });
        
        // on close button click
        document.querySelector("#modal span.close").addEventListener('click', function(event) {
            Renderer.closeModal();
        });
        
        
        // on info button click
        document.querySelector(".js-info-button").addEventListener('click', function(event) {
            event.stopPropagation();
            
            Renderer.openModal();
            Renderer.renderModal('info');
        })
        
        // on modal open
        document.addEventListener('modalOpened', function(event){
            document.addEventListener("click", onModalBackdropClick);
        });
        
        // on modal close
        document.addEventListener('modalClosed', function(event){
            document.removeEventListener("click", onModalBackdropClick);
        });

        // on backdrop click callback
        const onModalBackdropClick = function(event) {
            const isModalOpened =  document.querySelector("#modal").classList.contains("opened") && document.querySelector("#modal .modal-content").hasChildNodes();
            const isModalClicked = getElemClickedByClass(event.target, "modal-inner");
            
            if(isModalOpened && !isModalClicked){
                Renderer.closeModal();
            }
        };
    }
    

    function addPaginationListeners() {

        /**
         * @param {Event} event 
         */
        const clickHandler = function (event) {
            const page = this.getAttribute("data-target-page");
            window.location.href = window.location.origin + window.location.pathname + "?page=" + page;
        }

        document.querySelectorAll(".js-previous").forEach(item => item.addEventListener("click", clickHandler));
        document.querySelectorAll(".js-next").forEach(item => item.addEventListener("click", clickHandler));
    }

    return {
        init,
        addCharacterGridListeners,
        addModalListeners,
        addPaginationListeners
    }

})();

