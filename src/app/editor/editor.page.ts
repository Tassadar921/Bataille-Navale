import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DropEvent, DroppableDirective, ValidateDrop} from 'angular-draggable-droppable';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  public droppedData = '';
  public droppedData2 = '';
  public matrix = [];

  @ViewChild(DroppableDirective, { read: ElementRef, static: true })
  droppableElement: ElementRef;

  constructor() { }

  ngOnInit() {
    const tab = [];
    for(let i = 0; i<10; i++){
      tab.push(0);
    }
    for(let i = 0; i<10; i++){
      this.matrix.push(tab);
    }
  }

  onDrop = (dropData, letter, num) => {
    console.log(dropData + ' ' + letter + num);
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  };

}
