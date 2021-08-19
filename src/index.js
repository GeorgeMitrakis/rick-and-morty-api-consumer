
window.onload = async function() {
    const ApiConsumer = require("./js/apiConsumer");

    
    console.log(await ApiConsumer.fetchAllCharacters());
}