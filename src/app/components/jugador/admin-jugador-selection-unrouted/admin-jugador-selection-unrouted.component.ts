import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IJugador, IJugadorPage } from 'src/app/model/model.interfaces'; // Asegúrate de importar las interfaces correctas
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-admin-jugador-selection-unrouted',
  templateUrl: './admin-jugador-selection-unrouted.component.html',
  styleUrls: ['./admin-jugador-selection-unrouted.component.css']
})

export class AdminJugadorSelectionUnroutedComponent implements OnInit {

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
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oJugadorAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.equipo_id).subscribe({
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

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  onSelectJugador(jugador: IJugador) {
    this.oDynamicDialogRef.close(jugador);
  }
}
