import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalServices } from '../shared/rental.services';

@Component({
  selector: 'bnb-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent implements OnInit {
  routerID : any;
  rental
  constructor( private activatedRoute: ActivatedRoute , private rentalService : RentalServices) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe(
        (routeId) => {this.routerID = routeId['rentalId']})

        this.rentalService.getRentalById(this.routerID).subscribe( rental => { 
          this.rental = rental;
        })
      }

}
