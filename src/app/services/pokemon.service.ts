import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pokemon } from '../model/Pokemon';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  apiUrl: string = 'https://pokeapi.co/api/v2/';
  pokemonsList: BehaviorSubject<{ name: string, url: string, isFavorite: boolean }[]> = new BehaviorSubject([] as any);

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }



  get pokemons$() {
    return this.pokemonsList.asObservable();
  }

  get favoriatePokimons$() {
    return this.pokemonsList.asObservable().pipe(map(d => d.filter(p => p.isFavorite)));
  }

  //Get pokemons
  getPokemons() {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon?limit=151`).pipe(tap(data => {
      data.results.forEach(element => {
        element['isFavorite'] = this.localStorageService.getItems().includes(element.name)
      });
      this.pokemonsList.next(data.results);
    }))
  }


  //Add or remove pokemon to the Favorites list
  addOrRemovePokemon(name: string) {
    // check if is the array
    this.localStorageService.getItems();

    if (this.localStorageService.getItems().includes(name)) {

      this.localStorageService.setItems('favorites', this.localStorageService.getItems().filter((pok: any) => pok !== name))
      // go to the pokimon list and update teh status
      const index = this.pokemonsList.value.findIndex(p => p.name == name);
      this.pokemonsList.value[index].isFavorite = false;
      this.pokemonsList.next(this.pokemonsList.value);
    } else {
      // check if ther is a space in the array
      this.pokemonsList.value.filter(p => p.isFavorite);

      if (this.pokemonsList.value.filter(p => p.isFavorite).length > 5) {
        alert('Oops, you have too many favorite Pokemons. You must select up to 6 Pokemons')
      } else {
        // add to  lcoa strage 
        this.localStorageService.pushItem(name)
        // change status in the list and make next
        const index = this.pokemonsList.value.findIndex(p => p.name == name);
        this.pokemonsList.value[index].isFavorite = true;
        this.pokemonsList.next(this.pokemonsList.value);
      }
    }

  }


  //Get more pokemon Data
  getMoreData(name: string) {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon/${name}`)
  }
  //Get the pokemon finding area
  getArea(id: number) {
    return this.http.get<Pokemon>(`${this.apiUrl}location/${id}`)
  }
  //Get the evolutions of pokemon
  getEvolution(id: number) {
    return this.http.get<Pokemon>(`${this.apiUrl}evolution-chain/${id}`);
  }
  //Get pokemon species
  getSpecies(name: string) {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon-species/${name}`)
  }

  //Get pokemon type
  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }


}


