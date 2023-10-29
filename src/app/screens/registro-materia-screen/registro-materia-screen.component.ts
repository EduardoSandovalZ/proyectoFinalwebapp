import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MateriaService } from 'src/app/services/materia.service';


declare var $: any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {
  editar: boolean = false;
  materia: any = {};  // Asegúrate de que esta estructura coincida con tu esquema en MateriaService
  public errors: any = {};
  constructor(
    private location: Location,
    private materiaService: MateriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicialización y obtención de datos si es una edición
    // Utiliza activatedRoute para obtener parámetros de la URL
  }

  regresar(): void {
    this.location.back();
  }

  registrar(): void {
    // Lógica para registrar la materia
    // Utiliza materiaService para llamar al servicio de registro
  }

  actualizar(): void {
    // Lógica para actualizar la materia
    // Utiliza materiaService para llamar al servicio de actualización
  }

}
