import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-jugador-plist-routed',
  templateUrl: './admin-jugador-plist-routed.component.html',
  styleUrls: ['./admin-jugador-plist-routed.component.css']
})
export class AdminJugadorPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  equipoId: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oJugadorAjaxService: JugadorAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    // El id ese no se si habrá que cambiarlo
    this.equipoId = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;    
    this.oJugadorAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " jugadores", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error al generar los jugadores: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Estas seguro de que quieres borrar todos los jugadores?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oJugadorAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " jugadores", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al borrar todos los jugadores: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Empty cancelado!", '', { duration: 2000 });
      }
    });
  }

}
