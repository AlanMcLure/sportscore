import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IJugador, IJugadorPage } from 'src/app/model/model.interfaces';
import { AdminJugadorDetailUnroutedComponent } from '../admin-jugador-detail-unrouted/admin-jugador-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';

@Component({
  selector: 'app-admin-jugador-plist-unrouted',
  templateUrl: './admin-jugador-plist-unrouted.component.html',
  styleUrls: ['./admin-jugador-plist-unrouted.component.css']
})

export class AdminJugadorPlistUnroutedComponent implements OnInit {

  @Input() equipo_id: number = 0;

  oPage: IJugadorPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oJugadorToRemove: IJugador | null = null;

  constructor(
    private oJugadorAjaxService: JugadorAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oJugadorAjaxService
      .getPage(
        this.oPaginatorState.rows,
        this.oPaginatorState.page,
        this.orderField,
        this.orderDirection,
        this.equipo_id
      )
      .subscribe({
        next: (data: IJugadorPage) => {
          this.oPage = data;
          this.oPaginatorState.pageCount = data.totalPages;
          console.log(this.oPaginatorState);
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

  ref: DynamicDialogRef | undefined;

  doView(j: IJugador) {
    this.ref = this.oDialogService.open(AdminJugadorDetailUnroutedComponent, {
      data: {
        id: j.id
      },
      header: 'View of player',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(j: IJugador) {
    this.oJugadorToRemove = j;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The player has been removed.", '', { duration: 2000 });
        this.oJugadorAjaxService.removeOne(this.oJugadorToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The player hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The player hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

}
