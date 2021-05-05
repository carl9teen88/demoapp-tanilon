import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificaiton',
  templateUrl: './notificaiton.component.html',
  styleUrls: ['./notificaiton.component.scss']
})

export class NotificaitonComponent {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, success: boolean) {
    let sb = this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: success ? ['success'] : ['error']
    });

    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
