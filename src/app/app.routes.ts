import { Routes } from '@angular/router';
import { ComicsComponent } from './comics/comics.component'
import { LoginComponent } from './session/login/login.component'
import { RegisterComponent } from './session/register/register.component'
import { authGuard } from './filters/guard-auth.guard';
export const routes: Routes = [
    {path:'comics', component:ComicsComponent, canActivate:[authGuard]}, 
    {path:'', component: LoginComponent},
    {path:'registro', component: RegisterComponent}
];
