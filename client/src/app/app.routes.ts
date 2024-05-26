import { Routes } from '@angular/router';
import { AllCompoundsComponent } from './components/pages/all-compounds/all-compounds.component';
import { CreateCompoundsComponent } from './components/pages/create-compounds/create-compounds.component';
import { UpdateCompoundComponent } from './components/pages/update-compound/update-compound.component';
import { CompoundPageComponent } from './components/pages/compound-page/compound-page.component';

export const routes: Routes = [
    {
      path: '',
      component: AllCompoundsComponent,
    },
    {
      path: 'create',
      component: CreateCompoundsComponent,
    },
    {
        path: 'update/:id',
        component: UpdateCompoundComponent,
    },
    {
      path: 'compound/:id',
      component: CompoundPageComponent,
    },
  ];