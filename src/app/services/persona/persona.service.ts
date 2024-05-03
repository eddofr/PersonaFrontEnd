import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../model/persona.model';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:8080/personas/';

  _personaSubject = new BehaviorSubject({});
  

  constructor( private http : HttpClient ) { }

  addPersona(persona : any){
    this._personaSubject.next(persona);
  }

  get personaRecibida(){
    return this._personaSubject.asObservable();
  }

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
