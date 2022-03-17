import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

import {MenuComponent} from '../shared/menu/menu/menu.component';
import {DeckSelectionComponent} from './deck-selection/deck-selection.component';

import {DragAndDropModule} from 'angular-draggable-droppable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    DragAndDropModule
  ],
  declarations: [EditorPage, MenuComponent, DeckSelectionComponent]
})
export class EditorPageModule {}
