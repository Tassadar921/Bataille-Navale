const socketFile = require('./socket');

module.exports.play = function (line, col, matrix, weapon, race, rooms, socket) {
    const room = rooms[socketFile.findRoom(rooms, socket.id)];
    if (room.id1 === socket.id) {
        for (const line of room.weapons1) {
            if (line.name === weapon && line.nbr > 0) {
                line.nbr--;
            }
        }
    } else {
        for (const line of room.weapons2) {
            if (line.name === weapon && line.nbr > 0) {
                line.nbr--;
            }
        }
    }
    switch (weapon) {
        case 'normal':
            if (matrix[line][col]) {
                matrix[line][col] = {name: 'touched'};
            }
            break;
        case 'fireRing':
            if (line - 1 > 0 && col - 2 > 0) {
                if (matrix[line - 1][col - 2]) {
                    matrix[line - 1][col - 2] = {name: 'touched'};
                }
            }
            if (col - 2 > 0) {
                if (matrix[line][col - 2]) {
                    matrix[line][col - 2] = {name: 'touched'};
                }
            }
            if (line + 1 < 10 && col - 2 > 0) {
                if (matrix[line + 1][col - 2]) {
                    matrix[line + 1][col - 2] = {name: 'touched'};
                }
            }
            if (line - 2 > 0 && col - 1 > 0) {
                if (matrix[line - 2][col - 1]) {
                    matrix[line - 2][col - 1] = {name: 'touched'};
                }
            }
            if (line + 2 < 10 && col - 1 > 0) {
                if (matrix[line + 2][col - 1]) {
                    matrix[line + 2][col - 1] = {name: 'touched'};
                }
            }
            if (line - 2 > 0) {
                if (matrix[line - 2][col]) {
                    matrix[line - 2][col] = {name: 'touched'};
                }
            }
            if (line + 2 < 10) {
                if (matrix[line + 2][col]) {
                    matrix[line + 2][col] = {name: 'touched'};
                }
            }
            if (line + 2 < 10 && col + 1 < 10) {
                if (matrix[line + 2][col + 1]) {
                    matrix[line + 2][col + 1] = {name: 'touched'};
                }
            }
            if (line - 2 > 0 && col + 1 < 10) {
                if (matrix[line - 2][col + 1]) {
                    matrix[line - 2][col + 1] = {name: 'touched'};
                }
            }
            if (line + 1 > 0 && col + 2 < 10) {
                if (matrix[line + 1][col + 2]) {
                    matrix[line + 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line][col + 2]) {
                    matrix[line][col + 2] = {name: 'touched'};
                }
            }
            if (line - 1 > 0 && col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            break;
        case 'fragBomb':
            if (matrix[line][col]) {
                matrix[line][col] = {name: 'touched'};
            }
            if (col - 1 > 0) {
                if (matrix[line][col - 1]) {
                    matrix[line][col - 1] = {name: 'touched'};
                }
            }
            if (line + 1 < 10) {
                if (matrix[line + 1][col]) {
                    matrix[line + 1][col] = {name: 'touched'};
                }
            }
            if (line - 1 > 0) {
                if (matrix[line - 1][col]) {
                    matrix[line - 1][col] = {name: 'touched'};
                }
            }
            if (col + 1 > 0) {
                if (matrix[line][col + 1]) {
                    matrix[line][col + 1] = {name: 'touched'};
                }
            }
            break;
        case 'HLaser':
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            if (col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    matrix[line - 1][col + 2] = {name: 'touched'};
                }
            }
            break;
        case 'IEM':
            break;
        case 'immune':
            break;
        case 'invincibility':
            break;
        case 'radar':
            break;
        case 'selfDestruct':
            break;
        case 'sonar':
            break;
        case 'thermicShield':
            break;
        case 'thief':
            break;
        case 'tirSup':
            break;
        case 'torpedo':
            break;
        case 'Vlaser':
            break;
        case 'badShooter':
            break;
        case 'Hbomb':
            break;
    }
    if (room.id1 === socket.id) {
        room.matrix2 = matrix;
    } else {
        room.matrix1 = matrix;
    }
};