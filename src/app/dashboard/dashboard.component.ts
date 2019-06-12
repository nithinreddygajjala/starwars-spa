import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private characterService: CharactersService, private router: Router, private route: ActivatedRoute ) { }
  characters: any = [];
  searchString: any;
  searchReturnedNoResults: any;
  filtererdCharacters: any = [];
  ngOnInit() {
this.characters = this.characterService.characters;
this.route.queryParams
			.subscribe(
				(params: Params) => {
          console.log(this.route.snapshot.queryParams.hasOwnProperty('q'));
          if(this.route.snapshot.queryParams.hasOwnProperty('q')) this.searchString = this.route.snapshot.queryParams.q; 
        console.log('reached');
        this.filterRoleList()
        
				});
  }
  test(event) {
    this.router.navigate([], {
      queryParams: {q: event.target.value},
      relativeTo: this.route,
      skipLocationChange: false
      });
    
    console.log(event.target.value);
  }

  navigate(x){
	this.router.navigate([x.id], {
		relativeTo: this.route,
		skipLocationChange: false
		});
  }

  filterRoleList() {
		this.searchReturnedNoResults = false;
		let qText = this.route.snapshot.queryParams['q'];

		if (!qText) {
			if (this.characters !== undefined) {
				this.filtererdCharacters = [...this.characters];
			}

			this.searchReturnedNoResults = false;
			return;
		}

		qText = qText.trim();
		let tokens = qText.split(' ').map(tok => tok.toLowerCase());
		this.filtererdCharacters = [];

		this.characters.forEach((role) => {
			let tokenMatchedCount = 0;
			tokens.forEach((token: string) => {
				let isRoleAdded = false;
				if (role.name !== undefined && role.name.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isRoleAdded = true;
				}
				if (!isRoleAdded && role.company !== undefined && role.company.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isRoleAdded = true;
				}
				if (!isRoleAdded && role.description !== undefined && role.description.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isRoleAdded = true;
				}
			});
			if (tokenMatchedCount === tokens.length) {
				this.filtererdCharacters.push(role);
			}
		});
		if (this.filtererdCharacters.length <= 0 && tokens.length > 0 && this.characters.length > 0) {
			this.searchString = qText;
			this.searchReturnedNoResults = true;
		}
	}

}
