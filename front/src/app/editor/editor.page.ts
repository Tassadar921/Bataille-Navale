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
  public race;
  public output = '';

  private selected = 'U';

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

  setSelected = (val) => this.selected=val;

  setId = (key) => {
    if(this.selected===key){
      return 'selected';
    }else{
      return '';
    }
  };

  letterToNum = (letter) => {
    const num = [
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    for (let i = 0; i<num[0].length; i++) {
      if(num[0][i] === letter){
        return num[1][i];
      }
    }
    return -1;
  };

  onDrop = (dropData, letter, num) => {
    console.log(dropData + ' ' + letter + num);
    const col = this.letterToNum(letter);
    if(!this.matrix[num][col]) {
      console.log(num);
      console.log(col);
      this.matrix[num][col] = dropData;
      console.log(this.matrix);
    }
  };
}
