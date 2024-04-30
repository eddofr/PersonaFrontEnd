import { Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonaComponent } from './components/persona/persona.component';

export const routes: Routes = [
    { path : 'personas', component : PersonasComponent },
    { path : 'persona/:id', component : PersonaComponent},
    { path : '**', pathMatch:"full", redirectTo: 'personas'}
];
