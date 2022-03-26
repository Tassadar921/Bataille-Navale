import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';

import { ScoreboardPage } from './scoreboard.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ScoreboardPage]
})
export class ScoreboardPageModule {}
