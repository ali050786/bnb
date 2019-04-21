import { Component, OnInit , Input } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bnb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: string;

  lat: number ;
  lng: number ;

  constructor(private mapService : MapService) { 
    
  }

  mapReadyhandler(){
    this.mapService.geocodeLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      }
    )
  }

  ngOnInit() {
  }

}
