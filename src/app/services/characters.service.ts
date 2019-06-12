import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  readonly characters: any = [
    {
      "name": "Luke Skywalker",
      "url": "https://swapi.co/api/people/1/",
      "id": 1,
      "type" : "jedi"
    },

    {
      "name": "C-3PO",
      "url": "https://swapi.co/api/people/2/",
      "id": 2,
      "type": "droid"
    },

    {
      "name": "Leia Organa",
      "url": "https://swapi.co/api/people/unknown/",
      "id": "unknown",
      "type": "jedi"
    },

    {
      "name": "R2-D2",
      "url": "https://swapi.co/api/people/3/",
      "id": 3,
      "type": "droid"
    }
  ];

  constructor(private http: HttpClient) {
    
   }

  getCharacterById(id: string): Observable<any> {
		return this.http.get<any>(`https://swapi.co/api/people/${id}`);
	}
}
