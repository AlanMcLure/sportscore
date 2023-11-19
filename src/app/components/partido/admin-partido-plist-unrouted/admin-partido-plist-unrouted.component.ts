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
  providers: [ConfirmationService],
  selector: 'app-admin-partido-plist-unrouted',
  templateUrl: './admin-partido-plist-unrouted.component.html',
  styleUrls: ['./admin-partido-plist-unrouted.component.css']
})

export class AdminPartidoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() equipoId: number = 0; //No se si hacerlo por equipo solo o por local y visitante

  oPage: IPartidoPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oPartidoToRemove: IPartido | null = null;

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
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

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

  doRemove(p: IPartido) {
    this.oPartidoToRemove = p;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("El partido ha sido borrado.", '', { duration: 2000 });
        this.oPartidoAjaxService.removeOne(this.oPartidoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("El partido no ha sido borrado.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("El partido no ha sido borrado.", "", { duration: 2000 });
      }
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
