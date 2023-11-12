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
import { AdminReplyEditRoutedComponent } from './components/reply/admin-reply-edit-routed/admin-reply-edit-routed.component';
import { AdminThreadNewRoutedComponent } from './components/thread/admin-thread-new-routed/admin-thread-new-routed.component';
import { AdminReplyPlistRoutedComponent } from './components/reply/admin-reply-plist-routed/admin-reply-plist-routed.component';
import { AdminThreadPlistUnroutedComponent } from './components/thread/admin-thread-plist-unrouted/admin-thread-plist-unrouted.component';
import { AdminThreadDetailUnroutedComponent } from './components/thread/admin-thread-detail-unrouted/admin-thread-detail-unrouted.component';
import { AdminReplyPlistUnroutedComponent } from './components/reply/admin-reply-plist-unrouted/admin-reply-plist-unrouted.component';
import { AdminReplyDetailUnroutedComponent } from './components/reply/admin-reply-detail-unrouted/admin-reply-detail-unrouted.component';
import { AdminThreadPlistRoutedComponent } from './components/thread/admin-thread-plist-routed/admin-thread-plist-routed.component';
import { AdminThreadFormUnroutedComponent } from './components/thread/admin-thread-form-unrouted/admin-thread-form-unrouted.component';
import { AdminReplyViewRoutedComponent } from './components/reply/admin-reply-view-routed/admin-reply-view-routed.component';
import { AdminReplyNewRoutedComponent } from './components/reply/admin-reply-new-routed/admin-reply-new-routed.component';
import { AdminReplyFormUnroutedComponent } from './components/reply/admin-reply-form-unrouted/admin-reply-form-unrouted.component';
import { AdminThreadViewRoutedComponent } from './components/thread/admin-thread-view-routed/admin-thread-view-routed.component';
import { AdminThreadEditRoutedComponent } from './components/thread/admin-thread-edit-routed/admin-thread-edit-routed.component';
import { AdminJugadorSelectionUnroutedComponent } from './components/jugador/admin-jugador-selection-unrouted/admin-jugador-selection-unrouted.component';
import { TrimPipe } from './pipes/trim.pipe.ts.pipe';
import { JugadorAjaxService } from './service/jugador.ajax.service.service';
import { EquipoAjaxService } from './service/equipo.ajax.service.service';
import { PartidoAjaxService } from './service/partido.ajax.service.service';
import { AdminThreadSelectionUnroutedComponent } from './components/thread/admin-thread-selection-unrouted/admin-thread-selection-unrouted.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { SessionAjaxService } from './service/session.ajax.service.ts.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { UserThreadPlistUnroutedComponent } from './components/thread/user-thread-plist-unrouted/user-thread-plist-unrouted.component';
import { UserReplyPlistUnroutedComponent } from './components/reply/user-reply-plist-unrouted/user-reply-plist-unrouted.component';
import { CryptoService } from './service/crypto.service';
import { UserReplyDetailUnroutedComponent } from './components/reply/user-reply-detail-unrouted/user-reply-detail-unrouted.component';
import { UserThreadFeaturedUnroutedComponent } from './components/thread/user-thread-featured-unrouted/user-thread-featured-unrouted.component';

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
    AdminJugadorSelectionUnroutedComponent,
    //--
    AdminThreadPlistRoutedComponent,
    AdminThreadViewRoutedComponent,
    AdminThreadNewRoutedComponent,
    AdminThreadEditRoutedComponent,
    AdminThreadPlistUnroutedComponent,
    AdminThreadDetailUnroutedComponent,
    AdminThreadFormUnroutedComponent,
    AdminThreadSelectionUnroutedComponent,
    UserThreadFeaturedUnroutedComponent,
    //--
    UserThreadPlistUnroutedComponent,
    UserReplyPlistUnroutedComponent,
    UserReplyDetailUnroutedComponent,
    //--
    AdminReplyPlistRoutedComponent,
    AdminReplyViewRoutedComponent,
    AdminReplyNewRoutedComponent,
    AdminReplyEditRoutedComponent,
    AdminReplyPlistUnroutedComponent,
    AdminReplyDetailUnroutedComponent,
    AdminReplyFormUnroutedComponent,
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
