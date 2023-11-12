import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';

import { AdminJugadorViewRoutedComponent } from './components/jugador/admin-jugador-view-routed/admin-jugador-view-routed.component';
import { AdminJugadorPlistRoutedComponent } from './components/jugador/admin-jugador-plist-routed/admin-jugador-plist-routed.component';
import { AdminJugadorEditRoutedComponent } from './components/jugador/admin-jugador-edit-routed/admin-jugador-edit-routed.component';
import { AdminJugadorNewRoutedComponent } from './components/jugador/admin-jugador-new-routed/admin-jugador-new-routed.component';

import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminEquipoPlistRoutedComponent } from './components/equipo/admin-equipo-plist-routed/admin-equipo-plist-routed.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';

import { AdminPartidoNewRoutedComponent } from './components/partido/admin-partido-new-routed/admin-partido-new-routed.component';
import { AdminPartidoPlistRoutedComponent } from './components/partido/admin-partido-plist-routed/admin-partido-plist-routed.component';
import { AdminPartidoViewRoutedComponent } from './components/partido/admin-partido-view-routed/admin-partido-view-routed.component';
import { AdminPartidoEditRoutedComponent } from './components/partido/admin-partido-edit-routed/admin-partido-edit-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },

  { path: 'admin/jugador/plist', component: AdminJugadorPlistRoutedComponent },
  { path: 'admin/jugador/view/:id', component: AdminJugadorViewRoutedComponent },
  { path: 'admin/jugador/new', component: AdminJugadorNewRoutedComponent },
  { path: 'admin/jugador/edit/:id', component: AdminJugadorEditRoutedComponent },

  { path: 'admin/equipo/new', component: AdminEquipoNewRoutedComponent },
  { path: 'admin/equipo/plist', component: AdminEquipoPlistRoutedComponent },
  { path: 'admin/equipo/view/:id', component: AdminEquipoViewRoutedComponent },
  { path: 'admin/equipo/edit/:id', component: AdminEquipoEditRoutedComponent },

  { path: 'admin/partido/new', component: AdminPartidoNewRoutedComponent },
  { path: 'admin/partido/plist', component: AdminPartidoPlistRoutedComponent },
  { path: 'admin/partido/view/:id', component: AdminPartidoViewRoutedComponent },
  { path: 'admin/partido/edit/:id', component: AdminPartidoEditRoutedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
