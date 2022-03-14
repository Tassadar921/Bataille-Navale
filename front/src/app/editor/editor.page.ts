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
    {name: 'human1', shape:3},
    {name: 'human2', shape:4},
    {name: 'human3', shape:8},
    {name: 'human4', shape:9},
    {name: 'enkar1', shape:1},
    {name: 'enkar2', shape:2},
    {name: 'enkar3', shape:6},
    {name: 'enkar4', shape:5},
    {name: 'arash1', shape:2},
    {name: 'arash2', shape:3},
    {name: 'arash3', shape:11},
    {name: 'arash4', shape:7},
    {name: 'sunari1', shape:2},
    {name: 'sunari2', shape:2},
    {name: 'sunari3', shape:12},
    {name: 'sunari4', shape:10},
    {name: 'vyrkul1', shape:2},
    {name: 'vyrkul2', shape:3},
    {name: 'vyrkul3', shape:6},
    {name: 'vyrkul4', shape:7},
  ];

  constructor() {}

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
    for(let i=0;i<this.model.length;i++){
      if(this.model[i].name===name){
        return this.model[i].shape;
      }
    }
    return -1;
  };

  getRotation = (direction) => {
    switch(direction){
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
    console.log(this.direction);
    console.log(dropData + ' ' + col + line);
    col = this.letterToNum(col);
    switch(this.nameToShape(dropData)){
      case 1:
        if(!this.matrix[line][col]) {
          this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
        }else{
          this.output='Unable to put this here';
        }
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
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
      case 12:
        break;
    }
  };
}
