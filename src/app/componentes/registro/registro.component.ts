import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;


  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private LoginService: LoginService) { }

  ngOnInit(): void {
    this.LoginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }
  registro(){
    this.LoginService.registarse(this.email, this.password)
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      this.flashMessage.show(error.message ,{
        cssClass: 'alert-danger', timeout: 4000
      })
    })
  }
}
