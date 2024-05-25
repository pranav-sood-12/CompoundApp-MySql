import { Routes } from '@angular/router';
import { AllCompoundsComponent } from './components/pages/all-compounds/all-compounds.component';
import { CreateCompoundsComponent } from './components/pages/create-compounds/create-compounds.component';

export const routes: Routes = [
    {
      path: '',
      component: AllCompoundsComponent,
    },
    {
      path: 'create',
      component: CreateCompoundsComponent,
    }
  ];