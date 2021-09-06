const Character = require('./character.js');

const characterMap = (characterEntity) => {
    const {id, name, status, gender, location, episode: episodes, image: avatarUrl, species} = characterEntity
    return new Character({id, name, status, gender, location: location.name, episodes, avatarUrl, species});
}

module.exports = characterMap;