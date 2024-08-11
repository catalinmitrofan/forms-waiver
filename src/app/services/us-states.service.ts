import { Injectable } from '@angular/core';
import * as stateList from '../assets/data/state-list.json';

@Injectable({ providedIn: 'root' })
export class USStatesService {
  public getUSStates(): USState[] {
    return stateList.states;
  }
}

export interface USState {
  name: string;
  abbreviation: string;
}
