import { Component, Input, OnInit ,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  titulo : "";
  mensaje : "";
}

@Component({
  selector: 'app-dialogo-encuesta',
  templateUrl: './dialogo-encuesta.component.html',
  styleUrls: ['./dialogo-encuesta.component.scss']
})
export class DialogoEncuestaComponent {

  constructor(public dialogRef: MatDialogRef<DialogoEncuestaComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  cerrar(){
    this.dialogRef.close();
  }
}
