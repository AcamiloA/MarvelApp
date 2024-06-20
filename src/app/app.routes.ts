import { Routes } from '@angular/router';
import { ComicsComponent } from './comics/comics.component'
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/comics',
        pathMatch: 'full'
    },
    {
        path: 'comics',
        component: ComicsComponent
    }
    

];
