import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglesPageRoutingModule } from './regles-routing.module';

import { ReglesPage } from './regles.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReglesPage]
})
export class ReglesPageModule {}
