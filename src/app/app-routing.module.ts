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

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'editProfile', component: ProfileComponent, canActivate: [AuthService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'chatRoom', component: RoomComponent, canActivate: [AuthService]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}