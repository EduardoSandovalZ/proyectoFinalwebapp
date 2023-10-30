import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MateriaService } from 'src/app/services/materia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { FacadeService } from 'src/app/services/facade.service';
import { HttpHeaders } from '@angular/common/http';


declare var $: any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {
  public token: string = "";
  editar: boolean = false;
  materia: any = {};  // Asegúrate de que esta estructura coincida con tu esquema en MateriaService
  public errors: any = {};
  formulario!: FormGroup;
  constructor(
    private location: Location,
    private materiaService: MateriaService,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.materia.programa_educativo = '';
    this.token = this.facadeService.getSessionToken();

    // Verificar la existencia del token
    if (this.token === "") {
      // Redirigir al inicio de sesión si no hay token
      this.router.navigate([""]);
    }
  
  }

  regresar(): void {
    this.location.back();
  }

  registrarMateria(): void {
    if (!this.materia.programa_educativo) {
      alert('Por favor, selecciona un programa educativo');
      return;
    }
    // Asegúrate de incluir el token en los encabezados
    var headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token 
    });

    // Lógica para registrar la materia
    this.materiaService.registrarMateria(this.materia, headers).subscribe(
      (response) => {
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        // Si se registró, entonces mandar al home o a donde necesites
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo registrar la materia");
      }
    );
  }
}