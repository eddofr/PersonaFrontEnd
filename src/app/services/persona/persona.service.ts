import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../model/persona.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:8080/personas/';

  //persona : any;

  _personaSubject = new BehaviorSubject<any>({});
  

  constructor( private http : HttpClient ) { 
    //this._personaSubject = new BehaviorSubject<any>({});
  }

  addPersona(personaI : any){
    //this.persona = personaI;
    this._personaSubject.next(personaI);
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
