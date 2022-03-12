import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';

import { ScoreboardPage } from './scoreboard.page';

import {MenuComponent} from '../shared/menu/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardPageRoutingModule
  ],
  declarations: [ScoreboardPage, MenuComponent]
})
export class ScoreboardPageModule {}
