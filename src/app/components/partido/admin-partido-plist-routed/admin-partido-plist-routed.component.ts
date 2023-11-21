import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-partido-plist-routed',
  templateUrl: './admin-partido-plist-routed.component.html',
  styleUrls: ['./admin-partido-plist-routed.component.css']
})
export class AdminPartidoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  equipoId: number;
  bLoading: boolean = false;
  hasEquipos: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private oPartidoAjaxService: PartidoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oEquipoAjaxService: EquipoAjaxService
  ) {
    // No se si puede haber problemas aquí
    this.equipoId = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
    this.checkIfEquiposExist();
  }

  ngOnInit() { 
    this.checkIfEquiposExist();
  }

  private checkIfEquiposExist() {
    // Lógica para verificar si hay equipos
    this.oEquipoAjaxService.getAll().subscribe({
      next: (equipos) => {
        if (Array.isArray(equipos.content)) {
          this.hasEquipos = equipos.content.length > 0;
        } else {
          console.error('La propiedad content de la respuesta de la API no es un arreglo.');
        }
      },
      error: (error) => {
        console.error('Error al obtener equipos:', error);
        this.hasEquipos = false;
      }
    });
  }

  doGenerateRandom(amount: number) {
    if (this.hasEquipos) {
      this.bLoading = true;
      this.oPartidoAjaxService.generateRandom(amount).subscribe({
        next: (oResponse: number) => {
          this.oMatSnackBar.open("Ahora hay " + oResponse + " partidos", '', { duration: 2000 });
          this.bLoading = false;
        },
        error: (oError: HttpErrorResponse) => {
          this.oMatSnackBar.open("Error al generar los partidos: " + oError.message, '', { duration: 2000 });
          this.bLoading = false;
        },
      })
    } else {
      this.oMatSnackBar.open('Crea equipos primero', 'Cerrar', { duration: 3000 });
    }
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Estas seguro de que quieres borrar todos los partidos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oPartidoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " partidos", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al borrar todos los partidos: " + oError.message, '', { duration: 2000 });
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
