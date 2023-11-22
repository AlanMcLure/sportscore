import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPartido, IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';
import { AdminEquipoSelectionUnroutedComponent } from '../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-admin-partido-form-unrouted',
  templateUrl: './admin-partido-form-unrouted.component.html',
  styleUrls: ['./admin-partido-form-unrouted.component.css']
})

export class AdminPartidoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  es = CALENDAR_ES;

  partidoForm!: FormGroup;
  oPartido: IPartido = { fechaPartido: new Date(Date.now()), equipoLocal: {}, equipoVisitante: {} } as IPartido;
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
    
    const fechaPartido = oPartido.fechaPartido instanceof Date
    ? oPartido.fechaPartido
    : new Date(oPartido.fechaPartido);
    
    this.partidoForm = this.formBuilder.group({
      id: [oPartido.id],
      equipoLocal: this.formBuilder.group({
        id: [oPartido.equipoLocal.id, Validators.required]
      }),
      equipoVisitante: this.formBuilder.group({
        id: [oPartido.equipoVisitante.id, Validators.required]
      }),
      fechaPartido: [new Date(fechaPartido.setHours(0, 0, 0, 0)), Validators.required],
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
            this.oPartido = { "equipoLocal": {}, "equipoVisitante": {} } as IPartido;
            this.initializeForm(this.oPartido);
            this.matSnackBar.open("El partido ha sido creado.", '', { duration: 2000 });
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
            this.matSnackBar.open("El partido ha sido actualizado.", '', { duration: 2000 });
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
        if (this.oPartido.equipoVisitante && this.oPartido.equipoVisitante.id === oEquipo.id) {
          // Equipo ya seleccionado como visitante, muestra un mensaje o realiza la lógica necesaria
          this.matSnackBar.open('Este equipo ya ha sido seleccionado como visitante', 'Cerrar', { duration: 3000 });
        } else {
          this.oPartido.equipoLocal = oEquipo;
          this.partidoForm.controls['equipoLocal'].patchValue({ id: oEquipo.id });
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
        if (this.oPartido.equipoLocal && this.oPartido.equipoLocal.id === oEquipo.id) {
          // Equipo ya seleccionado como local, muestra un mensaje o realiza la lógica necesaria
          this.matSnackBar.open('Este equipo ya ha sido seleccionado como local', 'Cerrar', { duration: 3000 });
        } else {
          this.oPartido.equipoVisitante = oEquipo;
          this.partidoForm.controls['equipoVisitante'].patchValue({ id: oEquipo.id });
        }
      }
    });
  }
  
}
