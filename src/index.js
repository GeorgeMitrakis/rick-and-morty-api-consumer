
const ApiConsumer = require("./js/apiConsumer");
const Renderer = require("./js/renderer");
const { getQuerystringParams, getElemClickedByClass } = require("./js/utils");

window.addEventListener('load', async function() {

    Renderer.displayGridLoadingState({isLoading: true});
    
    const page = getQuerystringParams()["page"];
    const {pageInfo, characters} = await ApiConsumer.fetchCharactersPage({page});
    
    Renderer.renderGrid(characters);
    
    Renderer.preparePaginationButtons(pageInfo)
    Renderer.displayGridLoadingState({isLoading: false});
    
    EventListenerHelper.addModalListeners();
    EventListenerHelper.addPaginationListeners(pageInfo);
})



const EventListenerHelper = (function() {

    function addModalListeners() {

        // on character click
        document.addEventListener('click', async function(event){
            const characterClicked = getElemClickedByClass(event.target, "character-card");
            
            if(!characterClicked){
                return;
            }
    
            Renderer.openModal();
            Renderer.renderModal({isLoading:true});
    
            const characterId = characterClicked.getAttribute("data-character-id");
            const character = await ApiConsumer.fetchCharacter(characterId);
    
            Renderer.renderModal({character});
            document.addEventListener("click", onModalBackdropClick);
        });

        // on close button click
        document.querySelector("#modal span.close").addEventListener('click', function(event) {
            Renderer.closeModal();
            document.removeEventListener("click", onModalBackdropClick);
        });

        // on backdrop click callback
        const onModalBackdropClick = function(event) {
            const isModalOpened =  document.querySelector("#modal").classList.contains("opened") && document.querySelector("#modal .modal-content").hasChildNodes();
            const isModalClicked = getElemClickedByClass(event.target, "modal-inner");
            console.log(event, {isModalOpened, isModalClicked})
                
            if(isModalOpened && !isModalClicked){
                Renderer.closeModal();
                document.removeEventListener("click", onModalBackdropClick);
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
        addModalListeners,
        addPaginationListeners
    }

})();

