import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../model/persona.model';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:8080/personas/';
  

  constructor( private http : HttpClient ) { }

  getAllPersonas(){
    return this.http.get(this.url);
  }

  savePersona( persona : Persona){
    return this.http.post(this.url,persona);
  }

  deletePersona(persona : Persona){
    return this.http.delete(this.url+'delete/'+persona.id);
  }

  getPersona(id : any){
    return this.http.get(this.url+'persona/'+id);
  }
}
