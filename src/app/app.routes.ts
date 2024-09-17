import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
      },
      //     {
      //       path: 'users',
      //       component: UsersComponent,
      //       canActivate: [roleGuard],
      //       data: { role: 'user' },
      //     },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  // {
  //   path: 'no-access',
  // },
];
