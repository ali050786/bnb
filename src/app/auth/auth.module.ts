import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthServices } from './common/auth.service';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from './common/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/token.interceptor';




const authrouter : Routes = [

        {path:'login', component: LoginComponent,  canActivate: [AuthGuard]},
        {path: 'register', component:RegisterComponent,  canActivate: [AuthGuard]},

    ]

  

@NgModule ({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(authrouter),
    ],
    providers:[
        AuthServices,
        AuthGuard,
        {provide : HTTP_INTERCEPTORS,
        useClass : TokenInterceptor,
        multi : true}
    ]
})

export class AuthModule { }