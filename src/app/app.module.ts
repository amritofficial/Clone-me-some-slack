import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import * as firebase from 'firebase';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { environment } from '../environments/environment';
import { SidebarComponent } from './room/sidebar/sidebar.component';
import { RoomComponent } from './room/room.component';
import { ChannelsComponent } from './room/sidebar/channels/channels.component';
import { CreateChannelComponent } from './room/create-channel/create-channel.component';
import { ChannelService } from './services/channel.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidebarComponent,
    RoomComponent,
    ChannelsComponent,
    CreateChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, UserService, ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }