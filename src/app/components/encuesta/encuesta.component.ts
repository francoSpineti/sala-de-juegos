import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { DialogoComponent } from '../juegos/dialogo/dialogo.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  formGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder,private service: EncuestaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'nombre' : ['',[Validators.required,this.spacesValidator]],
      'apellido' : ['',[Validators.required,this.spacesValidator]],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'email' : ['',[Validators.required,Validators.email,this.spacesValidator]],
      'telefono' : ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      'pregunta1' : ['',Validators.required],
      'pregunta2' : ['',[Validators.required,this.spacesValidator]],
      'pregunta3' : ['',Validators.required],
    });
  }

  guardar(){
    let encuesta = new Encuesta(this.formGroup.controls['nombre'].value,this.formGroup.controls['apellido'].value,
    this.formGroup.controls['email'].value, this.formGroup.controls['edad'].value, parseInt(this.formGroup.controls['telefono'].value),
    this.formGroup.controls['pregunta1'].value,this.formGroup.controls['pregunta2'].value,this.formGroup.controls['pregunta3'].value);
    this.service.guardar(encuesta.toJson());
    this.dialog.open(DialogoComponent,{
      data: {
        titulo: 'Gracias!',
        mensaje: 'La encuesta se guardo con exito!'
      }
    });
    this.limpiar();
  }

  private spacesValidator(control : AbstractControl) : null | object{
    const nombre = <string>control.value;
    const espacios = nombre.includes(' ');
    return espacios == true? {contieneEspacios : true} : null;
  }

  limpiar(){
    this.formGroup.controls['nombre'].setValue(''); 
    this.formGroup.controls['apellido'].setValue(''); 
    this.formGroup.controls['edad'].setValue('');
    this.formGroup.controls['telefono'].setValue(''); 
    this.formGroup.controls['pregunta1'].setValue(''); 
    this.formGroup.controls['pregunta2'].setValue(''); 
    this.formGroup.controls['pregunta3'].setValue('');
  }

}
