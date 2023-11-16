import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-equipo-plist-routed',
  templateUrl: './admin-equipo-plist-routed.component.html',
  styleUrls: ['./admin-equipo-plist-routed.component.css']
})
export class AdminEquipoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oEquipoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " equipos", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error al generar los equipos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Estas seguro de que quieres borrar todos los equipos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oEquipoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " equipos", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al borrar todos los equipos: " + oError.message, '', { duration: 2000 });
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
