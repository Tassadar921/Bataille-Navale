import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpMatrixService {

  constructor() {
  }

  nameToShape = (name) => {
    const model = [
      {name: 'human1', shape: 3},
      {name: 'human2', shape: 4},
      {name: 'human3', shape: 7},
      {name: 'human4', shape: 8},
      {name: 'enkar1', shape: 1},
      {name: 'enkar2', shape: 2},
      {name: 'enkar3', shape: 5},
      {name: 'enkar4', shape: 4},
      {name: 'arash1', shape: 2},
      {name: 'arash2', shape: 3},
      {name: 'arash3', shape: 10},
      {name: 'arash4', shape: 6},
      {name: 'sunari1', shape: 2},
      {name: 'sunari2', shape: 2},
      {name: 'sunari3', shape: 11},
      {name: 'sunari4', shape: 9},
      {name: 'vyrkul1', shape: 2},
      {name: 'vyrkul2', shape: 3},
      {name: 'vyrkul3', shape: 5},
      {name: 'vyrkul4', shape: 6},
    ];
    for (const line of model) {
      if (line.name === name) {
        return line.shape;
      }
    }
    return -1;
  };

  reinitMatrix = () => {
    const matrix = [];
    let row;
    for (let i = 0; i < 10; i++) {
      row = [];
      for (let k = 0; k < 10; k++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  };

  letterToNum = (letter) => {
    const num = [
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    for (let i = 0; i < num[0].length; i++) {
      if (num[0][i] === letter) {
        return num[1][i];
      }
    }
    return -1;
  };

  getRotation = (direction) => {
    switch (direction) {
      case 'U':
        return '';
      case 'R':
        return 'right';
      case 'D':
        return 'down';
      case 'L':
        return 'left';
    }
  };

  getDirection = (rotation) => {
    switch(rotation) {
      case '':
        return 'U';
      case 'right':
        return 'R';
      case'down':
        return 'D';
      case 'left':
        return 'L';
    }
};

  changeNumberOfShips = (numberOfShips, data, sign) => {
    const num = data[data.length - 1];
    switch (sign) {
      case '+':
        numberOfShips[num - 1]++;
        break;
      case '-':
        numberOfShips[num - 1]--;
        break;
    }
    return numberOfShips;
  };

  editMatrix = (matrix, dropData, col, line, direction, numberOfShips, race, sign) => {
    let output = '';
    col = this.letterToNum(col);
    let tmpLine1 = line;
    let tmpLine2 = line;
    let tmpLine3 = line;
    let tmpLine4 = line;
    let tmpCol1 = col;
    let tmpCol2 = col;
    let tmpCol3 = col;
    let tmpCol4 = col;
    if (sign === '+') {
      numberOfShips = this.changeNumberOfShips(numberOfShips, dropData.split('_')[0][dropData.split('_')[0].length - 1], sign);
      dropData = dropData.split('_')[0];
      matrix[line][col] = 0;
    }
    switch (this.nameToShape(dropData.toLowerCase())) {
      case 1:
        if(sign==='-') {
          if (!matrix[line][col]) {
            matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
            numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
          } else {
            output = 'Unable to put this here';
          }
        }
        break;
      case 2:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            break;
          case'L':
            tmpCol1 += 1;
            break;
          case'D':
            tmpLine1 -= 1;
            break;
          case'R':
            tmpCol1 -= 1;
            break;
        }
        if (sign === '-') {
          if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine1][tmpCol1]) {
              matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
              matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[tmpLine1][tmpCol1] = 0;
        }
        break;
      case 3:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpCol1 += 1;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpCol1 -= 1;
            break;
          case'R':
            tmpLine1 += 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            break;
        }
        if (sign === '-') {
          if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10
            && tmpCol2 > -1 && tmpCol2 < 10 && tmpLine2 > -1 && tmpLine2 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine1][tmpCol2]
              && !matrix[line][tmpCol1] && !matrix[line][tmpCol2]
              && !matrix[tmpLine1][col] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine2][tmpCol1]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol1] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol1] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine2][tmpCol1] = 0;
          } else {
            matrix[line][tmpCol2] = 0;
            matrix[tmpLine1][tmpCol2] = 0;
          }
        }
        break;
      case 4:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            break;
          case'L':
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            break;
          case'R':
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            break;
        }
        if (sign === '-') {
          if (tmpLine3 > -1 && tmpLine3 < 10 && tmpCol3 > -1 && tmpCol3 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][tmpCol2] && !matrix[tmpLine3][tmpCol3]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine1][tmpCol1] = 0;
            matrix[tmpLine2][tmpCol2] = 0;
            matrix[tmpLine3][tmpCol3] = 0;
          } else {
            matrix[line][tmpCol1] = 0;
            matrix[line][tmpCol2] = 0;
            matrix[line][tmpCol3] = 0;
          }
        }
        break;
      case 5:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpCol1 += 1;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpCol1 -= 1;
            break;
          case'R':
            tmpLine1 += 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            break;
        }
        if (sign === '-') {
          if (tmpLine3 > -1 && tmpLine3 < 10 && tmpCol3 > -1 && tmpCol3 < 10 && tmpCol1 > -1
            && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10) {
            if (!matrix[line][col] && !matrix[line][tmpCol1]
              && !matrix[tmpLine1][col] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine2][tmpCol1]
              && !matrix[tmpLine3][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[line][tmpCol2] && !matrix[tmpLine1][tmpCol2]
              && !matrix[line][tmpCol3] && !matrix[tmpLine1][tmpCol3]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol1] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol1] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine2][tmpCol1] = 0;
            matrix[tmpLine3][col] = 0;
            matrix[tmpLine3][tmpCol1] = 0;
          } else {
            matrix[line][tmpCol2] = 0;
            matrix[tmpLine1][tmpCol2] = 0;
            matrix[line][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol3] = 0;
          }
        }
        break;
      case 6:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpLine4 += 4;
            tmpCol1 += 1;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            tmpCol4 += 4;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpLine4 -= 4;
            tmpCol1 -= 1;
            break;
          case'R':
            tmpLine1 += 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            tmpCol4 -= 4;
            break;
        }
        if (sign === '-') {
          if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10
            && tmpCol4 > -1 && tmpCol4 < 10 && tmpLine4 > -1 && tmpLine4 < 10) {
            if (!matrix[line][col] && !matrix[line][tmpCol1]
              && !matrix[tmpLine1][col] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine2][tmpCol1]
              && !matrix[tmpLine3][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[line][tmpCol2] && !matrix[tmpLine1][tmpCol2]
              && !matrix[line][tmpCol3] && !matrix[tmpLine1][tmpCol3]
              && !matrix[line][tmpCol4] && !matrix[tmpLine1][tmpCol4]
              && !matrix[tmpLine4][col] && !matrix[tmpLine4][tmpCol1]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol1] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol1] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine2][tmpCol1] = 0;
            matrix[tmpLine3][col] = 0;
            matrix[tmpLine3][tmpCol1] = 0;
            matrix[tmpLine4][col] = 0;
            matrix[tmpLine4][tmpCol1] = 0;
          } else {
            matrix[line][tmpCol2] = 0;
            matrix[tmpLine1][tmpCol2] = 0;
            matrix[line][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol3] = 0;
            matrix[line][tmpCol4] = 0;
            matrix[tmpLine1][tmpCol4] = 0;
          }
        }
        break;
      case 7:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpLine4 += 4;
            tmpCol1 -= 1;
            tmpCol2 += 1;
            break;
          case'L':
            tmpLine1 += 1;
            tmpLine2 -= 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            tmpCol4 += 4;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpLine4 -= 4;
            tmpCol1 += 1;
            tmpCol2 -= 1;
            break;
          case'R':
            tmpLine1 -= 1;
            tmpLine2 += 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            tmpCol4 -= 4;
            break;
        }
        if (sign === '-') {
          if (tmpLine1 > -1 && tmpLine1 < 10 && tmpLine4 > -1 && tmpLine4 < 10
            && tmpLine2 > -1 && tmpLine2 < 10 && tmpCol2 > -1 && tmpCol2 < 10
            && tmpCol1 > -1 && tmpCol1 < 10 && tmpCol4 > -1 && tmpCol4 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[tmpLine1][col] && !matrix[tmpLine4][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[tmpLine3][col] && !matrix[tmpLine3][tmpCol2]
              && !matrix[tmpLine4][col] && !matrix[tmpLine4][tmpCol2]
              && !matrix[line][tmpCol1] && !matrix[line][tmpCol2]
              && !matrix[line][tmpCol3] && !matrix[line][tmpCol4]
              && !matrix[tmpLine1][tmpCol3] && !matrix[tmpLine1][tmpCol4]
              && !matrix[tmpLine2][tmpCol3] && !matrix[tmpLine2][tmpCol4]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol2] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.0', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine1][col] = 0;
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine3][col] = 0;
            matrix[tmpLine4][col] = 0;
            matrix[tmpLine3][tmpCol1] = 0;
            matrix[tmpLine4][tmpCol1] = 0;
            matrix[tmpLine3][tmpCol2] = 0;
            matrix[tmpLine4][tmpCol2] = 0;
          } else {
            matrix[line][tmpCol1] = 0;
            matrix[line][tmpCol2] = 0;
            matrix[line][tmpCol3] = 0;
            matrix[line][tmpCol4] = 0;
            matrix[tmpLine1][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol4] = 0;
            matrix[tmpLine2][tmpCol3] = 0;
            matrix[tmpLine2][tmpCol4] = 0;
          }
        }
        break;
      case 8:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpLine4 += 4;
            tmpCol1 -= 1;
            tmpCol2 += 1;
            tmpCol3 += 2;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 += 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            tmpCol4 += 4;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpLine4 -= 4;
            tmpCol1 += 1;
            tmpCol2 -= 1;
            tmpCol3 -= 2;
            break;
          case'R':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 -= 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            tmpCol4 -= 4;
            break;
        }
        if (sign === '-') {
          if (tmpLine4 > -1 && tmpLine4 < 10 && tmpCol1 > -1 && tmpCol1 < 10
            && tmpCol3 > -1 && tmpCol3 < 10 && tmpLine2 > -1 && tmpLine2 < 10
            && tmpLine3 > -1 && tmpLine3 < 10 && tmpCol4 > -1 && tmpCol4 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[tmpLine1][col] && !matrix[tmpLine2][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[tmpLine3][col] && !matrix[tmpLine4][tmpCol1]
              && !matrix[tmpLine4][col] && !matrix[line][tmpCol2]
              && !matrix[tmpLine1][tmpCol2] && !matrix[tmpLine2][tmpCol2]
              && !matrix[tmpLine3][tmpCol2] && !matrix[tmpLine4][tmpCol2]/////////
              && !matrix[tmpLine2][tmpCol3] && !matrix[tmpLine3][tmpCol3]
              && !matrix[tmpLine4][tmpCol3] && !matrix[line][tmpCol1]
              && !matrix[line][tmpCol3] && !matrix[line][tmpCol4]
              && !matrix[tmpLine3][tmpCol4] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine1][tmpCol3] && !matrix[tmpLine1][tmpCol4]
              && !matrix[tmpLine2][tmpCol4]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.0', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol2] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol3] = {name: dropData + '_3.3', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol3] = {name: dropData + '_5.3', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol2] = {name: dropData + '_3.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol4] = {name: dropData + '_5.0', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.3', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol4] = {name: dropData + '_5.3', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol2] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol2] = 0;
          matrix[tmpLine2][tmpCol2] = 0;
          matrix[tmpLine2][tmpCol3] = 0;
          matrix[tmpLine3][tmpCol3] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine3][col] = 0;
            matrix[tmpLine4][col] = 0;
            matrix[tmpLine2][tmpCol1] = 0;
            matrix[tmpLine3][tmpCol1] = 0;
            matrix[tmpLine4][tmpCol1] = 0;
            matrix[tmpLine3][tmpCol2] = 0;
            matrix[tmpLine4][tmpCol2] = 0;
            matrix[tmpLine4][tmpCol3] = 0;
          } else {
            matrix[line][tmpCol1] = 0;
            matrix[line][tmpCol3] = 0;
            matrix[line][tmpCol4] = 0;
            matrix[tmpLine3][tmpCol2] = 0;
            matrix[tmpLine3][tmpCol4] = 0;
            matrix[tmpLine1][tmpCol1] = 0;
            matrix[tmpLine1][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol4] = 0;
            matrix[tmpLine2][tmpCol4] = 0;
          }
        }
        break;
      case 9:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpLine4 += 4;
            tmpCol1 += 1;
            tmpCol2 += 2;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            tmpCol4 += 4;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpLine4 -= 4;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            break;
          case'R':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            tmpCol4 -= 4;
            break;
        }
        if (sign === '-') {
          if (tmpLine4 > -1 && tmpLine4 < 10 && tmpCol2 > -1 && tmpCol2 < 10
            && tmpLine2 > -1 && tmpLine2 < 10 && tmpCol4 < 10 && tmpCol4 > -1) {
            if (!matrix[line][col] && !matrix[line][tmpCol1]
              && !matrix[line][tmpCol2] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine1][col]
              && !matrix[tmpLine1][tmpCol1] && !matrix[tmpLine1][tmpCol2]
              && !matrix[tmpLine1][tmpCol3] && !matrix[tmpLine1][tmpCol4]
              && !matrix[tmpLine2][col] && !matrix[tmpLine2][tmpCol1]
              && !matrix[tmpLine3][tmpCol1] && !matrix[tmpLine4][tmpCol1]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_1.3', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.3', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_1.3', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_2.3', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol1] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol1] = 0;
          matrix[tmpLine1][tmpCol2] = 0;
          matrix[tmpLine2][tmpCol1] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine3][tmpCol1] = 0;
            matrix[tmpLine4][tmpCol1] = 0;
            matrix[line][tmpCol2] = 0;
          } else {
            matrix[tmpLine1][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol4] = 0;
            matrix[tmpLine2][col] = 0;
          }
        }
        break;
      case 10:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpCol1 -= 1;
            tmpCol2 += 1;
            tmpCol3 += 2;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 += 1;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpCol1 += 1;
            tmpCol2 -= 1;
            tmpCol3 -= 2;
            break;
          case'R':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 -= 1;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            break;
        }
        if (sign === '-') {
          if (tmpCol1 > -1 && tmpCol1 < 10 && tmpCol3 > -1 && tmpCol3 < 10
            && tmpLine2 > -1 && tmpLine2 < 10 && tmpLine3 > -1 && tmpLine3 < 10) {
            if (!matrix[line][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[tmpLine1][col] && !matrix[tmpLine2][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine3][tmpCol1]
              && !matrix[line][tmpCol2] && !matrix[tmpLine3][tmpCol2]
              && !matrix[tmpLine1][tmpCol2] && !matrix[tmpLine2][tmpCol2]
              && !matrix[tmpLine2][tmpCol3] && !matrix[tmpLine3][tmpCol3]
              && !matrix[line][tmpCol1] && !matrix[line][tmpCol3]
              && !matrix[tmpLine1][tmpCol1] && !matrix[tmpLine1][tmpCol3]
              && !matrix[tmpLine3][col]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol3] = {name: dropData + '_3.3', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol2] = {name: dropData + '_3.0', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.3', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[line][tmpCol2] = 0;
          matrix[tmpLine1][col] = 0;
          matrix[tmpLine1][tmpCol2] = 0;
          matrix[tmpLine2][tmpCol2] = 0;
          matrix[tmpLine2][tmpCol3] = 0;
          matrix[tmpLine3][tmpCol3] = 0;
          matrix[tmpLine3][tmpCol2] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine2][col] = 0;
            matrix[tmpLine3][col] = 0;
            matrix[tmpLine2][tmpCol1] = 0;
            matrix[tmpLine3][tmpCol1] = 0;
          } else {
            matrix[line][tmpCol1] = 0;
            matrix[line][tmpCol3] = 0;
            matrix[tmpLine1][tmpCol1] = 0;
            matrix[tmpLine1][tmpCol3] = 0;
          }
        }
        break;
      case 11:
        switch (direction) {
          case'U':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpLine3 += 3;
            tmpCol1 += 1;
            tmpCol2 += 2;
            break;
          case'L':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpCol1 += 1;
            tmpCol2 += 2;
            tmpCol3 += 3;
            break;
          case'D':
            tmpLine1 -= 1;
            tmpLine2 -= 2;
            tmpLine3 -= 3;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            break;
          case'R':
            tmpLine1 += 1;
            tmpLine2 += 2;
            tmpCol1 -= 1;
            tmpCol2 -= 2;
            tmpCol3 -= 3;
            break;
        }
        if (sign === '-') {
          if (tmpCol2 > -1 && tmpCol2 < 10 && tmpLine2 > -1 && tmpLine2 < 10
            && tmpCol3 > -1 && tmpCol3 < 10 && tmpLine3 > -1 && tmpLine3 < 10) {
            if (!matrix[line][col] && !matrix[line][tmpCol1]
              && !matrix[line][tmpCol2] && !matrix[tmpLine1][tmpCol1]
              && !matrix[tmpLine2][col] && !matrix[tmpLine1][col]
              && !matrix[tmpLine1][tmpCol1] && !matrix[tmpLine1][tmpCol2]
              && !matrix[tmpLine1][tmpCol3] && !matrix[tmpLine2][col]
              && !matrix[tmpLine2][tmpCol1] && !matrix[tmpLine3][tmpCol1]) {
              numberOfShips = this.changeNumberOfShips(numberOfShips, dropData, sign);
              if (direction === 'U' || direction === 'D') {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[line][tmpCol2] = {name: dropData + '_1.3', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.3', direction: this.getRotation(direction)};
              } else {
                matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(direction)};
                matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(direction)};
                matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(direction)};
                matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(direction)};
                matrix[tmpLine2][col] = {name: dropData + '_1.3', direction: this.getRotation(direction)};
                matrix[tmpLine2][tmpCol1] = {name: dropData + '_2.3', direction: this.getRotation(direction)};
              }
            } else {
              output = 'Unable to put this here';
            }
          } else {
            output = 'Unable to put this here';
          }
        } else {
          matrix[tmpLine1][col] = 0;
          matrix[line][tmpCol1] = 0;
          matrix[tmpLine1][tmpCol1] = 0;
          matrix[tmpLine2][tmpCol1] = 0;
          matrix[tmpLine1][tmpCol2] = 0;
          if (direction === 'U' || direction === 'D') {
            matrix[tmpLine3][tmpCol1] = 0;
            matrix[line][tmpCol2] = 0;
          } else {
            matrix[tmpLine1][tmpCol3] = 0;
            matrix[tmpLine2][col] = 0;
          }
        }
        break;
    }
    return {message: output, mat: matrix, ships: numberOfShips};
  };
}
