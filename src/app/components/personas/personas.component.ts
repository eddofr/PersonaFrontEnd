import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
import { NgFor } from '@angular/common';
import { Persona } from '../../model/persona.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent implements OnInit{

  personas : any;
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

  editarPersona(persona : Persona){
    this.router.navigateByUrl('persona');
    
  }

}
