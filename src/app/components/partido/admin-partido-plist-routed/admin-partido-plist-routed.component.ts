import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-partido-plist-routed',
  templateUrl: './admin-partido-plist-routed.component.html',
  styleUrls: ['./admin-partido-plist-routed.component.css']
})
export class AdminPartidoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  equipo_id: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPartidoAjaxService: PartidoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    // No se si puede haber problemas aquí
    this.equipo_id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("equipo_id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
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
