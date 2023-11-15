import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPartido, IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';
import { AdminEquipoSelectionUnroutedComponent } from '../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component'; // Asegúrate de importar el componente correcto

@Component({
  selector: 'app-admin-partido-form-unrouted',
  templateUrl: './admin-partido-form-unrouted.component.html',
  styleUrls: ['./admin-partido-form-unrouted.component.css']
})

export class AdminPartidoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  partidoForm!: FormGroup;
  oPartido: IPartido = { equipo_local: {}, equipo_visitante: {} } as IPartido;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private partidoAjaxService: PartidoAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oPartido);
  }

  initializeForm(oPartido: IPartido) {
    this.partidoForm = this.formBuilder.group({
      id: [oPartido.id],
      equipo_local: this.formBuilder.group({
        id: [oPartido.equipo_local.id, Validators.required]
      }),
      equipo_visitante: this.formBuilder.group({
        id: [oPartido.equipo_visitante.id, Validators.required]
      }),
      fecha_partido: [oPartido.fecha_partido, Validators.required],
      resultado: [oPartido.resultado, Validators.required]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.partidoAjaxService.getOne(this.id).subscribe({
        next: (data: IPartido) => {
          this.oPartido = data;
          this.initializeForm(this.oPartido);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.matSnackBar.open("Error leyendo partido desde el server.", '', { duration: 2000 });
        }
      });
    } else {
      this.initializeForm(this.oPartido);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.partidoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.partidoForm.valid) {
      if (this.operation == 'NEW') {
        this.partidoAjaxService.newOne(this.partidoForm.value).subscribe({
          next: (data: IPartido) => {
            this.oPartido = { "equipo_local": {}, "equipo_visitante": {} } as IPartido;
            this.initializeForm(this.oPartido);
            this.matSnackBar.open("Partido ha sido creado.", '', { duration: 2000 });
            this.router.navigate(['/admin', 'partido', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("No se ha podido crear el partido.", '', { duration: 2000 });
          }
        });
      } else {
        this.partidoAjaxService.updateOne(this.partidoForm.value).subscribe({
          next: (data: IPartido) => {
            this.oPartido = data;
            this.initializeForm(this.oPartido);
            this.matSnackBar.open("Partido ha sido actualizado.", '', { duration: 2000 });
            this.router.navigate(['/admin', 'partido', 'view', this.oPartido.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("No se ha podido actualizar el partido.", '', { duration: 2000 });
          }
        });
      }
    }
  }

  onShowEquipoLocalSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Selecciona un equipo local',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  
    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo) => {
      if (oEquipo) {
        // Verifica si el equipo ya ha sido seleccionado como equipo visitante
        if (this.oPartido.equipo_visitante && this.oPartido.equipo_visitante.id === oEquipo.id) {
          // Equipo ya seleccionado como visitante, muestra un mensaje o realiza la lógica necesaria
          console.error('Este equipo ya ha sido seleccionado como equipo visitante.');
        } else {
          this.oPartido.equipo_local = oEquipo;
          this.partidoForm.controls['equipo_local'].patchValue({ id: oEquipo.id });
        }
      }
    });
  }
  
  onShowEquipoVisitanteSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Selecciona un equipo visitante',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  
    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo) => {
      if (oEquipo) {
        // Verifica si el equipo ya ha sido seleccionado como equipo local
        if (this.oPartido.equipo_local && this.oPartido.equipo_local.id === oEquipo.id) {
          // Equipo ya seleccionado como local, muestra un mensaje o realiza la lógica necesaria
          console.error('Este equipo ya ha sido seleccionado como equipo local.');
        } else {
          this.oPartido.equipo_visitante = oEquipo;
          this.partidoForm.controls['equipo_visitante'].patchValue({ id: oEquipo.id });
        }
      }
    });
  }
  
}
