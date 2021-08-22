
const ApiConsumer = require("./js/apiConsumer");
const CharacterRenderer = require("./js/characterRenderer");

window.onload = async function() {

    
    console.log(await ApiConsumer.fetchAllCharacters());
}