const fetch = require('node-fetch');
const Character = require('./character.js');
const characterMap = require('./characterMap.js');
const enums = require('./enums.js');

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
                            .then(res => postProcessResponse(res))
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
    const fetchAllCharacters = ({page} = {}) => {
        let consumeUrl = "/character";
        if(Number(page) && page > 1 && page <= 34){
            consumeUrl += `?page=${page}`;
        }

        const response = consume(consumeUrl, (res => {
            const characterEntities = res.results;
            const characters = characterEntities.map(characterEntity => characterMap(characterEntity));
            
            return characters;
        }));

        return response;
    }

    function postProcessResponse(response){
        try {
            response.results.forEach(character => {
                character.gender = formatGender(character.gender);
                character.status = formatStatus(character.status);
            });
        } catch (error) {
            console.error(error);
        }

        return Promise.resolve().then(() => response);
    }

    function formatGender(gender){
        switch (gender.toLowerCase()) {
            case 'male':
                return enums.character.gender.MALE;
            case 'female':
                return enums.character.gender.FEMALE;
            default:
                return '';
        }
    }

    function formatStatus(status){
        switch (status.toLowerCase()) {
            case 'alive':
                return enums.character.status.ALIVE;
            case 'dead':
                return enums.character.status.DEAD;
            case 'unknown':
                return enums.character.status.UNKNOWN;
            default:
                return '';
        }        
    }

    return {
        consume,
        fetchCharacter,
        fetchAllCharacters
    }
    
})();

module.exports = ApiConsumer;