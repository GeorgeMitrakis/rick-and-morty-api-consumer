export class Character{

    constructor({name, status, gender, location, episodes} = {}){
        this._name = name;
        this._status = status;
        this._gender = gender;
        this._location = location;
        this._episodes = episodes;        
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
    
}