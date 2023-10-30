import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MateriaService } from 'src/app/services/materia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { FacadeService } from 'src/app/services/facade.service';
import { HttpHeaders } from '@angular/common/http';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


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
  public idMateria: number = 0;
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
    this.materia = this.materiaService.esquemaMateria();
    // Verificar la existencia del token
    if (this.token === "") {
      // Redirigir al inicio de sesión si no hay token
      this.router.navigate([""]);
    }
    // Verificar si es una edición
    console.log("User: ", this.materia);
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaPorId();
    }
    
  
  }
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      // Define aquí las propiedades del formulario y las validaciones necesarias
      programa_educativo: ['', Validators.required],
      // Agrega más propiedades según tus necesidades
    });
  }

  regresar(): void {
    this.location.back();
  }
  public obtenerMateriaPorId(): void {
    this.token = this.facadeService.getSessionToken();
    this.materia = this.materiaService.esquemaMateria();
    this.materiaService.getMateriaByID(this.idMateria).subscribe(
      (response) => {
        this.materia = response;
        // Asegúrate de ajustar las propiedades según la estructura de tu entidad Materia
        this.materia.nombre = response.nombre;
        this.materia.salon = response.salon;
        this.materia.dias = response.dias;
        this.materia.hora_inicio = response.hora_inicio;
        this.materia.hora_final = response.hora_final;
        this.materia.programa_educativo = response.programa_educativo;
        // ... Agrega otras propiedades necesarias
  
        console.log("Datos de la materia: ", this.materia);
      },
      (error) => {
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }
  
  public actualizarMateria(): boolean {
    // Validar
    this.errors = this.materiaService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");
    var headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token 
    });
    
    // Mandar a registrar los datos
    this.materiaService.editarMateria(this.materia).subscribe(
      (response) => {
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        // Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo editar usuario");
      }
    );
  
    // Devolver true si todo está bien
    return true;
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