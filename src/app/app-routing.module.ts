import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {FootballCampPrintRegistrationsComponent} from './components/football-camp-print-registrations/football-camp-print-registrations.component';
import {FootballCampPrintReceiptComponent} from './components/football-camp-print-receipt/football-camp-print-receipt.component';
import {FootballCampPrintEquipmentComponent} from './components/football-camp-print-equipment/football-camp-print-equipment.component';
import {LoginComponent} from './shared/components/login/login.component';
import {IsSignedInGuard} from './shared/guards/is-signed-in.guard';
import {IsAdminGuard} from './shared/guards/is-admin.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'print-registration', component: FootballCampPrintRegistrationComponent},
  {path: 'print-registrations', component: FootballCampPrintRegistrationsComponent},
  {path: 'print-receipt', component: FootballCampPrintReceiptComponent},
  {path: 'print-equipment', component: FootballCampPrintEquipmentComponent},
  {
    path: 'accueil',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'administration',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [IsAdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'playground',
    loadChildren: () => import('./features/playground/playground.module').then(m => m.PlaygroundModule)
  },
  {
    path: 'stages/:id/details',
    loadChildren: () => import('./features/details/details.module').then(m => m.DetailsModule)
  },
  {
    path: 'stages/:id/inscription',
    loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [IsSignedInGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
