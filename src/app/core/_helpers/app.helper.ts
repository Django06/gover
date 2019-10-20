import { ConfirmationDialogComponent } from './../../shared/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';


export function confirmDialog(
  dialog: MatDialog,
  title: string,
  message: string,
  yesText: string,
  noText: string
): Observable<boolean> {
  const data: ConfirmationDialogData = {
    title: title,
    noText: noText,
    yesText: yesText,
    questionInHtml: message,
    includesInput: false
  };
  return dialog
    .open(ConfirmationDialogComponent, {
      width: '400px',
      data: data,
      disableClose: true
    })
    .afterClosed();
}


export interface ConfirmationDialogData{
  title: string;
  questionInHtml: string;
  noText: string;
  yesText: string;
  includesInput: boolean;
  value?: string;
}