import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-jugador-new-routed',
  templateUrl: './admin-jugador-new-routed.component.html',
  styleUrls: ['./admin-jugador-new-routed.component.css']
})
export class AdminJugadorNewRoutedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
