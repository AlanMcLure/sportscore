import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IJugador, IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';
import { AdminEquipoSelectionUnroutedComponent } from '../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';

@Component({
  selector: 'app-admin-jugador-form-unrouted',
  templateUrl: './admin-jugador-form-unrouted.component.html',
  styleUrls: ['./admin-jugador-form-unrouted.component.css']
})
export class AdminJugadorFormUnroutedComponent implements OnInit {
  
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  jugadorForm!: FormGroup;
  oJugador: IJugador = { equipo: {} } as IJugador;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oJugadorAjaxService: JugadorAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oJugador);
  }

  initializeForm(oJugador: IJugador) {
    this.jugadorForm = this.oFormBuilder.group({
      id: [oJugador.id],
      nombre: [oJugador.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido_1: [oJugador.apellido_1, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido_2: [oJugador.apellido_2, Validators.maxLength(255)],
      nacionalidad: [oJugador.nacionalidad],
      posicion: [oJugador.posicion],
      fecha_nacimiento: [oJugador.fecha_nacimiento, Validators.required],
      email: [oJugador.email, [Validators.required, Validators.email]],
      username: [oJugador.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: [oJugador.password],
      rol: [oJugador.rol, Validators.required],
      equipo: this.oFormBuilder.group({
        id: [oJugador.equipo.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oJugadorAjaxService.getOne(this.id).subscribe({
        next: (data: IJugador) => {
          this.oJugador = data;
          this.initializeForm(this.oJugador);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading user from server.", '', { duration: 2000 });
        }
      })
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
            this.oMatSnackBar.open("El Jugador ha sido creado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Fallo en la creación del Jugador.", '', { duration: 2000 });
          }
        })
      } else {
        this.oJugadorAjaxService.updateOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = data;
            this.initializeForm(this.oJugador);
            this.oMatSnackBar.open("El Jugador ha sido actualizado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', this.oJugador.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Fallo al actualizar el Jugador.", '', { duration: 2000 });
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

    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo) => {
      if (oEquipo) {
        this.oJugador.equipo = oEquipo;
        this.jugadorForm.controls['equipo'].patchValue({ id: oEquipo.id })
      }
    });
  }

}
