import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { Observable, of } from 'rxjs';
import { CharactersService } from './services/characters.service';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import {catchError, tap } from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable()
export class UserResolverService implements Resolve<any> {
	constructor(private router: Router, private characterService: CharactersService) { }
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.characterService.getCharacterById(route.params['id'])
    .pipe(
      catchError(error =>  {this.router.navigate(["error"]);return throwError(error.message || error); }));
	}
}


const routes: Routes = [
  {path: '', component: DashboardComponent},
  
  {path: 'error',  pathMatch: 'full',component: ErrorComponent},
  {path: ':id',resolve: { character: UserResolverService },component: CharacterDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolverService]
})
export class AppRoutingModule { }
