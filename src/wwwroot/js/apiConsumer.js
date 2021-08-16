import fetch from 'node-fetch';
import { characterMap } from './characterMap.js';

export const ApiConsumer = (function(){
    const URL = 'https://rickandmortyapi.com/api';
    

    const consume = (endpoint, callback = () => {}) => {
        const response = fetch(URL + endpoint)
                            .then(res => res.json())
                            .then(res => callback(res));
        return response;
    }

    const fetchCharacter = async (id) => {
        return await consume("/character/" + id, (res) => characterMap(res));
    }

    const fetchAllCharacters = async () => {
        const response = await consume("/character", (res => {
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