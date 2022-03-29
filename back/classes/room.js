class Room {
    name1;
    matrix1;
    race1;
    id1;
    name2;
    matrix2;
    race2;
    id2;

    constructor(p1, p2) {
        this.name1 = p1.name;
        this.matrix1 = p1.matrix;
        this.race1 = p1.race;
        this.name2 = p2.name;
        this.matrix2 = p2.matrix;
        this.race2 = p2.race;
        this.id1 = p1.id;
        this.id2 = p2.id;
    }

    setId1(id){
        this.id1 = id;
    }

    setId2(id){
        this.id2= id;
    }

    isHere(id){
        if(this.id1===id||this.id2===id){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Room;