const Weapon = require("../classes/weapon");

const weapons = [
    {race : "Human", data:[new Weapon("Normal",999),new Weapon("SelfDestruct",2), new Weapon("IEM",1),new Weapon("VLaser",1),new Weapon("HBomb",1)]},
    {race : "Vyrkul", data :[new Weapon("Normal",999),new Weapon("Sonar",2),new Weapon("FragBomb",3),new Weapon("Invincibility",1),new Weapon("HLaser",1)]},
    {race : "Arash", data : [new Weapon("TirSup",999),new Weapon("Bait",1),new Weapon("Radar",2),new Weapon("ThermicShield",3),new Weapon("FireRing",3)]},
    {race : "Enkar", data : [new Weapon("Normal",999),new Weapon("Immune",1),new Weapon("SelfDestruct",2),new Weapon("Thief",1),new Weapon("Torpedo",2)]},
    {race : "Sunari", data : [new Weapon("TirSup",999),new Weapon("BadShooter",1),new Weapon("HLaser",1),new Weapon("VLaser",1),new Weapon("HBomb",1)]}
];


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

module.exports.getNumberOfShips = function (race, con, res){
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


module.exports.getWeapons=function(race, res){
    for(const line of weapons){
        if(line.race===race){
            res.json({output: line.data});
        }
    }
    res.json({output:'erreur'});
}