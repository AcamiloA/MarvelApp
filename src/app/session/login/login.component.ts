import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Login } from '../../Interfaces/Login';
import { AccessService } from '../../service/access.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent 
{
  private router = inject(Router);
  private accessService = inject(AccessService);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    correo: ['',Validators.required],
    clave: ['',Validators.required]
  })

  iniciarSesion()
  {
    if(this.formLogin.invalid) return;

    const objeto:Login = {
        email: this.formLogin.value.correo,
        nickname: this.formLogin.value.correo,
        password: this.formLogin.value.clave
    }

    this.accessService.Login(objeto).subscribe({
        next:(data) =>{
          console.log(data);
              if(data.isSucceeded){
                  localStorage.setItem("token",data.access_token);
                  this.router.navigate(['comics']);
              }else{
                  alert("Credenciales son incorrectas")
              }
        },
        error:(error) =>{
              alert("Credenciales son incorrectas")
              console.log(error.message);
        }
    })
  }
  registrarse(){
    this.router.navigate(['registro']);
  }
}
