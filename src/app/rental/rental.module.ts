import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router'; 
import {NgPipesModule} from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';


import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';


import { RentalServices } from './shared/rental.services';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/common/auth.guard';
import { RentalBookingComponent } from './rental-details/rental-booking/rental-booking.component';

const rentalrouter : Routes = [
    { path : 'rentals', component : RentalComponent,
    children: [
        {path:'', component: RentalListComponent},
        {path: ':rentalId', component:RentalDetailsComponent, canActivate: [AuthGuard]}
    ]
    }
  ]
  

@NgModule ({
    declarations:[
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailsComponent,
        RentalBookingComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(rentalrouter),
        NgPipesModule,
        MapModule,
        Daterangepicker
    ],providers:[
        RentalServices,
        AuthGuard
    ]
})

export class RentalModule { }