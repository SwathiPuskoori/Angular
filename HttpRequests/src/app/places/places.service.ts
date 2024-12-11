import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService)
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong while fetching available places, please try again later')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 
    'Something went wrong while fetching favourite places, please try again later')
    .pipe(
      tap({
        next: (userPlaces)=> this.userPlaces.set(userPlaces),
      })
    )}

  addPlaceToUserPlaces(place: Place) {
   const prevPlaces = this.userPlaces();

   if(!prevPlaces.some((p)=> p.id === place.id)){
    this.userPlaces.set([...prevPlaces, place]);
   }
   return this.httpClient.put('http://localhost:3000/user-places', {
      placeId : place.id,
    }).pipe(
      catchError((error)=> {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('error loading favourite places')
        return throwError(() => new Error('error loading favourite places') );
    }) 
    );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

   if(prevPlaces.some((p)=> p.id === place.id)){
    this.userPlaces.set(prevPlaces.filter((p)=> p.id !== place.id));
   }
  return  this.httpClient.delete('http://localhost:3000/user-places/'+place.id)
   .pipe(
    catchError((error)=> {
      this.userPlaces.set(prevPlaces);
      this.errorService.showError('error Deleting selected places')
      return throwError(() => new Error('error Deleting selected places') );
  }) 
  );

  }

  private fetchPlaces(url: string, errorMessage: string){
   return this.httpClient
    .get<{places: Place[]}>(url)
    .pipe(
      map((resData)=> resData.places ) , 
      catchError(()=> {
        return throwError(() => new Error(errorMessage) );
    }) 
    )
  }
}
