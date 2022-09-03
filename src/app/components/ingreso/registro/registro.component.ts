import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formGroup !: FormGroup;

  constructor(private registroService : RegistroService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'contraseña' : ['',Validators.required]
    });
  }

  registrarse(){
    const email = this.formGroup.controls['email'].value;
    const contraseña = this.formGroup.controls['contraseña'].value;
    this.registroService.registro(email,contraseña);
  }

}
