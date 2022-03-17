module.exports.saveDeck = function (username, matrix, race, deckName, con, res){
    con.query('SELECT owner FROM decks WHERE name = ?', [deckName], (e, r) =>{
        if(e){
            throw e;
        }else{
            if(r.length){
                res.json({message: 'Name already taken'});
            }else{
                let json = {};
                for(let i=0; i<matrix.length; i++){
                    json.unshift('name'+i + ': {' + matrix[i] + '}')
                }
                console.log(json);
                con.query("INSERT INTO decks (name, deck, race, owner) VALUES " + "(\'" + deckName + "\', \'" + json + "\')" + "(\'" + race + "\', \'" + username + "\')", (err, resp) => {
                    if (err) {
                        throw err;
                    }else{
                        res.json({message: 'Deck saved'});
                    }
                });
            }
        }
    });
    res.json({message:'ok'});
}