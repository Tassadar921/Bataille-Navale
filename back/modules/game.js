const socketFile = require('./socket');

function changeProtectionLevel(data, sign) {
    if (sign === '+') {
        if (data === 'immune') {
            return data;
        } else if (data === 'thermicShield') {
            return 'immune';
        } else {
            return 'thermicShield';
        }
    } else {
        if (data === 'immune') {
            return 'thermicShield';
        } else if (data === 'thermicShield') {
            return 'touched';
        } else {
            return data;
        }
    }
}

module.exports.play = function (line, col, matrix, weapon, rooms, socket) {
    console.log('line : ', line);
    console.log('col : ', col);
    const room = rooms[socketFile.findRoom(rooms, socket.id)];
    let refMatrix = [];
    if (room.id1 === socket.id) {
        for (const line of room.weapons1) {
            if (line.name === weapon && line.nbr > 0) {
                line.nbr--;
            }
        }
        refMatrix = room.matrix2;
    } else {
        for (const line of room.weapons2) {
            if (line.name === weapon && line.nbr > 0) {
                line.nbr--;
            }
        }
        refMatrix = room.matrix1;
    }

    switch (weapon) {
        case 'normal':
            if (refMatrix[line][col]) {
                if (refMatrix[line][col].name === 'immune' || refMatrix[line][col].name === 'thermicShield') {
                    matrix[line][col].name = changeProtectionLevel(matrix[line][col], '-');
                } else {
                    matrix[line][col].name='touched';
                }
            }
            break;
        case 'fireRing':
            if (line - 1 > 0 && col - 2 > 0) {
                if (matrix[line - 1][col - 2]) {
                    if (matrix[line - 1][col - 2].name === 'immune' || matrix[line - 1][col - 2].name === 'thermicShield') {
                        matrix[line - 1][col - 2].name = changeProtectionLevel(matrix[line - 1][col - 2], '-');
                    } else {
                        matrix[line - 1][col - 2] = {name: 'touched'};
                    }
                }
            }
            if (col - 2 > 0) {
                if (matrix[line][col - 2]) {
                    if (matrix[line][col - 2].name === 'immune' || matrix[line][col - 2].name === 'thermicShield') {
                        matrix[line][col - 2].name = changeProtectionLevel(matrix[line][col - 2], '-');
                    } else {
                        matrix[line][col - 2] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10 && col - 2 > 0) {
                if (matrix[line + 1][col - 2]) {
                    if (matrix[line + 1][col - 2].name === 'immune' || matrix[line + 1][col - 2].name === 'thermicShield') {
                        matrix[line + 1][col - 2].name = changeProtectionLevel(matrix[line + 1][col - 2], '-');
                    } else {
                        matrix[line + 1][col - 2] = {name: 'touched'};
                    }
                }
            }
            if (line - 2 > 0 && col - 1 > 0) {
                if (matrix[line - 2][col - 1]) {
                    if (matrix[line - 2][col - 1].name === 'immune' || matrix[line - 2][col - 1].name === 'thermicShield') {
                        matrix[line - 2][col - 1].name = changeProtectionLevel(matrix[line - 2][col - 1], '-');
                    } else {
                        matrix[line - 2][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 2 < 10 && col - 1 > 0) {
                if (matrix[line + 2][col - 1]) {
                    if (matrix[line + 2][col - 1].name === 'immune' || matrix[line + 2][col - 1].name === 'thermicShield') {
                        matrix[line + 2][col - 1].name = changeProtectionLevel(matrix[line + 2][col - 1], '-');
                    } else {
                        matrix[line + 2][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 2 > 0) {
                if (matrix[line - 2][col]) {
                    if (matrix[line - 2][col].name === 'immune' || matrix[line - 2][col].name === 'thermicShield') {
                        matrix[line - 2][col].name = changeProtectionLevel(matrix[line - 2][col], '-');
                    } else {
                        matrix[line - 2][col] = {name: 'touched'};
                    }
                }
            }
            if (line + 2 < 10) {
                if (matrix[line + 2][col]) {
                    if (matrix[line + 2][col].name === 'immune' || matrix[line + 2][col].name === 'thermicShield') {
                        matrix[line + 2][col].name = changeProtectionLevel(matrix[line + 2][col], '-');
                    } else {
                        matrix[line + 2][col] = {name: 'touched'};
                    }
                }
            }
            if (line + 2 < 10 && col + 1 < 10) {
                if (matrix[line + 2][col + 1]) {
                    if (matrix[line + 2][col + 1].name === 'immune' || matrix[line + 2][col + 1].name === 'thermicShield') {
                        matrix[line + 2][col + 1].name = changeProtectionLevel(matrix[line + 2][col + 1], '-');
                    } else {
                        matrix[line + 2][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 2 > 0 && col + 1 < 10) {
                if (matrix[line - 2][col + 1]) {
                    if (matrix[line - 2][col + 1].name === 'immune' || matrix[line - 2][col + 1].name === 'thermicShield') {
                        matrix[line - 2][col + 1].name = changeProtectionLevel(matrix[line - 2][col + 1], '-');
                    } else {
                        matrix[line - 2][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 > 0 && col + 2 < 10) {
                if (matrix[line + 1][col + 2]) {
                    if (matrix[line + 1][col + 2].name === 'immune' || matrix[line + 1][col + 2].name === 'thermicShield') {
                        matrix[line + 1][col + 2].name = changeProtectionLevel(matrix[line + 1][col + 2], '-');
                    } else {
                        matrix[line + 1][col + 2] = {name: 'touched'};
                    }
                }
            }
            if (col + 2 < 10) {
                if (matrix[line][col + 2]) {
                    if (matrix[line][col + 2].name === 'immune' || matrix[line][col + 2].name === 'thermicShield') {
                        matrix[line][col + 2].name = changeProtectionLevel(matrix[line][col + 2], '-');
                    } else {
                        matrix[line][col + 2] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0 && col + 2 < 10) {
                if (matrix[line - 1][col + 2]) {
                    if (matrix[line - 1][col + 2].name === 'immune' || matrix[line - 1][col + 2].name === 'thermicShield') {
                        matrix[line - 1][col + 2].name = changeProtectionLevel(matrix[line - 1][col + 2], '-');
                    } else {
                        matrix[line - 1][col + 2] = {name: 'touched'};
                    }
                }
            }
            break;
        case 'fragBomb':
            if (matrix[line][col]) {
                if (matrix[line][col].name === 'immune' || matrix[line][col].name === 'thermicShield') {
                    matrix[line][col].name = changeProtectionLevel(matrix[line][col], '-');
                } else {
                    matrix[line][col] = {name: 'touched'};
                }
            }
            if (col - 1 > 0) {
                if (matrix[line][col - 1]) {
                    if (matrix[line][col - 1].name === 'immune' || matrix[line][col - 1].name === 'thermicShield') {
                        matrix[line][col - 1].name = changeProtectionLevel(matrix[line][col - 1], '-');
                    } else {
                        matrix[line][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10) {
                if (matrix[line + 1][col]) {
                    if (matrix[line + 1][col].name === 'immune' || matrix[line + 1][col].name === 'thermicShield') {
                        matrix[line + 1][col].name = changeProtectionLevel(matrix[line + 1][col], '-');
                    } else {
                        matrix[line + 1][col] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0) {
                if (matrix[line - 1][col]) {
                    if (matrix[line - 1][col].name === 'immune' || matrix[line - 1][col].name === 'thermicShield') {
                        matrix[line - 1][col].name = changeProtectionLevel(matrix[line - 1][col], '-');
                    } else {
                        matrix[line - 1][col] = {name: 'touched'};
                    }
                }
            }
            if (col + 1 < 10) {
                if (matrix[line][col + 1]) {
                    if (matrix[line][col + 1].name === 'immune' || matrix[line][col + 1].name === 'thermicShield') {
                        matrix[line][col + 1].name = changeProtectionLevel(matrix[line][col + 1], '-');
                    } else {
                        matrix[line][col + 1] = {name: 'touched'};
                    }
                }
            }
            break;
        case 'HLaser':
            for (let i = 0; i < 10; i++) {
                if (matrix[line][i]) {
                    if (matrix[line][i].name === 'immune' || matrix[line][i].name === 'thermicShield') {
                        matrix[line][i].name = changeProtectionLevel(matrix[line][i], '-');
                    } else {
                        matrix[line][i] = {name: 'touched'};
                    }
                }
            }
            break;
        case 'Vlaser':
            for (let i = 0; i < 10; i++) {
                if (matrix[i][col]) {
                    if (matrix[i][col].name === 'immune' || matrix[i][col].name === 'thermicShield') {
                        matrix[i][col].name = changeProtectionLevel(matrix[i][col], '-');
                    } else {
                        matrix[i][col] = {name: 'touched'};
                    }
                }
            }
            break;
        case 'thermicShield':
            if (matrix[line][col]) {
                matrix[line][col] = {name: 'thermicShield'};
            }
            break;
        case 'immune':
            if (matrix[line][col]) {
                matrix[line][col] = {name: 'immune'};
            }
            break;
        case 'torpedo':
            if (matrix[line][col]) {
                if (matrix[line][col].name === 'immune' || matrix[line][col].name === 'thermicShield') {
                    matrix[line][col].name = changeProtectionLevel(matrix[line][col], '-');
                } else {
                    matrix[line][col] = {name: 'touched'};
                }
            }
            if (col - 1 > 0) {
                if (matrix[line][col - 1]) {
                    if (matrix[line][col - 1].name === 'immune' || matrix[line][col - 1].name === 'thermicShield') {
                        matrix[line][col - 1].name = changeProtectionLevel(matrix[line][col - 1], '-');
                    } else {
                        matrix[line][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10) {
                if (matrix[line + 1][col]) {
                    if (matrix[line + 1][col].name === 'immune' || matrix[line + 1][col].name === 'thermicShield') {
                        matrix[line + 1][col].name = changeProtectionLevel(matrix[line + 1][col], '-');
                    } else {
                        matrix[line + 1][col] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0) {
                if (matrix[line - 1][col]) {
                    if (matrix[line - 1][col].name === 'immune' || matrix[line - 1][col].name === 'thermicShield') {
                        matrix[line - 1][col].name = changeProtectionLevel(matrix[line - 1][col], '-');
                    } else {
                        matrix[line - 1][col] = {name: 'touched'};
                    }
                }
            }
            if (col + 1 < 10) {
                if (matrix[line][col + 1]) {
                    if (matrix[line][col + 1].name === 'immune' || matrix[line][col + 1].name === 'thermicShield') {
                        matrix[line][col + 1].name = changeProtectionLevel(matrix[line][col + 1], '-');
                    } else {
                        matrix[line][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0 && col - 1 > 0) {
                if (matrix[line - 1][col - 1]) {
                    if (matrix[line - 1][col - 1].name === 'immune' || matrix[line - 1][col - 1].name === 'thermicShield') {
                        matrix[line - 1][col - 1].name = changeProtectionLevel(matrix[line - 1][col - 1], '-');
                    } else {
                        matrix[line - 1][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10 && col - 1 > 0) {
                if (matrix[line + 1][col - 1]) {
                    if (matrix[line + 1][col - 1].name === 'immune' || matrix[line + 1][col - 1].name === 'thermicShield') {
                        matrix[line + 1][col - 1].name = changeProtectionLevel(matrix[line + 1][col - 1], '-');
                    } else {
                        matrix[line + 1][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10 && col + 1 < 10) {
                if (matrix[line + 1][col + 1]) {
                    if (matrix[line + 1][col + 1].name === 'immune' || matrix[line + 1][col + 1].name === 'thermicShield') {
                        matrix[line + 1][col + 1].name = changeProtectionLevel(matrix[line + 1][col + 1], '-');
                    } else {
                        matrix[line + 1][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0 && col + 1 < 10) {
                if (matrix[line - 1][col + 1]) {
                    if (matrix[line - 1][col + 1].name === 'immune' || matrix[line - 1][col + 1].name === 'thermicShield') {
                        matrix[line - 1][col + 1].name = changeProtectionLevel(matrix[line - 1][col + 1], '-');
                    } else {
                        matrix[line - 1][col + 1] = {name: 'touched'};
                    }
                }
            }
            break;
        case 'sonar':
            if (matrix[line][col]) {
                if (matrix[line][col].name === 'immune' || matrix[line][col].name === 'thermicShield') {
                    matrix[line][col].name = changeProtectionLevel(matrix[line][col], '-');
                } else {
                    matrix[line][col] = {name: 'touched'};
                }
            }
            if (col - 1 > 0) {
                if (matrix[line][col - 1]) {
                    if (matrix[line][col - 1].name === 'immune' || matrix[line][col - 1].name === 'thermicShield') {
                        matrix[line][col - 1].name = changeProtectionLevel(matrix[line][col - 1], '-');
                    } else {
                        matrix[line][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10) {
                if (matrix[line + 1][col]) {
                    if (matrix[line + 1][col].name === 'immune' || matrix[line + 1][col].name === 'thermicShield') {
                        matrix[line + 1][col].name = changeProtectionLevel(matrix[line + 1][col], '-');
                    } else {
                        matrix[line + 1][col] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0) {
                if (matrix[line - 1][col]) {
                    if (matrix[line - 1][col].name === 'immune' || matrix[line - 1][col].name === 'thermicShield') {
                        matrix[line - 1][col].name = changeProtectionLevel(matrix[line - 1][col], '-');
                    } else {
                        matrix[line - 1][col] = {name: 'touched'};
                    }
                }
            }
            if (col + 1 < 10) {
                if (matrix[line][col + 1]) {
                    if (matrix[line][col + 1].name === 'immune' || matrix[line][col + 1].name === 'thermicShield') {
                        matrix[line][col + 1].name = changeProtectionLevel(matrix[line][col + 1], '-');
                    } else {
                        matrix[line][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0 && col - 1 > 0) {
                if (matrix[line - 1][col - 1]) {
                    if (matrix[line - 1][col - 1].name === 'immune' || matrix[line - 1][col - 1].name === 'thermicShield') {
                        matrix[line - 1][col - 1].name = changeProtectionLevel(matrix[line - 1][col - 1], '-');
                    } else {
                        matrix[line - 1][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10 && col - 1 > 0) {
                if (matrix[line + 1][col - 1]) {
                    if (matrix[line + 1][col - 1].name === 'immune' || matrix[line + 1][col - 1].name === 'thermicShield') {
                        matrix[line + 1][col - 1].name = changeProtectionLevel(matrix[line + 1][col - 1], '-');
                    } else {
                        matrix[line + 1][col - 1] = {name: 'touched'};
                    }
                }
            }
            if (line + 1 < 10 && col + 1 < 10) {
                if (matrix[line + 1][col + 1]) {
                    if (matrix[line + 1][col + 1].name === 'immune' || matrix[line + 1][col + 1].name === 'thermicShield') {
                        matrix[line + 1][col + 1].name = changeProtectionLevel(matrix[line + 1][col + 1], '-');
                    } else {
                        matrix[line + 1][col + 1] = {name: 'touched'};
                    }
                }
            }
            if (line - 1 > 0 && col + 1 < 10) {
                if (matrix[line - 1][col + 1]) {
                    if (matrix[line - 1][col + 1].name === 'immune' || matrix[line - 1][col + 1].name === 'thermicShield') {
                        matrix[line - 1][col + 1].name = changeProtectionLevel(matrix[line - 1][col + 1], '-');
                    } else {
                        matrix[line - 1][col + 1] = {name: 'touched'};
                    }
                }
            }
            break;
            break;
        case 'IEM':
            break;
        case 'selfDestruct':
            break;
        case 'thief':
            break;
        case 'tirSup':
            break;
        case 'badShooter':
            break;
        case 'Hbomb':
            break;
    }
    if (room.id1 === socket.id) {
        room.playingMatrix1 = matrix;
    } else {
        room.playingMatrix2 = matrix;
    }
    room.played();
    rooms[socketFile.findRoom(rooms, socket.id)]=room;
    return rooms;
};