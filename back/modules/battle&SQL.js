module.exports.saveDeck = function (username, matrix, race, deckName, con, res){
    con.query('SELECT owner FROM decks WHERE name = ?', [deckName], (e, r) =>{
        if(e){
            throw e;
        }else{
            if(r.length){
                res.json({message: 'Name already taken'});
            }else{
                const json = JSON.stringify(matrix);
                // for(let i=0; i<matrix.length; i++){
                //     json.unshift('name'+i + ': {' + matrix[i] + '}')
                // }
                console.log(json);
                console.log(typeof json);
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
    con.query("SELECT name, race FROM decks WHERE owner = ? ORDER BY name DESC",[username], (err, r) => {
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
    con.query("SELECT deck FROM decks WHERE name = ? ORDER BY name DESC",[deckName], (err, r) => {
        if (err) {
            throw err;
        }else{
            // console.log(r[0]);
            const matrix = JSON.parse(r[0].deck);
            console.log(matrix);
            res.json({output: matrix});
        }
    });
}