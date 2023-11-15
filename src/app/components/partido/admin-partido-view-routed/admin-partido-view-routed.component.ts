import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-partido-view-routed',
  templateUrl: './admin-partido-view-routed.component.html',
  styleUrls: ['./admin-partido-view-routed.component.css']
})
export class AdminPartidoViewRoutedComponent implements OnInit {

  id: number = 1;
  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    // No tengo muy claro el id ese
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
