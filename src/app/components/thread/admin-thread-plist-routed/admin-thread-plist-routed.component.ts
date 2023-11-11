import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ThreadAjaxService } from 'src/app/service/thread.ajax.service.service';

@Component({
  selector: 'app-admin-thread-plist-routed',
  templateUrl: './admin-thread-plist-routed.component.html',
  styleUrls: ['./admin-thread-plist-routed.component.css']
})
export class AdminThreadPlistRoutedComponent implements OnInit {

  id_user: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oThreadAjaxService: ThreadAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_user = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oThreadAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " threads", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating threads: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

}

