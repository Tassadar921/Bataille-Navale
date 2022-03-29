class User {
    name;
    id;
    matrix;
    race;
    ready;

    constructor(id, name) {
        this.ready=false;
        this.id=id;
        this.name=name;
    }

    setId(id){
        this.id = id;
    }

    isItMe(id){
        return this.id === id;
    }

    setRace(race){
        this.race = race;
    }
}

module.exports = User;