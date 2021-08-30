import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItems(key: string, obj: any) {
    localStorage.setItem(key, obj);
  }


  getItems(): string[] {
    return (localStorage.getItem('favorites')?.split(',')) || [];
  }

  pushItem(item: string) {
    // Parse the serialized data back into an aray of objects
    const favorites = this.getItems();
    // Push the new data onto the array
    favorites.push(item);
    // Re-serialize the array back into a string and store it in localStorage
    this.setItems('favorites', favorites);
  }

}

