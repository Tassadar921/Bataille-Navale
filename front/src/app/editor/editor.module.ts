import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

import {DeckSelectionComponent} from './deck-selection/deck-selection.component';

import {DragAndDropModule} from 'angular-draggable-droppable';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    DragAndDropModule,
    ComponentsModule
  ],
  declarations: [EditorPage, DeckSelectionComponent]
})
export class EditorPageModule {}
