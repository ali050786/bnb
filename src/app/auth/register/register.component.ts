import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bnb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData:any = {};
  errors:any = [];

  constructor( private auth: AuthServices, 
               private router : Router ) { }

  ngOnInit() {
  }

  onRegister(){
    console.log(this.formData)
    this.auth.register(this.formData).subscribe(
      (responce) => {
          this.router.navigate(['/login', { registered : "success"} ])
      },
      (errorResponce) =>{
       
        this.errors = errorResponce.error.errors;

      }
    )

  }

}
