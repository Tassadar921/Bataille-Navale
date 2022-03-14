import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DroppableDirective} from 'angular-draggable-droppable';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  @ViewChild(DroppableDirective, {read: ElementRef, static: true})

  public droppedData = '';
  public matrix = [];
  public race = 'human';
  public output = '';

  private direction = 'U';
  private model = [
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

  constructor() {
  }

  ngOnInit() {
    const tab = [];
    let row;
    for (let i = 0; i < 10; i++) {
      row = [];
      for (let k = 0; k < 10; k++) {
        row.push(0);
      }
      this.matrix.push(row);
    }
  }

  setSelected = (val) => this.direction = val;

  setId = (key) => {
    if (this.direction === key) {
      return 'selected';
    } else {
      return '';
    }
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

  nameToShape = (name) => {
    for (let i = 0; i < this.model.length; i++) {
      if (this.model[i].name === name) {
        return this.model[i].shape;
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

  onDrop = (dropData, col, line) => {
    this.output='';
    col = this.letterToNum(col);
    console.log('line : ', line);
    console.log('col : ', col);
    let tmpLine1 = line;
    let tmpLine2 = line;
    let tmpLine3 = line;
    let tmpLine4 = line;
    let tmpCol1 = col;
    let tmpCol2 = col;
    let tmpCol3 = col;
    let tmpCol4 = col;
    switch (this.nameToShape(dropData)) {
      case 1:
        if (!this.matrix[line][col]) {
          this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 2:
        switch (this.direction) {
          case'U':
            tmpLine1+=1;
            break;
          case'L':
            tmpCol1+=1;
            break;
          case'D':
            tmpLine1-=1;
            break;
          case'R':
            tmpCol1-=1;
            break;
        }
        if(tmpCol1>-1 && tmpCol1<10 && tmpLine1>-1 && tmpLine1<10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine1][tmpCol1]) {
            this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
            this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 3:
        switch (this.direction) {
          case'U':
            tmpLine1+=1;
            tmpLine2+=2;
            tmpCol1+=1;
            break;
          case'L':
            tmpLine1-=1;
            tmpCol1+=1;
            tmpCol2+=2;
            break;
          case'D':
            tmpLine1-=1;
            tmpLine2-=2;
            tmpCol1-=1;
            break;
          case'R':
            tmpLine1+=1;
            tmpCol1-=1;
            tmpCol2-=2;
            break;
        }
        if(tmpCol1>-1 && tmpCol1<10 && tmpLine2>-1 && tmpLine2<10) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]) {
            if(this.direction==='U' || this.direction==='D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
            }else{
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 4:
        switch (this.direction) {
          case'U':
            tmpLine1+=1;
            tmpLine2+=2;
            tmpLine3+=3;
            break;
          case'L':
            tmpCol1+=1;
            tmpCol2+=2;
            tmpCol3+=3;
            break;
          case'D':
            tmpLine1-=1;
            tmpLine2-=2;
            tmpLine3-=3;
            break;
          case'R':
            tmpCol1-=1;
            tmpCol2-=2;
            tmpCol3-=3;
            break;
        }
        if(tmpLine1>-1 && tmpLine1<10 && tmpCol1>-1 && tmpCol1<10
          && tmpLine2>-1 && tmpLine2<10 && tmpCol2>-1 && tmpCol2<10
          && tmpLine3>-1 && tmpLine3<10 && tmpCol3>-1 && tmpCol3<10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][tmpCol2] && !this.matrix[tmpLine3][tmpCol3]) {
            if(this.direction==='U' || this.direction==='D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
            }else{
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 5:
        switch (this.direction) {
          case'U':
            tmpLine1+=1;
            tmpLine2+=2;
            tmpCol1+=1;
            break;
          case'L':
            tmpLine1-=1;
            tmpCol1+=1;
            tmpCol2+=2;
            break;
          case'D':
            tmpLine1-=1;
            tmpLine2-=2;
            tmpCol1-=1;
            break;
          case'R':
            tmpLine1+=1;
            tmpCol1-=1;
            tmpCol2-=2;
            break;
        }
        if(tmpCol1>-1 && tmpCol1<10 && tmpLine2>-1 && tmpLine2<10) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]) {
            if(this.direction==='U' || this.direction==='D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
            }else{
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
        break;
      case 11:
        break;
    }
    console.log(this.matrix);
  };
}
