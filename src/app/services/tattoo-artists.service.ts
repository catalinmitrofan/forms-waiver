import { Injectable } from '@angular/core';
import * as tattooArtists from '../assets/data/tattoo-artists.json';

@Injectable({ providedIn: 'root' })
export class TattooArtistsService {
  public getTattooArtists(): TattooArtist[] {
    return tattooArtists.tattooArtists;
  }
}

export interface TattooArtist {
  firstName: string;
  lastName: string;
}
