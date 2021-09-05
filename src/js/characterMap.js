const Character = require('./character.js');

const characterMap = (characterEntity) => {
    const {id, name, status, gender, location, episodes, image: avatarUrl, species} = characterEntity
    return new Character({id, name, status, gender, location, episodes, avatarUrl, species});
}

module.exports = characterMap;