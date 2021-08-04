import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // Lazy Load es un patrón de diseño que consiste en retrasar la carga o inicialización de un objeto hasta el momento de su utilización.
  // Esto significa que obtiene los datos o procesa los objetos solamente cuando se necesitan, no antes. Esto se debe a que si se obtiene todos los datos antes de usarlos puede tener como resultado una mala experiencia de usuario, esto es muy importante del lado del frontend, porque sabemos que toda la carga es del lado del cliente, modularizar y diferir cargas ayuda a la aplicación a enfocarse en un código en especifico.
  {path: 'dashboard', loadChildren: () => import("./components/dashboard/dashboard.module").then(x => x.DashboardModule)},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
