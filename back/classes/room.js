const battleSQL = require('../modules/battle&SQL');

class Room {
    name1;
    matrix1;
    race1;
    id1;
    name2;
    matrix2;
    race2;
    id2;
    weapons1;
    weapons2;

    turn;

    constructor(p1, p2) {
        this.name1 = p1.name;
        this.matrix1 = p1.matrix;
        this.race1 = p1.race;
        this.name2 = p2.name;
        this.matrix2 = p2.matrix;
        this.race2 = p2.race;
        this.id1 = p1.id;
        this.id2 = p2.id;

        this.turn=Math.floor(Math.random()*2+1);

        this.weapons1 = battleSQL.getWeapons(this.race1);
        this.weapons2 = battleSQL.getWeapons(this.race2);
    }

    setId1(id){
        this.id1 = id;
    }

    setId2(id){
        this.id2= id;
    }

    isHere(id){
        return this.id1 === id || this.id2 === id;
    }

    isMyTurn(id){
        return (id === this.id1 && this.turn === 1) || (id === this.id2 && this.turn === 2);
    }

    played(){
        if(this.turn===1){
            this.turn++;
        }else{
            this.turn--;
        }
    }
}

module.exports = Room;