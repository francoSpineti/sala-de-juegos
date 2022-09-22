import { Component, Input, OnInit ,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  titulo : "";
  mensaje : "";
}

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent  {

  constructor(public dialogRef: MatDialogRef<DialogoComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {  
  }

  cerrar(){
    this.dialogRef.close();
  }
}

