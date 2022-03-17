import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DroppableDirective} from 'angular-draggable-droppable';
import {HttpService} from '../shared/services/http.service';
import {DeckSelectionComponent} from './deck-selection/deck-selection.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, AfterViewInit {

  @ViewChild(DroppableDirective, {read: ElementRef, static: true})
  @ViewChild(DeckSelectionComponent) deckSelection: DeckSelectionComponent;

  public droppedData = '';
  public matrix = [];
  public race = 'human';
  public output = '';
  public deckName = '';
  public outputSubmit;

  private direction = 'U';
  private retour;
  private modal;
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

  constructor(
    private http: HttpService,
  ) {}

  ngOnInit() {
    this.reinitMatrix();
  }

  ngAfterViewInit() {
    this.modal = document.getElementById('modal');
  }

  closeModal = () => {
    this.matrix = this.deckSelection.matrix;
  };

  modalClosing = () => {

  };

  isFirst = (name) => name.includes('1.1');

  reinitMatrix = () => {
    this.matrix = [];
    let row;
    for (let i = 0; i < 10; i++) {
      row = [];
      for (let k = 0; k < 10; k++) {
        row.push(0);
      }
      this.matrix.push(row);
    }
  };

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

  trigger = (input) => {
    if(input==='Enter'){
      this.save();
    }
  };

  save = async () => {
    if(this.deckName) {
      this.retour = await this.http.saveDeck(this.matrix, this.race, this.deckName);
      this.outputSubmit=this.retour.message;
    }
  };

  chargeDeck = () => {

  };

  onDrop = (dropData, col, line) => {
    this.output = '';
    col = this.letterToNum(col);
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
        if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10) {
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
        if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10
          && tmpCol2 > -1 && tmpCol2 < 10 && tmpLine2 > -1 && tmpLine2 < 10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine1][tmpCol2]
            && !this.matrix[line][tmpCol1] && !this.matrix[line][tmpCol2]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
            } else {
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
        if (tmpLine3 > -1 && tmpLine3 < 10 && tmpCol3 > -1 && tmpCol3 < 10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][tmpCol2] && !this.matrix[tmpLine3][tmpCol3]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
            } else {
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
        if (tmpLine3 > -1 && tmpLine3 < 10 && tmpCol3 > -1 && tmpCol3 < 10 && tmpCol1 > -1
          && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]
            && !this.matrix[tmpLine3][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[line][tmpCol2] && !this.matrix[tmpLine1][tmpCol2]
            && !this.matrix[line][tmpCol3] && !this.matrix[tmpLine1][tmpCol3]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 6:
        switch (this.direction) {
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
        if (tmpCol1 > -1 && tmpCol1 < 10 && tmpLine1 > -1 && tmpLine1 < 10
          && tmpCol4 > -1 && tmpCol4 < 10 && tmpLine4 > -1 && tmpLine4 < 10) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]
            && !this.matrix[tmpLine3][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[line][tmpCol2] && !this.matrix[tmpLine1][tmpCol2]
            && !this.matrix[line][tmpCol3] && !this.matrix[tmpLine1][tmpCol3]
            && !this.matrix[line][tmpCol4] && !this.matrix[tmpLine1][tmpCol4]
            && !this.matrix[tmpLine4][col] && !this.matrix[tmpLine4][tmpCol1]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 7:
        switch (this.direction) {
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
        if (tmpLine1 > -1 && tmpLine1 < 10 && tmpLine4 > -1 && tmpLine4 < 10
          && tmpLine2 > -1 && tmpLine2 < 10 && tmpCol2 > -1 && tmpCol2 < 10
          && tmpCol1 > -1 && tmpCol1 < 10 && tmpCol4 > -1 && tmpCol4 < 10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine4][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[tmpLine3][col] && !this.matrix[tmpLine3][tmpCol2]
            && !this.matrix[tmpLine4][col] && !this.matrix[tmpLine4][tmpCol2]
            && !this.matrix[line][tmpCol1] && !this.matrix[line][tmpCol2]
            && !this.matrix[line][tmpCol3] && !this.matrix[line][tmpCol4]
            && !this.matrix[tmpLine1][tmpCol3] && !this.matrix[tmpLine1][tmpCol4]
            && !this.matrix[tmpLine2][tmpCol3] && !this.matrix[tmpLine2][tmpCol4]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol2] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 8:
        switch (this.direction) {
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
        if (tmpLine4 > -1 && tmpLine4 < 10 && tmpCol1 > -1 && tmpCol1 < 10
          && tmpCol3 > -1 && tmpCol3 < 10 && tmpLine2 > -1 && tmpLine2 < 10
          && tmpLine3 > -1 && tmpLine3 < 10 && tmpCol4 > -1 && tmpCol4 < 10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine2][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[tmpLine3][col] && !this.matrix[tmpLine4][tmpCol1]
            && !this.matrix[tmpLine4][col] && !this.matrix[line][tmpCol2]
            && !this.matrix[tmpLine1][tmpCol2] && !this.matrix[tmpLine2][tmpCol2]
            && !this.matrix[tmpLine3][tmpCol2] && !this.matrix[tmpLine4][tmpCol2]/////////
            && !this.matrix[tmpLine2][tmpCol3] && !this.matrix[tmpLine3][tmpCol3]
            && !this.matrix[tmpLine4][tmpCol3] && !this.matrix[line][tmpCol1]
            && !this.matrix[line][tmpCol3] && !this.matrix[line][tmpCol4]
            && !this.matrix[tmpLine3][tmpCol4] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine1][tmpCol3] && !this.matrix[tmpLine1][tmpCol4]
            && !this.matrix[tmpLine2][tmpCol4]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][col] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.0', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol2] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol3] = {name: dropData + '_3.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol3] = {name: dropData + '_5.3', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol4] = {name: dropData + '_5.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol2] = {name: dropData + '_3.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol4] = {name: dropData + '_5.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol4] = {name: dropData + '_5.3', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 9:
        switch (this.direction) {
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
        if (tmpLine4 > -1 && tmpLine4 < 10 && tmpCol2 > -1 && tmpCol2 < 10
          && tmpLine2 > -1 && tmpLine2 < 10 && tmpCol4 < 10 && tmpCol4 > -1) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[line][tmpCol2] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine1][col]
            && !this.matrix[tmpLine1][tmpCol1] && !this.matrix[tmpLine1][tmpCol2]
            && !this.matrix[tmpLine1][tmpCol3] && !this.matrix[tmpLine1][tmpCol4]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine2][tmpCol1]
            && !this.matrix[tmpLine3][tmpCol1] && !this.matrix[tmpLine4][tmpCol1]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine4][tmpCol1] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_1.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.3', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol4] = {name: dropData + '_5.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_1.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_2.3', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 10:
        switch (this.direction) {
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
        if (tmpCol1 > -1 && tmpCol1 < 10 && tmpCol3 > -1 && tmpCol3 < 10
          && tmpLine2 > -1 && tmpLine2 < 10 && tmpLine3 > -1 && tmpLine3 < 10) {
          if (!this.matrix[line][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[tmpLine1][col] && !this.matrix[tmpLine2][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine3][tmpCol1]
            && !this.matrix[line][tmpCol2] && !this.matrix[tmpLine3][tmpCol2]
            && !this.matrix[tmpLine1][tmpCol2] && !this.matrix[tmpLine2][tmpCol2]
            && !this.matrix[tmpLine2][tmpCol3] && !this.matrix[tmpLine3][tmpCol3]
            && !this.matrix[line][tmpCol1] && !this.matrix[line][tmpCol3]
            && !this.matrix[tmpLine1][tmpCol1] && !this.matrix[tmpLine1][tmpCol3]
            && !this.matrix[tmpLine3][col]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][col] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol2] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol3] = {name: dropData + '_3.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_3.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol3] = {name: dropData + '_4.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol2] = {name: dropData + '_3.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol3] = {name: dropData + '_4.0', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol2] = {name: dropData + '_3.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol3] = {name: dropData + '_4.3', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
      case 11:
        switch (this.direction) {
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
        if (tmpCol2 > -1 && tmpCol2 < 10 && tmpLine2 > -1 && tmpLine2 < 10
          && tmpCol3 > -1 && tmpCol3 < 10 && tmpLine3 > -1 && tmpLine3 < 10) {
          if (!this.matrix[line][col] && !this.matrix[line][tmpCol1]
            && !this.matrix[line][tmpCol2] && !this.matrix[tmpLine1][tmpCol1]
            && !this.matrix[tmpLine2][col] && !this.matrix[tmpLine1][col]
            && !this.matrix[tmpLine1][tmpCol1] && !this.matrix[tmpLine1][tmpCol2]
            && !this.matrix[tmpLine1][tmpCol3] && !this.matrix[tmpLine2][col]
            && !this.matrix[tmpLine2][tmpCol1] && !this.matrix[tmpLine3][tmpCol1]) {
            if (this.direction === 'U' || this.direction === 'D') {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine3][tmpCol1] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol2] = {name: dropData + '_1.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_2.3', direction: this.getRotation(this.direction)};
            } else {
              this.matrix[line][col] = {name: dropData + '_1.1', direction: this.getRotation(this.direction)};
              this.matrix[line][tmpCol1] = {name: dropData + '_2.1', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][col] = {name: dropData + '_1.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol1] = {name: dropData + '_2.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol2] = {name: dropData + '_3.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine1][tmpCol3] = {name: dropData + '_4.2', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][col] = {name: dropData + '_1.3', direction: this.getRotation(this.direction)};
              this.matrix[tmpLine2][tmpCol1] = {name: dropData + '_2.3', direction: this.getRotation(this.direction)};
            }
          } else {
            this.output = 'Unable to put this here';
          }
        } else {
          this.output = 'Unable to put this here';
        }
        break;
    }
    // console.log(this.matrix);
  };

  deleteSpaceship = (ship, col, line) => {
    col = this.letterToNum(col);
    let tmpLine1 = line;
    let tmpLine2 = line;
    let tmpLine3 = line;
    let tmpLine4 = line;
    let tmpCol1 = col;
    let tmpCol2 = col;
    let tmpCol3 = col;
    let tmpCol4 = col;
    this.matrix[line][col] = 0;
    switch (this.nameToShape(ship.split('_')[0])) {
      case 2:
        switch (this.direction) {
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
        this.matrix[tmpLine1][tmpCol1] = 0;
        break;
      case 3:
        switch (this.direction) {
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
        this.matrix[tmpLine1][col] = 0;
        this.matrix[line][tmpCol1] = 0;
        this.matrix[tmpLine1][tmpCol1] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
        } else {
          this.matrix[line][tmpCol2] = 0;
          this.matrix[tmpLine1][tmpCol2] = 0;
        }
        break;
      case 4:
        switch (this.direction) {
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
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine1][tmpCol1] = 0;
          this.matrix[tmpLine2][tmpCol2] = 0;
          this.matrix[tmpLine3][tmpCol3] = 0;
        } else {
          this.matrix[line][tmpCol1] = 0;
          this.matrix[line][tmpCol2] = 0;
          this.matrix[line][tmpCol3] = 0;
        }
        break;
      case 5:
        switch (this.direction) {
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
        this.matrix[tmpLine1][col] = 0;
        this.matrix[line][tmpCol1] = 0;
        this.matrix[tmpLine1][tmpCol1] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
          this.matrix[tmpLine3][col] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
        } else {
          this.matrix[line][tmpCol2] = 0;
          this.matrix[tmpLine1][tmpCol2] = 0;
          this.matrix[line][tmpCol3] = 0;
          this.matrix[tmpLine1][tmpCol3] = 0;
        }
        break;
      case 6:
        switch (this.direction) {
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
        this.matrix[line][tmpCol1] = 0;
        this.matrix[tmpLine1][col] = 0;
        this.matrix[tmpLine1][tmpCol1] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
          this.matrix[tmpLine3][col] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
          this.matrix[tmpLine4][col] = 0;
          this.matrix[tmpLine4][tmpCol1] = 0;
        } else {
          this.matrix[line][tmpCol2] = 0;
          this.matrix[tmpLine1][tmpCol2] = 0;
          this.matrix[line][tmpCol3] = 0;
          this.matrix[tmpLine1][tmpCol3] = 0;
          this.matrix[line][tmpCol4] = 0;
          this.matrix[tmpLine1][tmpCol4] = 0;
        }
        break;
      case 7:
        switch (this.direction) {
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
        this.matrix[tmpLine3][col] = 0;
        this.matrix[tmpLine4][col] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine1][col] = 0;
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
          this.matrix[tmpLine4][tmpCol1] = 0;
          this.matrix[tmpLine3][tmpCol2] = 0;
          this.matrix[tmpLine4][tmpCol2] = 0;
        } else {
          this.matrix[line][tmpCol1] = 0;
          this.matrix[line][tmpCol2] = 0;
          this.matrix[line][tmpCol3] = 0;
          this.matrix[line][tmpCol4] = 0;
          this.matrix[tmpLine2][tmpCol3] = 0;
          this.matrix[tmpLine2][tmpCol4] = 0;
        }
        break;
      case 8:
        switch (this.direction) {
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
        this.matrix[line][tmpCol2] = 0;
        this.matrix[tmpLine1][col] = 0;
        this.matrix[tmpLine1][tmpCol2] = 0;
        this.matrix[tmpLine2][tmpCol2] = 0;
        this.matrix[tmpLine3][tmpCol2] = 0;
        this.matrix[tmpLine2][tmpCol3] = 0;
        this.matrix[tmpLine3][tmpCol3] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine3][col] = 0;
          this.matrix[tmpLine4][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
          this.matrix[tmpLine4][tmpCol1] = 0;
          this.matrix[tmpLine4][tmpCol2] = 0;
          this.matrix[tmpLine4][tmpCol3] = 0;
        } else {
          this.matrix[line][tmpCol1] = 0;
          this.matrix[line][tmpCol3] = 0;
          this.matrix[line][tmpCol4] = 0;
          this.matrix[tmpLine3][tmpCol4] = 0;
          this.matrix[tmpLine1][tmpCol1] = 0;
          this.matrix[tmpLine1][tmpCol3] = 0;
          this.matrix[tmpLine1][tmpCol4] = 0;
          this.matrix[tmpLine2][tmpCol4] = 0;
        }
        break;
      case 9:
        switch (this.direction) {
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
        this.matrix[tmpLine1][col] = 0;
        this.matrix[line][tmpCol1] = 0;
        this.matrix[tmpLine1][tmpCol1] = 0;
        this.matrix[tmpLine1][tmpCol2] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][tmpCol1] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
          this.matrix[tmpLine4][tmpCol1] = 0;
          this.matrix[line][tmpCol2] = 0;
        } else {
          this.matrix[tmpLine1][tmpCol3] = 0;
          this.matrix[tmpLine1][tmpCol4] = 0;
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
        }
        break;
      case 10:
        switch (this.direction) {
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
        this.matrix[tmpLine1][col] = 0;
        this.matrix[tmpLine1][tmpCol2] = 0;
        this.matrix[tmpLine2][tmpCol2] = 0;
        this.matrix[tmpLine2][tmpCol3] = 0;
        this.matrix[line][tmpCol2] = 0;
        this.matrix[tmpLine3][tmpCol2] = 0;
        this.matrix[tmpLine3][tmpCol3] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine2][col] = 0;
          this.matrix[tmpLine3][col] = 0;
          this.matrix[tmpLine2][tmpCol1] = 0;
          this.matrix[tmpLine3][tmpCol1] = 0;
        } else {
          this.matrix[line][tmpCol1] = 0;
          this.matrix[line][tmpCol3] = 0;
          this.matrix[tmpLine1][tmpCol1] = 0;
          this.matrix[tmpLine1][tmpCol3] = 0;
        }
        break;
      case 11:
        switch (this.direction) {
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
        this.matrix[tmpLine1][col] = 0;
        this.matrix[line][tmpCol1] = 0;
        this.matrix[tmpLine1][tmpCol1] = 0;
        this.matrix[tmpLine2][tmpCol1] = 0;
        if (this.direction === 'U' || this.direction === 'D') {
          this.matrix[tmpLine3][tmpCol1] = 0;
          this.matrix[line][tmpCol2] = 0;
          this.matrix[tmpLine1][tmpCol2] = 0;
        } else {
          this.matrix[tmpLine1][tmpCol2] = 0;
          this.matrix[tmpLine1][tmpCol3] = 0;
          this.matrix[tmpLine2][col] = 0;
        }
        break;
    }
    console.log(this.matrix);
  };
}
