import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // paises: any[] = [];

  // constructor( private http: HttpClient) {
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es')
  //   .subscribe( (resp: any) => {
  //     this.paises = resp;
  //     console.log(resp);
  //   });
  //  }

  nuevosLanzamientos: any[] = [];
  loading : boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
    .subscribe( (data: any) => {
      console.log(data);
      this.nuevosLanzamientos = data;
      this.loading = false;
    }, ( errorServicio ) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = errorServicio.error.error.message ;
    } );

  }

  ngOnInit() {
  }

}
