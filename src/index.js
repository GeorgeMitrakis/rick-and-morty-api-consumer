
const ApiConsumer = require("./js/apiConsumer");
const CharacterRenderer = require("./js/characterRenderer");

window.onload = async function() {
    const characters = await ApiConsumer.fetchAllCharacters();

    console.log(characters)
    
    characters.forEach(character => CharacterRenderer.renderPreview(character));
}