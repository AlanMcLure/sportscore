import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IEquipo, IEquipoPage } from 'src/app/model/model.interfaces';
import { AdminEquipoDetailUnroutedComponent } from '../admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-equipo-plist-unrouted',
  templateUrl: './admin-equipo-plist-unrouted.component.html',
  styleUrls: ['./admin-equipo-plist-unrouted.component.css']
})

export class AdminEquipoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IEquipoPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oEquipoToRemove: IEquipo | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oEquipoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IEquipoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  doView(u: IEquipo) {
    this.ref = this.oDialogService.open(AdminEquipoDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'Vista de equipo',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IEquipo) {
    this.oEquipoToRemove = u;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("El equipo ha sido borrado.", '', { duration: 2000 });
        this.oEquipoAjaxService.removeOne(this.oEquipoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("El equipo no ha sido borrado.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("El equipo no ha sido borrado.", "", { duration: 2000 });
      }
    });
  }

}
