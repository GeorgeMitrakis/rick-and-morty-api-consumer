
const ApiConsumer = require("./js/apiConsumer");
const CharacterRenderer = require("./js/characterRenderer");

window.onload = async function() {
    CharacterRenderer.displayLoadingState();

    document.querySelector(".js-previous").onclick = function(event) {
        console.log({event})
    }
    document.querySelector(".js-next").onclick = function(event) {
        console.log({event})
    }

    const page = getQuerystringParams()["p"];
    const characters = await ApiConsumer.fetchAllCharacters({page});

    // console.log(characters)
    
    characters.forEach(character => CharacterRenderer.renderPreview(character));
    CharacterRenderer.displayCharacters();
}

function getQuerystringParams() {
    const urlSearchParams = new URLSearchParams(window.location.search) 
    const qsParams = Object.fromEntries(urlSearchParams.entries());

    return qsParams;
}