import { Injectable } from '@angular/core';
import * as homeScreenData from '../assets/data/home-screen.json';

@Injectable({ providedIn: 'root' })
export class HomeScreenService {
    public getHomeScreenText(): string {
        return homeScreenData.welcomeText;
    }

    
}