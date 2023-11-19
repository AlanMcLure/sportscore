import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IJugador, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = "";
  oSessionJugador: IJugador | null = null;
  strUrl: string = "";

  constructor(
    private oSessionService: SessionAjaxService,
    public oDialogService: DialogService,
    private oJugadorAjaxService: JugadorAjaxService,
    private oRouter: Router
  ) {
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })
    
    this.strUserName = oSessionService.getUsername();
    this.oJugadorAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oJugador: IJugador) => {
        this.oSessionJugador = oJugador;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUserName = this.oSessionService.getUsername();
          this.oJugadorAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oJugador: IJugador) => {
              this.oSessionJugador = oJugador;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.strUserName = "";
        }
      }
    });
  }

}


