import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PartidoAjaxService } from 'src/app/service/partido.ajax.service.service';

@Component({
  selector: 'app-admin-partido-plist-routed',
  templateUrl: './admin-partido-plist-routed.component.html',
  styleUrls: ['./admin-partido-plist-routed.component.css']
})
export class AdminPartidoPlistRoutedComponent implements OnInit {

  equipo_local_id: number;
  equipo_visitante_id: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPartidoAjaxService: PartidoAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.equipo_local_id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("iduser") ?? "0");
    this.equipo_visitante_id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idthread") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oPartidoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " replies", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating replies: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }


}
