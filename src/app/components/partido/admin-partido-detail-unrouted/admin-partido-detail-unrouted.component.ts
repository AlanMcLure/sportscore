import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPartido } from 'src/app/model/model.interfaces';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';

@Component({
  selector: 'app-admin-partido-detail-unrouted',
  templateUrl: './admin-partido-detail-unrouted.component.html',
  styleUrls: ['./admin-partido-detail-unrouted.component.css']
})
export class AdminPartidoDetailUnroutedComponent implements OnInit {
  
  @Input() id: number = 1;
  
  oPartido: IPartido = { equipo_local: {}, equipo_visitante: {} } as IPartido;
  status: HttpErrorResponse | null = null;

  constructor(
    private oPartidoAjaxService: PartidoAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oPartidoAjaxService.getOne(this.id).subscribe({
      next: (data: IPartido) => {
        this.oPartido = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
