import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaisService } from '../../services/pais/pais.service';
import { EstadoService } from '../../services/estado/estado.service';
import { PersonaService } from '../../services/persona/persona.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  paises : any;
  estados : any;
  forma : FormGroup | any;
  persona : any;

    
  constructor( private paisService : PaisService,
               private estadoService : EstadoService,
               private personaService : PersonaService,
               private fb : FormBuilder,
               private router : Router){}
  ngOnInit(): void {
    this.forma = this.fb.group({
      id : '',
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      edad : ['', Validators.required],
      pais : ['', Validators.required],
      estado : ['', Validators.required]
    });
    
    this.paisService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    });

    this.forma.get('pais')?.valueChanges.subscribe((value:any) => {
      this.estadoService.getEstadosByPaisId(value.id).subscribe(resp => {
      this.estados = resp;
    })
    });

  }

  guardar(){
    if(this.forma.invalid){
      return;
    }
    
    this.personaService.savePersona(this.forma.value).subscribe(resp => {
      //this.forma.reset();
      this.router.navigateByUrl('/personas');
    });
    
  }
}
