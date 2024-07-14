import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  
  email!:string;
  password!:string;

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService){}

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/'])
      }
    });
  }

  registro(){
    this.loginService.registrarse(this.email, this.password)
    .then(res => {
      this.router.navigate(['/']);
      })
      .catch(error => {
        this.toastr.error('Error al registrar el usuario', error.message);
      })
  }
}
