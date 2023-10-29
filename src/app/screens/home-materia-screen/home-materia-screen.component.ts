import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home-materia-screen',
  templateUrl: './home-materia-screen.component.html',
  styleUrls: ['./home-materia-screen.component.scss']
})
export class HomeMateriaScreenComponent implements OnInit, AfterViewInit {
  public token: string = "";
  public listaMaterias: DatosMateria[] = [];

  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'dias', 'hora_inicio', 'hora_final', 'salon', 'programa_educativo'];
  dataSource = new MatTableDataSource<any>(this.listaMaterias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private materiaService: MateriaService,
    private router: Router,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();
    this.obtenerMaterias();

    if (this.token === "") {
      this.router.navigate([""]);
    }

    this.obtenerMaterias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  public obtenerMaterias() {
    this.materiaService.obtenerListaMaterias().subscribe(
      (response) => {
        this.listaMaterias = response;
        this.convertirHorasADate(this.listaMaterias);  // Aquí se realiza la conversión
        this.dataSource.data = this.listaMaterias;
      },
      (error) => {
        alert("No se pudo obtener la lista de materias");
      }
    );
  }
  convertirHorasADate(listaMaterias: DatosMateria[]) {
    listaMaterias.forEach(materia => {
      materia.hora_inicio = new Date(`1970-01-01T${materia.hora_inicio}`);
      materia.hora_final = new Date(`1970-01-01T${materia.hora_final}`);
    });
  }
  
  // public obtenerMaterias() {
    // this.materiaService.obtenerListaMaterias().subscribe(
      // (response) => {
        // this.listaMaterias = response;
        // this.dataSource.data = this.listaMaterias;
      // },
      // (error) => {
        // alert("No se pudo obtener la lista de materias");
      // }
    // );
  // }

  regresar(): void {
    this.location.back();
  }
}
export interface DatosMateria {
  id: number,
  nrc: number;
  nombre: string;
  seccion: number;
  dias: string;
  hora_inicio: Date;
  hora_final: Date;
  salon: string;
  programa_educativo: string;
}
