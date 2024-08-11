import { Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { TattooConsentComponent } from './components/tattoo-consent/tattoo-consent.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: HomeScreenComponent,
  },
  {
    path: 'tattoo',
    component: TattooConsentComponent,
  },
  { path: '**', redirectTo: '' },
];
