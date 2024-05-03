import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
import { NgFor, NgIf } from '@angular/common';
import { Persona } from '../../model/persona.model';
import { Router, RouterLink } from '@angular/router';
import { PersonaComponent } from "../persona/persona.component";

@Component({
    selector: 'app-personas',
    standalone: true,
    templateUrl: './personas.component.html',
    styleUrl: './personas.component.css',
    imports: [NgFor, RouterLink, PersonaComponent, NgIf]
})
export class PersonasComponent implements OnInit{

  personas : any;
  mostrar = false;
  

  constructor( private personaService : PersonaService,
               private router : Router ){}
  ngOnInit(): void {
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    });
  }

  borrarPersona(persona : Persona, i : number){
    this.personaService.deletePersona(persona).subscribe(resp => {
      this.personas.splice(i ,1);
    });
  }

  
  enviarPersona(persona : any){
    this.personaService.addPersona(persona);
  }

}
