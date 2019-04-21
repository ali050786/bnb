import { Component, OnInit , Input } from '@angular/core';
import { Rental } from '../../shared/rental.model'

@Component({
  selector: 'bnb-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})
export class RentalBookingComponent implements OnInit {

  @Input() dailyRate : number;
  
  public daterange: any = {};
 
 
  public options: any = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left'
  };


  constructor() { }

  ngOnInit() {
  }


  public selectedDate(value: any, datepicker?: any) {
      // this is the date the user selected
      console.log(value);

      // any object can be passed to the selected event and it will be passed back here
      datepicker.start = value.start;
      datepicker.end = value.end;

      // or manupulat your own internal property
      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;
  }
}
