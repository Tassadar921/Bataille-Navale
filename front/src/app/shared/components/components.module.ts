import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {MenuComponent} from './menu/menu.component';
import {DeckSelectionComponent} from './deck-selection/deck-selection.component';


@NgModule({
  declarations: [MenuComponent, DeckSelectionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MenuComponent, DeckSelectionComponent]
})
export class ComponentsModule { }
