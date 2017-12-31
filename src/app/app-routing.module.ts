import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./services/auth.service";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'editProfile', component: ProfileComponent, canActivate: [AuthService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}