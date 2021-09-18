
const ApiConsumer = require("./js/apiConsumer");
const Renderer = require("./js/renderer");
const { getQuerystringParams, getElemClickedByClass } = require("./js/utils");

window.addEventListener('load', async function() {

    EventListenerHelper.init();

    Renderer.displayGridLoadingState({isLoading: true});
    
    const page = getQuerystringParams()["page"];
    const {pageInfo, characters} = await ApiConsumer.fetchCharactersPage({page});
    
    Renderer.renderGrid(characters);
    
    Renderer.preparePaginationButtons(pageInfo)
    Renderer.displayGridLoadingState({isLoading: false});
    
    EventListenerHelper.addModalListeners();
    EventListenerHelper.addPaginationListeners();
})



const EventListenerHelper = (function() {

    const modalOpenedEvent = new Event("modalOpened");
    const modalClosedEvent = new Event("modalClosed");


    function init() {
        Renderer.init({
            openModalCallback: () => document.dispatchEvent(modalOpenedEvent), 
            closeModalCallback:  () => document.dispatchEvent(modalClosedEvent)
        })
    }

    function addModalListeners() {
        
        // on character click
        document.addEventListener('click', async function(event){
            const characterClicked = getElemClickedByClass(event.target, "character-card");
            
            console.log("on character click(?)")
            
            if(!characterClicked){
                return;
            }
            
            console.log("on character click")
            
            Renderer.renderModal({isLoading:true});
            Renderer.openModal();
            
            const characterId = characterClicked.getAttribute("data-character-id");
            const character = await ApiConsumer.fetchCharacter(characterId);
            
            Renderer.renderModal({character});
        });
        
        // on close button click
        document.querySelector("#modal span.close").addEventListener('click', function(event) {
            Renderer.closeModal();
        });
        
        // on backdrop click callback
        const onModalBackdropClick = function(event) {
            const isModalOpened =  document.querySelector("#modal").classList.contains("opened") && document.querySelector("#modal .modal-content").hasChildNodes();
            const isModalClicked = getElemClickedByClass(event.target, "modal-inner");
            console.log("onModalBackdropClick()", {isModalOpened, isModalClicked})
            
            if(isModalOpened && !isModalClicked){
                Renderer.closeModal();
            }
        };

        // on info button click
        document.querySelector(".js-info-button").addEventListener('click', function(event) {
            event.stopPropagation();
            
            console.log("on info button click")
            Renderer.openModal();
            Renderer.renderModal({isLoading:true});
        })
        
        document.addEventListener('modalOpened', function(event){
            console.log("modalOpened")
            document.addEventListener("click", onModalBackdropClick);
        });
        
        document.addEventListener('modalClosed', function(event){
            console.log("modalClosed")
            document.removeEventListener("click", onModalBackdropClick);
        });
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
        addModalListeners,
        addPaginationListeners
    }

})();

