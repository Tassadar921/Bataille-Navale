import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';

import {MenuComponent} from '../shared/menu/menu/menu.component';
import {DeckSelectionComponent} from '../editor/deck-selection/deck-selection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule
  ],
  declarations: [RoomPage, MenuComponent, DeckSelectionComponent]
})
export class RoomPageModule {}
