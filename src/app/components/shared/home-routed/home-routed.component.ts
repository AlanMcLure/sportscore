import { Component, OnInit } from '@angular/core';
import { IThread } from 'src/app/model/model.interfaces';




@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {

  idThread: number = 17;
  

  constructor(

  ) { }

  ngOnInit() {
  }

  onThreadChange(oThread: IThread) {
    this.idThread = oThread.id;
  }

}





