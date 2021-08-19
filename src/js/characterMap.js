const Character = require('./character.js');

const characterMap = (characterEntity) => {
    const {name, status, gender, location, episodes} = characterEntity
    return new Character({name, status, gender, location, episodes});
}

module.exports = characterMap;