import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { pokemonResult } from 'src/app/model/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  pokemons : Observable<pokemonResult[]>;
  

  constructor(private pokemonService : PokemonService, public dialog: MatDialog) {
    this.pokemons = this.pokemonService.favoriatePokimons$;
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe();    
  }


  //Add or remove pokemons from favorite
  changeStatus(name: string) {
    this.pokemonService.addOrRemovePokemon(name);
  }

  // Open pokemon detiles
  openDialog(name: string): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.width = "550px";
    dialogConfig.height = "500px";
    dialogConfig.data = { name: name }
    this.dialog.open(ViewComponent, dialogConfig)

  }

}
