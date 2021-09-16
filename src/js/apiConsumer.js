const fetch = require('node-fetch');
const Character = require('./character.js');
const characterMap = require('./characterMap.js');
const enums = require('./enums.js');

const ApiConsumer = (function(){
    const URL = 'https://rickandmortyapi.com/api';
    

    /**
     * 
     * @param {Object} options
     * @param {string} options.endpoint
     * @param {boolean} options.singleCharacter
     * @returns {Promise<Character | Character[]>}
     */
    const consume = ({endpoint, singleCharacter} = {}, callback = () => {}) => {
        const response = fetch(URL + endpoint)
                            .then(res => res.json())
                            .then(res => postProcessResponse(res, singleCharacter))
                            .then(res => callback(res));
        return response;
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Character>}
     */
    const fetchCharacter = (id) => {
        return consume({endpoint: `/character/${id}`, singleCharacter:true}, (res) => characterMap(res));
    }

    /**
     * 
     * @returns {Promise<Character[]>}
     */
    const fetchCharactersPage = ({page} = {}) => {
        let consumeUrl = "/character";
        if(Number(page) && page > 1 && page <= 34){
            consumeUrl += `?page=${page}`;
        }

        const response = consume({endpoint: consumeUrl}, (res => {
            const characterEntities = res.results;
            const characters = characterEntities.map(characterEntity => characterMap(characterEntity));
            
            return {pageInfo: res.info, characters};
        }));

        return response;
    }

    function postProcessResponse(response, singleCharacter){
        try {
            if(singleCharacter){
                response.gender = formatGender(response.gender);
                response.status = formatStatus(response.status);
            }
            else{
                response.results.forEach(character => {
                    character.gender = formatGender(character.gender);
                    character.status = formatStatus(character.status);
                });
            }
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
        fetchCharactersPage
    }
    
})();

module.exports = ApiConsumer;