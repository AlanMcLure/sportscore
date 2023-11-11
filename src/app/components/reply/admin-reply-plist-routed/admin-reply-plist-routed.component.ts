import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReplyAjaxService } from 'src/app/service/reply.ajax.service.service';

@Component({
  selector: 'app-admin-reply-plist-routed',
  templateUrl: './admin-reply-plist-routed.component.html',
  styleUrls: ['./admin-reply-plist-routed.component.css']
})
export class AdminReplyPlistRoutedComponent implements OnInit {

  id_user: number;
  id_thread: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oReplyAjaxService: ReplyAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_user = parseInt(this.oActivatedRoute.snapshot.paramMap.get("iduser") ?? "0");
    this.id_thread = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idthread") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oReplyAjaxService.generateRandom(amount).subscribe({
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
