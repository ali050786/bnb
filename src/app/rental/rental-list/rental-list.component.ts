import { Component, OnInit } from '@angular/core';
import { RentalServices } from '../shared/rental.services';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bnb-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  rentals:Rental[];



  constructor( private rentalService : RentalServices) { }

  ngOnInit() {
    const rentalsSubsriber = this.rentalService.getRentals();

    rentalsSubsriber.subscribe( (rental:Rental[])=> { this.rentals = rental;},
                                (err) => {},
                                () =>{} )
  }


  

}
