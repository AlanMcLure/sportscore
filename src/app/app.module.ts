import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//--
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
//--
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
//--
import { AdminJugadorPlistRoutedComponent } from './components/jugador/admin-jugador-plist-routed/admin-jugador-plist-routed.component';
import { AdminJugadorViewRoutedComponent } from './components/jugador/admin-jugador-view-routed/admin-jugador-view-routed.component';
import { AdminJugadorNewRoutedComponent } from './components/jugador/admin-jugador-new-routed/admin-jugador-new-routed.component';
import { AdminJugadorEditRoutedComponent } from './components/jugador/admin-jugador-edit-routed/admin-jugador-edit-routed.component';
import { AdminJugadorPlistUnroutedComponent } from './components/jugador/admin-jugador-plist-unrouted/admin-jugador-plist-unrouted.component';
import { AdminJugadorDetailUnroutedComponent } from './components/jugador/admin-jugador-detail-unrouted/admin-jugador-detail-unrouted.component';
import { AdminJugadorFormUnroutedComponent } from './components/jugador/admin-jugador-form-unrouted/admin-jugador-form-unrouted.component';
import { AdminPartidoEditRoutedComponent } from './components/partido/admin-partido-edit-routed/admin-partido-edit-routed.component';
import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminPartidoPlistRoutedComponent } from './components/partido/admin-partido-plist-routed/admin-partido-plist-routed.component';
import { AdminEquipoPlistUnroutedComponent } from './components/equipo/admin-equipo-plist-unrouted/admin-equipo-plist-unrouted.component';
import { AdminEquipoDetailUnroutedComponent } from './components/equipo/admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';
import { AdminPartidoPlistUnroutedComponent } from './components/partido/admin-partido-plist-unrouted/admin-partido-plist-unrouted.component';
import { AdminPartidoDetailUnroutedComponent } from './components/partido/admin-partido-detail-unrouted/admin-partido-detail-unrouted.component';
import { AdminEquipoPlistRoutedComponent } from './components/equipo/admin-equipo-plist-routed/admin-equipo-plist-routed.component';
import { AdminEquipoFormUnroutedComponent } from './components/equipo/admin-equipo-form-unrouted/admin-equipo-form-unrouted.component';
import { AdminPartidoViewRoutedComponent } from './components/partido/admin-partido-view-routed/admin-partido-view-routed.component';
import { AdminPartidoNewRoutedComponent } from './components/partido/admin-partido-new-routed/admin-partido-new-routed.component';
import { AdminPartidoFormUnroutedComponent } from './components/partido/admin-partido-form-unrouted/admin-partido-form-unrouted.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';
import { TrimPipe } from './pipes/trim.pipe.ts.pipe';
import { JugadorAjaxService } from './service/jugador.ajax.service.service';
import { EquipoAjaxService } from './service/equipo.ajax.service.service';
import { PartidoAjaxService } from './service/partido.ajax.service.service';
import { AdminEquipoSelectionUnroutedComponent } from './components/equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { SessionAjaxService } from './service/session.ajax.service.ts.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { CryptoService } from './service/crypto.service';

//--
@NgModule({
  declarations: [
    TrimPipe,
    AppComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    //--
    AdminJugadorPlistRoutedComponent,
    AdminJugadorViewRoutedComponent,
    AdminJugadorNewRoutedComponent,
    AdminJugadorEditRoutedComponent,
    AdminJugadorPlistUnroutedComponent,
    AdminJugadorDetailUnroutedComponent,
    AdminJugadorFormUnroutedComponent,
    //--
    AdminEquipoPlistRoutedComponent,
    AdminEquipoViewRoutedComponent,
    AdminEquipoNewRoutedComponent,
    AdminEquipoEditRoutedComponent,
    AdminEquipoPlistUnroutedComponent,
    AdminEquipoDetailUnroutedComponent,
    AdminEquipoFormUnroutedComponent,
    AdminEquipoSelectionUnroutedComponent,
    //--

    //--
    AdminPartidoPlistRoutedComponent,
    AdminPartidoViewRoutedComponent,
    AdminPartidoNewRoutedComponent,
    AdminPartidoEditRoutedComponent,
    AdminPartidoPlistUnroutedComponent,
    AdminPartidoDetailUnroutedComponent,
    AdminPartidoFormUnroutedComponent,
    //--    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //--
    BrowserAnimationsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    PaginatorModule,
    TableModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    //--
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    //--
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    MatSnackBar,
    JugadorAjaxService,
    EquipoAjaxService,
    PartidoAjaxService,
    SessionAjaxService,
    CryptoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
