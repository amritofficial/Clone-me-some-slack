import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./services/auth.service";
import { RoomComponent } from "./room/room.component";
import { CreateChannelComponent } from "./room/create-channel/create-channel.component";
import { MessageComponent } from "./room/message/message.component";

export const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'editProfile', component: ProfileComponent, canActivate: [AuthService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'chatRoom/channels', component: RoomComponent,
        children: [
            {path: 'message/:cid', component: MessageComponent, outlet:'auxoutlet'},
            {path: 'create', component: CreateChannelComponent, outlet:'auxoutlet'}
        ]
    }
];

// @NgModule({
//     imports: [RouterModule.forRoot(appRoutes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule{

// }