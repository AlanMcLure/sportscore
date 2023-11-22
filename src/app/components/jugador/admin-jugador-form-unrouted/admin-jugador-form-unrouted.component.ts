import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IJugador, IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';
import { AdminEquipoSelectionUnroutedComponent } from '../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-admin-jugador-form-unrouted',
  templateUrl: './admin-jugador-form-unrouted.component.html',
  styleUrls: ['./admin-jugador-form-unrouted.component.css']
})
export class AdminJugadorFormUnroutedComponent implements OnInit {
  
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  es = CALENDAR_ES;

  jugadorForm!: FormGroup;
  oJugador: IJugador = { fechaNacimiento: new Date(Date.now()), equipo: {} } as IJugador;
  status: HttpErrorResponse | null = null;
  strUserName: string = "";
  oSessionJugador: IJugador | null = null;
  strUrl: string = "";

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oSessionService: SessionAjaxService,
    private oJugadorAjaxService: JugadorAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oJugador);
    this.oJugadorAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oJugador: IJugador) => {
        this.oSessionJugador = oJugador;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  initializeForm(oJugador: IJugador) {

    const fechaNacimiento = oJugador.fechaNacimiento instanceof Date
    ? oJugador.fechaNacimiento
    : new Date(oJugador.fechaNacimiento);

    this.jugadorForm = this.oFormBuilder.group({
      id: [oJugador.id],
      nombre: [oJugador.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido1: [oJugador.apellido1, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido2: [oJugador.apellido2, Validators.maxLength(255)],
      nacionalidad: [oJugador.nacionalidad],
      posicion: [oJugador.posicion],
      fechaNacimiento: [new Date(fechaNacimiento.setHours(0, 0, 0, 0)), Validators.required],
      email: [oJugador.email, [Validators.required, Validators.email]],
      username: [oJugador.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: [oJugador.password],
      role: [oJugador.role, Validators.required],
      equipo: this.oFormBuilder.group({
        id: [oJugador.equipo ? oJugador.equipo.id : null, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oJugadorAjaxService.getOne(this.id).subscribe({
        next: (data: IJugador) => {
          console.log('Datos del jugador en modo de edición:', data);
          this.oJugador = data;
          this.initializeForm(this.oJugador);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading user from server.", '', { duration: 2000 });
        }
      });
    } else {
      this.initializeForm(this.oJugador);
    }
  }
  

  public hasError = (controlName: string, errorName: string) => {
    return this.jugadorForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.jugadorForm.valid) {
      if (this.operation == 'NEW') {
        this.oJugadorAjaxService.newOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = { "equipo": {} } as IJugador;
            this.initializeForm(this.oJugador);
            this.oMatSnackBar.open("El jugador ha sido creado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se ha podido crear el jugador.", '', { duration: 2000 });
          }
        })
      } else {
        this.oJugadorAjaxService.updateOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = data;
            console.log(this.jugadorForm.value);
            this.initializeForm(this.oJugador);
            if (this.oSessionJugador && data.username) {
              // Actualizar el usuario de sesión después de la actualización
              this.oSessionJugador.username = data.username;
            }
            this.oMatSnackBar.open("El jugador ha sido actualizado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', this.oJugador.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se ha podido actualizar el jugador.", '', { duration: 2000 });
          }
        })
      }
    }
  }

  onShowUsersSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Selecciona un Equipo',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo | null) => {
      if (oEquipo) {
        this.oJugador.equipo = oEquipo;
        this.jugadorForm.controls['equipo'].patchValue({ id: oEquipo.id })
      }
    });
  }

}
