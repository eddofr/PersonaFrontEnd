import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url = 'http://localhost:8080/pais/'

  constructor( private http : HttpClient ) { }

  getAllPaises(){
    return this.http.get(this.url);
  }
}
