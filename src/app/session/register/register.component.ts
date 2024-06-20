import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../Interfaces/Register'
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AccessService } from '../../service/access.service'


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    private accesoService = inject(AccessService);
    private router = inject(Router);
    public formBuild = inject(FormBuilder);

    public formRegistro: FormGroup = this.formBuild.group({
        nombre: ['',Validators.required],
        apellido: ['',Validators.required],
        nickname: ['',Validators.required],
        email: ['',Validators.required],
        confirmEmail: ['',Validators.required],
        passwordHash: ['',Validators.required], 
        confirmPassword: ['',Validators.required]
    })

    registrarse(){
     
      if(this.formRegistro.invalid) return;

      const objeto:Register = {
           firstName: this.formRegistro.value.nombre,
           lastName: this.formRegistro.value.apellido,
           nickName: this.formRegistro.value.nickname,
           email: this.formRegistro.value.email,
           confirmEmail: this.formRegistro.value.confirmEmail,
           passwordHash: this.formRegistro.value.passwordHash,
           confirmPassword: this.formRegistro.value.confirmPassword
      }

      this.accesoService.Registro(objeto).subscribe({
           next: (data) =>{
                if(data.IsSuccess){
                     this.router.navigate([''])
                }else{
                     alert("No se pudo registrar")
                }
           }, error:(error) =>{
                alert(error.error.errors);
           }
      })
 }

 volver(){
      this.router.navigate([''])
 }
}
