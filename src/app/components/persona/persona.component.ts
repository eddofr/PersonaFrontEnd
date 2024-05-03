import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaisService } from '../../services/pais/pais.service';
import { EstadoService } from '../../services/estado/estado.service';
import { PersonaService } from '../../services/persona/persona.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PersonasComponent } from "../personas/personas.component";
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-persona',
    standalone: true,
    templateUrl: './persona.component.html',
    styleUrl: './persona.component.css',
    imports: [ ReactiveFormsModule, NgFor, RouterLink, PersonasComponent, NgIf]
})
export class PersonaComponent {
  paises : any;
  estados : any;
  forma : FormGroup | any;
  mostrar = false;
  persona : any;
  param = '';


  constructor( private paisService : PaisService,
               private estadoService : EstadoService,
               private personaService : PersonaService,
               private fb : FormBuilder,
               private router : Router,
               private aRoute : ActivatedRoute){

               }
  ngOnInit(): void {


    this.paisService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    });

    this.aRoute.params.subscribe(resp => {
      this.param = resp['id'];
    });

    if(this.param === 'nuevo'){
      this.persona = {};
      this.crearFormulario(this.persona);
    }else{
      this.personaService.personaRecibida.subscribe(resp=>{
      this.persona = resp;
      console.log(this.persona);
      this.personaService._personaSubject = new BehaviorSubject({});
      })
      this.crearFormulario(this.persona);
    }

    this.forma.get('pais')?.valueChanges.subscribe((value:any) => {
      this.estadoService.getEstadosByPaisId(value.id).subscribe(resp => {
      this.estados = resp;
    })
    });

  }

  crearFormulario( persona : any ){
    this.forma = this.fb.group({
      id : persona.id,
      nombre : [persona.nombre, Validators.required],
      apellidos : [persona.apellidos, Validators.required],
      edad : [persona.edad, Validators.required],
      pais : [persona.pais, Validators.required],
      estado : [persona.estado, Validators.required]
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
