import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email!:string;
  password!:string;

  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/'])
      }
    });
  }

  login(){
    this.loginService.login(this.email, this.password)
    .then(res => {
        this.router.navigate(['/']);
    })
    .catch(error => {
      alert(error.message);
    })
  }
}
