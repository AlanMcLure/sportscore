import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/model/model.interfaces';




@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {

  equipo_id: number = 17;
  

  constructor(

  ) { }

  ngOnInit() {
  }

  onEquipoChange(oEquipo: IEquipo) {
    this.equipo_id = oEquipo.id;
  }

}





