import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClanPageRoutingModule } from './clan-routing.module';

import { ClanPage } from './clan.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClanPage]
})
export class ClanPageModule {}
