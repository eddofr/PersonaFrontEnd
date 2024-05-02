import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaisService } from '../../services/pais/pais.service';
import { EstadoService } from '../../services/estado/estado.service';
import { PersonaService } from '../../services/persona/persona.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit{
  paises: any;
  estados: any;
  forma: FormGroup | any;
  persona: any;
  param = '';

  constructor(private paisService: PaisService,
    private estadoService: EstadoService,
    private personaService: PersonaService,
    private fb: FormBuilder,
    private router: Router,
    private activareRoute: ActivatedRoute) { }
  
    ngOnInit(): void {

    this.activareRoute.params.subscribe(resp => {
      this.param = resp['id'];
    })

    if (this.param === 'nuevo') {
      this.persona = {};
      console.log(this.persona);
      this.crearFormulario(this.persona);
    } else {
      this.personaService.personaRecibida.subscribe(resp => {
        this.persona = resp;
        console.log(this.persona);
      });
      this.crearFormulario(this.persona);
    }


    this.paisService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    });

    this.forma.get('pais')?.valueChanges.subscribe((value: any) => {
      this.estadoService.getEstadosByPaisId(value.id).subscribe(resp => {
        this.estados = resp;
      })
    });



  }

  crearFormulario(persona: any) {
    this.forma = this.fb.group({
      id: persona.id,
      nombre: [persona.nombre, Validators.required],
      apellido: [persona.apellido, Validators.required],
      edad: [persona.edad, Validators.required],
      pais: [persona.pais, Validators.required],
      estado: [persona.estado, Validators.required]
    });
  }

  guardar() {
    if (this.forma.invalid) {
      return;
    }

    this.personaService.savePersona(this.forma.value).subscribe(resp => {
      //this.forma.reset();
      this.router.navigateByUrl('/personas');
    });
    this.persona = {};

  }
}
