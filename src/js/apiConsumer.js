const fetch = require('node-fetch');
const Character = require('./character.js');
const characterMap = require('./characterMap.js');

const ApiConsumer = (function(){
    const URL = 'https://rickandmortyapi.com/api';
    

    /**
     * 
     * @param {string} endpoint
     * @returns {Promise<Character | Character[]>}
     */
    const consume = (endpoint, callback = () => {}) => {
        const response = fetch(URL + endpoint)
                            .then(res => res.json())
                            .then(res => callback(res));
        return response;
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Character>}
     */
    const fetchCharacter = (id) => {
        return consume("/character/" + id, (res) => characterMap(res));
    }

    /**
     * 
     * @returns {Promise<Character[]>}
     */
    const fetchAllCharacters = () => {
        const response = consume("/character", (res => {
            const characterEntities = res.results;
            const characters = characterEntities.map(characterEntity => characterMap(characterEntity));
            
            return characters;
        }));

        return response;
    }

    return {
        consume,
        fetchCharacter,
        fetchAllCharacters
    }
    
})();

module.exports = ApiConsumer;