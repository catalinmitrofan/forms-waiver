import { Injectable } from '@angular/core';
import * as tattooArtists from '../assets/data/artists.json';

@Injectable({ providedIn: 'root' })
export class ArtistsService {
  public getTattooArtists(): Artist[] {
    return tattooArtists.tattooArtists;
  }

  public getPiercingArtists(): Artist[] {
    return tattooArtists.piercingArtists;
  }
}

export interface Artist {
  firstName: string;
  lastName: string;
}
