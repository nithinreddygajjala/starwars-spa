import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private characterService: CharactersService, private router: Router, private route: ActivatedRoute) { }
	characters: any = [];
	searchString: any;
	searchReturnedNoResults: any;
	filtererdCharacters: any = [];
	ngOnInit() {
		this.characters = this.characterService.characters;
		this.route.queryParams
			.subscribe(
				(params: Params) => {
					if (this.route.snapshot.queryParams.hasOwnProperty('q')) this.searchString = this.route.snapshot.queryParams.q;
					this.filterList()

				});
	}
	search(event) {
		this.router.navigate([], {
			queryParams: { q: event.target.value },
			relativeTo: this.route,
			skipLocationChange: false
		});
	}

	navigate(x) {
		this.router.navigate([x.id], {
			relativeTo: this.route,
			skipLocationChange: false
		});
	}

	filterList() {
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

		this.characters.forEach((ele) => {
			let tokenMatchedCount = 0;
			tokens.forEach((token: string) => {
				let isAdded = false;
				if (ele.name !== undefined && ele.name.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isAdded = true;
				}
				if (!isAdded && ele.company !== undefined && ele.company.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isAdded = true;
				}
				if (!isAdded && ele.description !== undefined && ele.description.toLowerCase().includes(token)) {
					tokenMatchedCount++;
					isAdded = true;
				}
			});
			if (tokenMatchedCount === tokens.length) {
				this.filtererdCharacters.push(ele);
			}
		});
		if (this.filtererdCharacters.length <= 0 && tokens.length > 0 && this.characters.length > 0) {
			this.searchString = qText;
			this.searchReturnedNoResults = true;
		}
	}

}
