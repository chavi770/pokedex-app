import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { pokemonResult } from 'src/app/model/Pokemon';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pokemons: Observable<pokemonResult[]> = of([]);
  ifIsFavorite: boolean = true;

  constructor(private pokemonService: PokemonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe();
    this.pokemons = this.pokemonService.pokemons$;
  }


  //Add or remove pokemons from favorite
  changeStatus(name: string) {
    this.pokemonService.addOrRemovePokemon(name)

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
