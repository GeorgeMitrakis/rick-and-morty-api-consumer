
const ApiConsumer = require("./js/apiConsumer");
const Renderer = require("./js/renderer");

window.addEventListener('load', async function() {

    document.addEventListener('click', async function(event){
        const characterClicked = getElemClickedByClass(event.target, "character-card");
        
        if(!characterClicked){
            return;
        }

        Renderer.openModal();
        Renderer.displayModalLoadingState({isLoading:true});

        const characterId = characterClicked.getAttribute("data-character-id");
        const character = await ApiConsumer.fetchCharacter(characterId);

        Renderer.renderModal(character);
        Renderer.displayModalLoadingState({isLoading:false});
    });

    document.querySelector("#modal span.close").addEventListener('click', function(event) {
        Renderer.closeModal();
    });

    Renderer.displayGridLoadingState({isLoading: true});

    document.querySelector(".js-previous").onclick = function(event) {
        console.log({event})
    }
    document.querySelector(".js-next").onclick = function(event) {
        console.log({event})
    }

    const page = getQuerystringParams()["p"];
    const characters = await ApiConsumer.fetchAllCharacters({page});
    
    Renderer.renderGrid(characters);
    Renderer.displayGridLoadingState({isLoading: false});
})

function getQuerystringParams() {
    const urlSearchParams = new URLSearchParams(window.location.search) 
    const qsParams = Object.fromEntries(urlSearchParams.entries());

    return qsParams;
}

/**
 * 
 * @param {EventTarget} eventTarget 
 * @returns {Element}
 */
function getElemClickedByClass(eventTarget, classSelector){
    if(eventTarget.classList.contains(classSelector)){
        return eventTarget;
    }

    if(eventTarget.closest(`.${classSelector}`) != null){
        return eventTarget.closest(`.${classSelector}`);
    }

    return null;
}