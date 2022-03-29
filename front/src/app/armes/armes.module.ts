import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArmesPageRoutingModule } from './armes-routing.module';

import { ArmesPage } from './armes.page';
import {ComponentsModule} from "../shared/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArmesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArmesPage]
})
export class ArmesPageModule {}
