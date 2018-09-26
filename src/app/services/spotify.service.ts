import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Reactive Extensions y solo trabajan con observables
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log( ' Spotify service listo');

  }

  getQuery( query:string ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCUmEl60y2ZK8DThuybPQNbM1sNbAlLyWFn1Ti4q_a1--fYYMHjLb-OruuA19DOP9zhKXI9tkLMUWlAa3g'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=50').pipe( map ( data => {
                      return data['albums'].items;
                    }));
  }

  getArtistas( termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe( map (data => {
                      return data['artists'].items;
    }));
  }

  getArtista( id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map (data => {
    //                   return data['artists'].items;
    // }));
  };

  getTopTracks ( id: string ) {
    return this.getQuery(`artists/${id}/top-tracks?country=es`)
    .pipe( map( data => {
      return data['tracks']
    }));
  };

}


// https://api.spotify.com/v1/browse/new-releases?limit=5;
