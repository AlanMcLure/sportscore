import { Component, OnInit } from '@angular/core';
import { SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = "";

  constructor(
    private oSessionService: SessionAjaxService
  ) {
    this.strUserName = oSessionService.getUsername();

  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUserName = this.oSessionService.getUsername();
        }
        if (data.type == 'logout') {
          this.strUserName = "";
        }
      }
    });


  }
}


