import { Character } from './character.js';

export const characterMap = (characterEntity) => {
    const {name, status, gender, location, episodes} = characterEntity
    return new Character({name, status, gender, location, episodes});
}