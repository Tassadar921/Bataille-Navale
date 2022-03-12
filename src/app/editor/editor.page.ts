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

  @ViewChild(DroppableDirective, { read: ElementRef, static: true })
  droppableElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onDrop({ dropData }: DropEvent<string>): void {
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }

  onDrop2({ dropData }: DropEvent<string>): void {
    this.droppedData2 = dropData;
    setTimeout(() => {
      this.droppedData2 = '';
    }, 2000);
  }

  validateDrop: ValidateDrop = ({ target }) =>
    this.droppableElement.nativeElement.contains(target as Node);

}
