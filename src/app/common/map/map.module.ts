
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';


@NgModule({
  declarations: [
        MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBezcVD2AURpJVueunsluELFvZknIPqXIg'
      })
  ],
  providers: [MapService],
  exports:[MapComponent]
})
export class MapModule { }
