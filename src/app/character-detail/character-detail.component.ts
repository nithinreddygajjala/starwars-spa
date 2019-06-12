import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  characterFromRoute: any = [];
  characterFilms: any = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.characterFromRoute = this.route.snapshot.data['character'] ;
    let data = [];
    console.log(this.characterFromRoute);
    for( let i = 0; i< this.characterFromRoute.films.length; i++) {
      data.push(this.http.get(this.characterFromRoute.films[i]));
    }
    forkJoin(data).subscribe(results => {
     console.log(results);
     this.characterFilms = results;
     this.characterFilms = this.characterFilms.map((x) => {
      x.release_date = moment(x.release_date).format('dddd MMMM D Y');
      return x;
     });
    });
  }

  navigate() {
    this.router.navigate(['/']);

  }

}
