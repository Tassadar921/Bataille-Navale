module.exports.leaveRoom = function (intoRoom, socket) {
    for(let i=0;i<intoRoom.length;i++) {
        if(intoRoom[i].id === socket.id) {
            intoRoom.splice(i, 1);
        }
    }
    return intoRoom;
};

module.exports.findUser = function (id, intoRoom){
    for(let i=0;i<intoRoom.length;i++){
        if(intoRoom[i].id===id){
            return i;
        }
    }
    return -1;
}

module.exports.enterRoom = function (intoRoom, socket, User) {
    intoRoom.push(new User(socket.id, socket.name, socket.matrix, socket.race, false));
    return intoRoom;
}

module.exports.ready = function (intoRoom, data, socket, val) {
    for(let i=0;i<intoRoom.length;i++) {
        if(intoRoom[i].id===socket.id){
            intoRoom[i].race=data.race;
            intoRoom[i].matrix=data.matrix;
            intoRoom[i].ready=val;
        }
    }
    return intoRoom;
}

module.exports.checkReady = function (intoRoom) {
    let user1;
    let user2;
    for(let i=0;i<intoRoom.length;i++){
        if(intoRoom[i].ready){
            if(!user1){
                user1 = intoRoom[i];
            }else{
                user2 = intoRoom[i];
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
        if(rooms[i].id1===id || rooms[i].id2===id){
            return i;
        }
    }
    return -1;
}

module.exports.destroy = function (intoRoom, rooms, id, socket){

    for(let i=0;i<intoRoom.length;i++){
        if(intoRoom[i].id === id){
            intoRoom.splice(i,1);
        }
    }
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].id1===id || rooms[i].id2===id){
            socket.emit('destroy');
            if(rooms[i].id1===id){
                socket.to(rooms[i].id2).emit('destroy');
            }else if(rooms[i].id2===id){
                socket.to(rooms[i].id1).emit('destroy');
            }
            rooms.splice(i,1);
        }
    }
    return {waiting: intoRoom, games: rooms};
}

module.exports.checkIfInGame = function (socket, rooms) {
    for(const line of rooms){
        if(line.id1===socket.id || line.id2===socket.id){
            return true;
        }
    }
    return false;
}