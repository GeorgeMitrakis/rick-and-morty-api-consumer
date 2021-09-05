
const ApiConsumer = require("./js/apiConsumer");
const Renderer = require("./js/renderer");

window.addEventListener('load', async function() {

    document.addEventListener('click', function(event){
        const characterClicked = getCharacterClicked(event.target);
        
        if(!characterClicked){
            return;
        }

        console.log(characterClicked.getAttribute("data-character-id"))
    });

    Renderer.displayLoadingState({isLoading: true});

    document.querySelector(".js-previous").onclick = function(event) {
        console.log({event})
    }
    document.querySelector(".js-next").onclick = function(event) {
        console.log({event})
    }

    const page = getQuerystringParams()["p"];
    const characters = await ApiConsumer.fetchAllCharacters({page});
    
    Renderer.renderGrid(characters);
    Renderer.displayLoadingState({isLoading: false});
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
function getCharacterClicked(eventTarget){
    if(eventTarget.classList.contains("character-card")){
        return eventTarget;
    }

    if(eventTarget.closest(".character-card") != null){
        return eventTarget.closest(".character-card");
    }

    return null;
}