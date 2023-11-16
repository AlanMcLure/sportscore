import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';

@Component({
  selector: 'app-admin-equipo-form-unrouted',
  templateUrl: './admin-equipo-form-unrouted.component.html',
  styleUrls: ['./admin-equipo-form-unrouted.component.css']
})

export class AdminEquipoFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  equipoForm!: FormGroup;
  oEquipo: IEquipo = {} as IEquipo;
  status: HttpErrorResponse | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private equipoAjaxService: EquipoAjaxService,
    private router: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oEquipo);
  }

  initializeForm(oEquipo: IEquipo) {
    this.equipoForm = this.formBuilder.group({
      id: [oEquipo.id],
      nombre: [oEquipo.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      pais_origen: [oEquipo.pais_origen, [Validators.required]],
      ciudad_origen: [oEquipo.ciudad_origen],
      fecha_fundacion: [oEquipo.fecha_fundacion, [Validators.required]],
      entrenador: [oEquipo.entrenador]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.equipoAjaxService.getOne(this.id).subscribe({
        next: (data: IEquipo) => {
          this.oEquipo = data;
          this.initializeForm(this.oEquipo);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error leyendo equipo desde el server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oEquipo);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.equipoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      if (this.operation === 'NEW') {
        this.equipoAjaxService.newOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            this.oMatSnackBar.open('El equipo ha sido creado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'equipo', 'view', this.oEquipo]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('No se ha podido crear el equipo.', '', { duration: 2000 });
          }
        });
      } else {
        this.equipoAjaxService.updateOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            this.oMatSnackBar.open('El equipo ha sido actualizado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'equipo', 'view', this.oEquipo.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('No se ha podido actualizar el equipo.', '', { duration: 2000 });
          }
        });
      }
    }
  }

}
