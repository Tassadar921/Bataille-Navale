import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsPageRoutingModule } from './friends-routing.module';

import { FriendsPage } from './friends.page';

import { SeeFriendsComponent } from './see-friends/see-friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { DemandsComponent } from './demands/demands.component';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FriendsPage, SeeFriendsComponent, AddFriendComponent, DemandsComponent]
})
export class FriendsPageModule {}
