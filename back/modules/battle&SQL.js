const Weapon = require("../classes/weapon");

const weapons = [
    {race : "Human", data:[new Weapon("normal",999, 'Auto'),new Weapon("selfDestruct",2, 'Auto destruction'), new Weapon("IEM",1, 'IEM'),new Weapon("VLaser",1, 'Vertical laser'),new Weapon("HBomb",1, 'H bomb')]},
    {race : "Vyrkul", data :[new Weapon("normal",999, 'Auto'),new Weapon("sonar",2, 'Sonar'),new Weapon("fragBomb",3, 'Fragmentation bomb'),new Weapon("invincibility",1, 'Invincibility'),new Weapon("HLaser",1, 'Honrizontal bomb')]},
    {race : "Arash", data : [new Weapon("tirSup",999, 'Auto'),new Weapon("sonar",1, 'Sonar'),new Weapon("radar",2, 'Radar'),new Weapon("thermicShield",3, 'Thermic shield'),new Weapon("fireRing",3, 'Fire ring')]},
    {race : "Enkar", data : [new Weapon("normal",999, 'Auto'),new Weapon("immune",1, 'Immunity'),new Weapon("selfDestruct",2, 'Auto destruction'),new Weapon("thief",1, 'Thief'),new Weapon("torpedo",2, 'Torpedo')]},
    {race : "Sunari", data : [new Weapon("tirSup",999,'Auto'),new Weapon("badShooter",1, 'Bad shooter'),new Weapon("HLaser",1, 'Horizontal laser'),new Weapon("VLaser",1, 'Vertical laser'),new Weapon("HBomb",1, 'H bomb')]}
];

module.exports.getScoreboard = function (con, res) {
    con.query('SELECT username, score FROM users', (e,r)=>{
        if(e){
            throw e;
        }else{
            console.log(r);
            let tab = [];
            for(const line of r){
                tab.push({name: line.username, score: line.score});
            }
            res.json({output: tab});
        }
    })

}

module.exports.saveDeck = function (username, matrix, race, deckName, con, res){
    con.query('SELECT owner FROM decks WHERE name = ?', [deckName], (e, r) =>{
        if(e){
            throw e;
        }else{
            if(r.length){
                if(r[0].owner===username){
                    res.json({message: 'Overwrite backup ?'});
                }
                else {
                    res.json({message: 'Name already taken'});
                }
            }else{
                const json = JSON.stringify(matrix);
                con.query("INSERT INTO decks (name, deck, race, owner) VALUES " + "(\'" + deckName + "\', \'" + json + "\', \'" + race + "\', \'" + username + "\')", (err, resp) => {
                    if (err) {
                        throw err;
                    }else{
                        res.json({message: 'Deck saved'});
                    }
                });
            }
        }
    });
}

module.exports.getDeckNames = function (username, con, res){
    con.query("SELECT name, race FROM decks WHERE owner = ? ORDER BY name ASC",[username], (err, r) => {
        if (err) {
            throw err;
        }else{
            let tab = [];
            for(let line of r){
                tab.push({name: line.name, race: line.race});
            }
            res.json({output: tab});
        }
    });
}

module.exports.getMatrix = function (deckName, con, res){
    con.query("SELECT deck, race FROM decks WHERE name = ?",[deckName], (err, r) => {
        if (err) {
            throw err;
        }else{
            res.json({matrix: JSON.parse(r[0].deck), race:r[0].race});
        }
    });
}

module.exports.overwrite = function (username, matrix, race, deckName, con, res){
    con.query("DELETE FROM decks WHERE name = ?",[deckName], (err, r) => {
        if (err) {
            throw err;
        }else{
            const json = JSON.stringify(matrix);
            con.query("INSERT INTO decks (name, deck, race, owner) VALUES " + "(\'" + deckName + "\', \'" + json + "\', \'" + race + "\', \'" + username + "\')", (err, resp) => {
                if (err) {
                    throw err;
                }else{
                    res.json({message: 'Overwriten'});
                }
            });
        }
    });
}

module.exports.deleteFromDatabase = function (deckName, con, res){
    con.query("DELETE FROM decks WHERE name = ?",[deckName], (err, r) => {
        if (err) {
            throw err;
        }else{
            res.json({message: 'Deck successfully deleted'});
        }
    });
}

module.exports.getNumberOfShips = function (race, res){
    const tab = [
        [1,1,1,1],
        [1,1,2,1],
        [2,2,1,1],
        [3,3,1,2],
        [2,2,1,1]
    ]
    switch(race){
        case 'Human':
            res.json({output:tab[0]});
            break;
        case 'Vyrkul':
            res.json({output:tab[1]});
            break;
        case 'Arash':
            res.json({output:tab[2]});
            break;
        case 'Enkar':
            res.json({output:tab[3]});
            break;
        case 'Sunari':
            res.json({output:tab[4]});
            break
    }
}


module.exports.getWeapons = function (race){
    for(const line of weapons){
        if(line.race===race){
            return line.data;
        }
    }
    return -1;
}

module.exports.initCountShips = function (matrix, res){
    // console.log(matrix);
    let spaceship1 = 0;
    let spaceship2 = 0;
    let spaceship3 = 0;
    let spaceship4 = 0;
    for(let line of matrix){
        for(let col of line){
            if(col) {
                if (col.name.includes('1.1')) {
                    switch (Number(col.name.split('_')[0][col.name.split('_')[0].length - 1])){
                        case 1:
                            spaceship1++;
                            break;
                        case 2:
                            spaceship2++;
                            break;
                        case 3:
                            spaceship3++;
                            break;
                        case 4:
                            spaceship4++;
                            break;
                    }
                }
            }
        }
    }
    const out = {ship1: spaceship1, ship2:spaceship2, ship3: spaceship3, ship4: spaceship4}
    res.json({output: out});
    return 1;
}