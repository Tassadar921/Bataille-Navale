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
        if(this.id===id){
            return true;
        }else{
            return false;
        }
    }

    setMatrix(matrix){
        this.matrix = matrix;
    }

    setRace(race){
        this.race = race;
    }

    checkToken(token, id){
        if(this.token===token){
            this.setId(id);
            return true;
        }else{
            return false;
        }
    }
}

module.exports = User;