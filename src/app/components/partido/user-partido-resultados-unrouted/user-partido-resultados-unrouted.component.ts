import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IPartido, IPartidoPage, IEquipo } from 'src/app/model/model.interfaces';
import { AdminPartidoDetailUnroutedComponent } from '../admin-partido-detail-unrouted/admin-partido-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-partido-resultados-unrouted',
  templateUrl: './user-partido-resultados-unrouted.component.html',
  styleUrls: ['./user-partido-resultados-unrouted.component.css']
})
export class UserPartidoResultadosUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() equipoId: number = 0;
  @Input() hasEquipos: boolean = false;

  oPage: IPartidoPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oPartidoToRemove: IPartido | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    private oPartidoAjaxService: PartidoAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.equipoId > 0) {
      this.getEquipo();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oPartidoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.equipoId).subscribe({
      next: (data: IPartidoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
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

    if (fieldorder !== 'fecha') {
      // Si el campo de orden no es 'fecha', ordénalo por 'fecha' de manera descendente
      this.orderField = 'fecha';
      this.orderDirection = 'desc';
    }

    this.getPage();
  }

  doView(p: IPartido) {
    this.ref = this.oDialogService.open(AdminPartidoDetailUnroutedComponent, {
      data: {
        id: p.id
      },
      header: 'Vista de Partido',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  getEquipo(): void {
    this.oEquipoAjaxService.getOne(this.equipoId).subscribe({
      next: (data: IEquipo) => {
        this.oEquipo = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }
}
