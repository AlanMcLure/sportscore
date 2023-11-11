import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IThread, IThreadPage, IUser } from 'src/app/model/model.interfaces';
import { AdminThreadDetailUnroutedComponent } from '../admin-thread-detail-unrouted/admin-thread-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThreadAjaxService } from 'src/app/service/thread.ajax.service.service';
import { UserAjaxService } from 'src/app/service/user.ajax.service.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-user-thread-plist-unrouted',
  templateUrl: './user-thread-plist-unrouted.component.html',
  styleUrls: ['./user-thread-plist-unrouted.component.css']
})

export class UserThreadPlistUnroutedComponent implements OnInit {

  @Input() id_user: number = 0; //filter by user
  @Output() thread_selection = new EventEmitter<IThread>();

  activeThread: IThread | null = null;

  oPage: IThreadPage | undefined;
  oUser: IUser | null = null; // data of user if id_user is set for filter
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 50, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oThreadToRemove: IThread | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oUserAjaxService: UserAjaxService,
    public oSessionService: SessionAjaxService,
    private oThreadAjaxService: ThreadAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_user > 0) {
      this.getUser();
    }
  }

  getPage(): void {
    this.oThreadAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_user).subscribe({
      next: (data: IThreadPage) => {
        this.oPage = data;
        if (this.oPage.content.length > 0) {
          this.activeThread = this.oPage.content[0];
          this.thread_selection.emit(this.activeThread);
        }
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  doView(u: IThread) {
    this.ref = this.oDialogService.open(AdminThreadDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of thread',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IThread) {
    this.oThreadToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The thread has been removed.", '', { duration: 2000 });
        this.oThreadAjaxService.removeOne(this.oThreadToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The thread hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The thread hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  getUser(): void {
    this.oUserAjaxService.getOne(this.id_user).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  doShowReplies(oThread: IThread) {
    this.thread_selection.emit(oThread);
    this.activeThread = oThread;
    return false;
  }

}