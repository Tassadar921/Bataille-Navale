const crypto = require('crypto');
const moment = require('moment');

function ash(str) {
  return crypto.createHash('sha256')
      .update(str, 'utf-8')
      .digest('hex');
}

module.exports.signUp= function (name, pass, email, id, con, res){
  console.log('name : ', name);
  console.log('ash pass : ', ash(pass));
  console.log('email : ', email);
  console.log('id : ', id);
  con.query("INSERT INTO users (username, password, email, id) VALUES " + "(\'" + name + "\', \'" + ash(pass)+ "\', \'" + email + "\', \'" + id + "\')", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({message: 'Account created', return: true});
    }
  });
};

module.exports.login= function (name, password, req, con, res){
  let state='';
  let exists=false;
  let connected=false;
  con.query('SELECT password FROM users WHERE username = ? OR email = ?', [name, name],(err, result)=>{
    if(err){
      throw err;
    }else{
      if(result.length){
        if(result[0].password===ash(password)){
          exists=true;
          connected=true;
          state='Connected';
          req.session.username=name;
        }else{
          if(result[0].password!==ash(password)){
            state='Password incorrect';
            exists=true;
          }
        }
      }
      if(exists===false){
        state='Account not found';
      }
    }
    res.json({message: state, co: connected});
  });
}

module.exports.resetPassword = function (uuid, password, con, res) {
  con.query('UPDATE users SET password = ? WHERE id = ?', [ash(password), uuid], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({message: 'Password successfully replaced', output: 1});
    }
  });
}

module.exports.getUserIdByUsername = function (name, con, res) {
  con.query('SELECT id FROM users WHERE username = ?',[name], (err, result) => {
    if (err) {
      throw err;
    } else {
        if(result.length) {
          res.json({message: 'ID caught', id: result[0].id});
        }else {
          res.json({message: 'Something went wrong : retry'});
        }
      }
  });
}

module.exports.getUserListExceptOne = function (name, con, res) {
  const tab = [];
  con.query('SELECT username, lastConnected FROM users WHERE username != ? ORDER BY username DESC', [name], (err, result) => {
    if (err){
      throw err;
    }else{
      for(let line of result){
        tab.unshift({username: line.username, lastConnected: line.lastConnected});
      }
      res.json({output: tab});
    }
  });
}

module.exports.lastConnected = function (name, con, res){
  let date = new Date().toLocaleDateString('fr') + ' at ';
  let hour;
  if (moment().format('h:mm:ss a').includes('pm')) {
    let cut;
    for (let i = 0; i < moment().format('h:mm:ss a').length; i++) {
      if (moment().format('h:mm:ss a')[i] === ':') {
        cut = i;
        i = moment().format('h:mm:ss a').length;
      }
    }
    hour = (Number(moment().format('h:mm:ss a').slice(0, cut)) + 12)
        .toString() + moment().format('h:mm:ss a')
        .slice(cut, moment().format('h:mm:ss a').length - 6);
    if(hour[0]==='2' && hour[1]==='4'){
      hour = '12' + hour.slice(2,hour.length);
    }
  } else {
    hour = moment().format('h:mm:ss a').slice(0, moment().format('h:mm:ss a').length - 6);
    if(hour[0]==='1' && hour[1]==='2'){
      hour = '00' + hour.slice(2,hour.length);
    }
  }
  date += hour;
  con.query('UPDATE users SET lastConnected = ? WHERE username = \''+ name + '\'', [date], (err, result) => {
    if(err){
      throw err;
    }else{
      res.json({message: 'ok'});
    }
  });
}

module.exports.addFriend = async function (user, adding, con, res) {
  let tab = [user, adding];
  tab.sort();
  await con.query('SELECT user1, user2 FROM userfriends WHERE user1 = ? AND user2 = ?', [tab[0], tab[1]], (err, result) => {
    if (err) {
      throw err;
    } else {
      if(!result.length) {
        con.query("INSERT INTO userfriends (user1, user2) VALUES " + "(\'" + tab[0] + "\', \'" + tab[1] + "\')", (e, re) => {
          if (e) {
            throw e;
          }else{
            res.json({message: 'Friend added'});
          }
        });
      }else{
        res.json({message: 'Already friends'})
      }
    }
  });
}

module.exports.getUserFriends = function (user, con, res) {
  let tab = [];
  con.query('SELECT user1, user2 FROM userfriends WHERE user1 = ? OR user2 = ?', [user, user], (err, re) =>{
    if(err){
      throw err;
    }else{
      for(let line of re){
        if(line.user1===user){
          tab.unshift(line.user2);
        }else{
          tab.unshift(line.user1);
        }
      }
    }
    res.json({links: tab.sort()});
  });
}

module.exports.askFriend = function (from, to, con, res){
  con.query('SELECT sender FROM askingfriends WHERE sender = ? AND receiver = ?', [from, to], (e, r) =>{
    if(e){
      throw e;
    }else{
      if(r.length){
        res.json({message: 'Demand already sent'});
      }else{
        con.query("INSERT INTO askingfriends (sender, receiver) VALUES " + "(\'" + from + "\', \'" + to + "\')", (err, resp) => {
          if (err) {
            throw err;
          }else{
            res.json({message: 'Demand submitted'});
          }
        });
      }
    }
  });
}

module.exports.getUserDemandsSent = function (username, con, res) {
  let tab = [];
  con.query("SELECT receiver FROM askingfriends WHERE sender = ? ORDER BY receiver DESC", [username] , (err, result) => {
    if(err){
      throw err;
    }else{
      for(let line of result){
        tab.unshift(line.receiver);
      }
    }
    res.json({demands: tab});
  });
}

module.exports.getUserDemandsReceived = function (username, con, res) {
  let tab = [];
  con.query("SELECT sender FROM askingfriends WHERE receiver = ? ORDER BY sender DESC", [username] , (err, result) => {
    if(err){
      throw err;
    }else{
      for(let line of result){
        tab.unshift(line.sender);
      }
    }
    res.json({demands: tab});
  });
}

module.exports.deleteFriendship = function (username1, username2, con, res){
  let tab = [username1, username2];
  tab.sort();
  con.query("DELETE FROM userfriends WHERE user1 = ? AND user2 = ?", [tab[0], tab[1]], (err, result) => {
    if(err){
      throw err;
    }else{
      res.json({output: 'Supprimé'});
    }
  });
}

module.exports.deleteDemand = function (send, receive, con, res){
  con.query("DELETE FROM askingfriends WHERE sender = ? AND receiver = ?", [send, receive], (err, result) => {
    if(err){
      throw err;
    }else{
      res.json({message: 'Demande supprimée'});
    }
  });
}