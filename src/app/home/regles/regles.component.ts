import { Component, OnInit } from '@angular/core';
import{DragAndDropModule} from 'angular-draggable-droppable';

@Component({
  selector: 'app-regles',
  templateUrl: './regles.component.html',
  styleUrls: ['./regles.component.scss'],
})
export class ReglesComponent implements OnInit {

  public droppedData;

  constructor() { }

  ngOnInit() {}

  dragEnd = (event) => {
    console.log('Element was dragged', event);
  };

}
