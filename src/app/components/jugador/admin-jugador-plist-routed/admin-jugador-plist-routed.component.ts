import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
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
  hasEquipos: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oJugadorAjaxService: JugadorAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oEquipoAjaxService: EquipoAjaxService
  ) {
    // El id ese no se si habrá que cambiarlo
    this.equipoId = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
    this.checkIfEquiposExist();
  }

  ngOnInit() { }

  private checkIfEquiposExist() {
    // Lógica para verificar si hay equipos
    this.oEquipoAjaxService.getAll().subscribe({
      next: (equipos) => {
        console.log('Equipos:', equipos);
        this.hasEquipos = equipos.length > 0;
      },
      error: (error) => {
        console.error('Error al obtener equipos:', error);
      }
    });
  }

  doGenerateRandom(amount: number) {
    this.oEquipoAjaxService.getAll().subscribe({
      next: (equipos) => {
        if (equipos.length > 0) {
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
          });
        } else {
          this.oMatSnackBar.open('Crea equipos primero', 'Cerrar', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error("Error al obtener equipos:", error);
      }
    });
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
