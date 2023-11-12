import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IJugador, formOperation } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';

@Component({
  selector: 'app-admin-jugador-form-unrouted',
  templateUrl: './admin-jugador-form-unrouted.component.html',
  styleUrls: ['./admin-jugador-form-unrouted.component.css']
})
export class AdminJugadorFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  jugadorForm!: FormGroup;
  oJugador: IJugador = {} as IJugador;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oJugadorAjaxService: JugadorAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oJugador);
  }

  initializeForm(oJugador: IJugador) {
    this.jugadorForm = this.oFormBuilder.group({
      id: [oJugador.id],
      nombre: [oJugador.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido1: [oJugador.apellido_1, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido2: [oJugador.apellido_2, Validators.maxLength(255)],
      nacionalidad: [oJugador.nacionalidad],
      posicion: [oJugador.posicion],
      fechaNacimiento: [oJugador.fecha_nacimiento, Validators.required],
      email: [oJugador.email, [Validators.required, Validators.email]],
      username: [oJugador.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: [oJugador.password],
      rol: [oJugador.rol, Validators.required],
      equipo: [oJugador.equipo]
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
            this.oJugador = data;
            this.initializeForm(this.oJugador);
            this.oMatSnackBar.open("User has been created.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', this.oJugador]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create user.", '', { duration: 2000 });
          }
        })
      } else {
        this.oJugadorAjaxService.updateOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = data;
            this.initializeForm(this.oJugador);
            this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'jugador', 'view', this.oJugador.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update user.", '', { duration: 2000 });
          }
        })
      }
    }
  }

}
