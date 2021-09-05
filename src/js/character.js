class Character{

    constructor({id, name, status, gender, location, episodes, avatarUrl, species} = {}){
        this._id = id;
        this._name = name;
        this._status = status;
        this._gender = gender;
        this._location = location;
        this._episodes = episodes;
        this._avatarUrl = avatarUrl;
        this._species = species;
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get status(){
        return this._status;
    }
    get gender(){
        return this._gender;
    }
    get location(){
        return this._location;
    }
    get episodes(){
        return this._episodes;
    }
    get avatarUrl(){
        return this._avatarUrl;
    }
    get species(){
        return this._species;
    }
    
}

module.exports = Character;