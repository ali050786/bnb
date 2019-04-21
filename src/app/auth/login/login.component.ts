import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { AuthServices } from '../common/auth.service';
import { Router , ActivatedRoute} from '@angular/router';




@Component({
  selector: 'bnb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  errors:any = [];
  notifyMessage: string = '';

  constructor( private fb: FormBuilder,
               private auth: AuthServices, 
               private router : Router,
               private ar : ActivatedRoute) { }

  ngOnInit() {
    this.initLogin();
    this.ar.params.subscribe((params)=>{
      if (params.registered === 'success'){
      this.notifyMessage = 'You have been successfully registered, you can login now!'}
    })
  }

  initLogin(){
    this.form = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  login(){
    this.auth.login(this.form.value).subscribe(
      (token) => {
          console.log(token);
          this.router.navigate(['/rentals'])
      },
      (errorResponce) => {
        this.errors = errorResponce.error.errors;
      }

    )
  }

}
