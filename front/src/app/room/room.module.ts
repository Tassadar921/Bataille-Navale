import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';

import {DeckSelectionComponent} from '../editor/deck-selection/deck-selection.component';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RoomPage, DeckSelectionComponent]
})
export class RoomPageModule {}
