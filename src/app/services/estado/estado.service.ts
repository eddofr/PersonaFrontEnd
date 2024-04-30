import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  url = 'http://localhost:8080/estado/'

  constructor( private http : HttpClient ) { }

  getEstadosByPaisId(idPais : any){
    return this.http.get(this.url+idPais);
  }
}
