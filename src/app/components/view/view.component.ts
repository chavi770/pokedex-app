import { Component, Inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'
import { PokemonData } from '../../model/pokemonData'
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})



export class ViewComponent implements OnInit {


  pokemon: any = '';
  area: any;
  evolutions: any = '';
  subscriptions: Subscription[] = [];


  constructor(private pokemonService: PokemonService, public dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonData) { }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }


  ngOnInit(): void {

    this.pokemonService.getMoreData(this.data.name).subscribe(result => {
      this.pokemon = result;
      this.pokemonService.getArea(this.pokemon.id).subscribe(regionResults => {
        this.area = regionResults;
        this.getEvolution();
      })



    })


  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.subscription = this.pokemonService.getEvolution(id).subscribe(response => this.getEvolves(response.chain));
      });
    }
  }

  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }




  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

}
