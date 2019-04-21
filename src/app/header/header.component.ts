import { Component } from '@angular/core';
import { AuthServices } from '../auth/common/auth.service';
import { Router } from '@angular/router';


@Component ({
    selector : 'bnb-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.scss']
})
export class HeaderComponent {

    constructor( public auth: AuthServices, public router: Router){

    }

    logout(){
        this.auth.logout();
        this.router.navigate(['/login']);
    }

}
