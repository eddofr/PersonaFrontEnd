import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PruebaComponent } from "./components/prueba/prueba.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NgFor, ReactiveFormsModule, PruebaComponent]
})
export class AppComponent {

 
  
}
