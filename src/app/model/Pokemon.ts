export interface Pokemon {
    id: number;
    types: any;
    evolution_chain: any;
    chain(chain: any): void;
    count: number;
    next: string;
    previous: string;
    results: pokemonResult[];
}

export interface pokemonResult {
    name: string,
    url: string,
    isFavorite: boolean
}

