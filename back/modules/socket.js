module.exports.disconnect = function (users, socket) {
    for(let i=0;i<users.length;i++) {
        if(users[i].id === socket.id) {
            users.splice(i, 1);
        }
    }
    return users;
};

module.exports.enterRoom = function (users, socket) {
    users.push({id: socket.id, ready: false});
    return users;
}

module.exports.ready = function (users, socket, val) {
    for(let i=0;i<users.length;i++) {
        if(users[i].id===socket.id){
            users[i].ready=val;
        }
    }
    return users;
}

module.exports.checkReady = function (users) {
    let user1;
    let user2;
    for(let i=0;i<users.length;i++){
        if(users[i].ready){
            if(!user1){
                user1 = users[i];
            }else{
                user2 = users[i];
            }
        }
    }
    if(user1 && user2){
        return {p1: user1, p2: user2, fill:true};
    }else{
        return {fill:false};
    }
}

module.exports.findRoom = function (rooms, id) {
    for(let i=0;i<rooms.length; i++){
        if(rooms[i].p1.id===id || rooms[i].p2.id===id){
            return i;
        }
    }
    return -1;
}