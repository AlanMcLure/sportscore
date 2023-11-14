import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service.service';

@Component({
  selector: 'app-admin-jugador-plist-routed',
  templateUrl: './admin-jugador-plist-routed.component.html',
  styleUrls: ['./admin-jugador-plist-routed.component.css']
})
export class AdminJugadorPlistRoutedComponent implements OnInit {

  equipo_id: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oJugadorAjaxService: JugadorAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.equipo_id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;    
    this.oJugadorAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " jugadores", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error al generar los jugadores: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

}
