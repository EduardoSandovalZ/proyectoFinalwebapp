import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
  ) { }

  public esquemaMateria(){
    return {
      'nrc': '',
      'name': '',
      'section': '',
      'days': '',
      'hora_inicio': '',
      'hora_fin': '',
      'salon': '',
      'programa': '',
    }
  }

  public validarateria(data: any, editar: boolean){
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["name"])){
      error["name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["section"])){
      error["section"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["days"])){
      error["days"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_fin"])){
      error["hora_fin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa"])){
      error["programa"] = this.errorService.required;
    }

    return error;
  }

  //Aquí van los servicios HTTP
  // Cambios en las URLs para usar /materia/ en lugar de /users/
  public registrarMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/materia/`, data, httpOptions);
  }

  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, { headers: headers });
  }

  public getMateriaByID(idMateria: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/materia/?id=${idMateria}`, httpOptions);
  }

  public editarMateria(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/materia-edit/`, data, { headers: headers });
  }

  public eliminarMateria(idMateria: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/materia-edit/?id=${idMateria}`, { headers: headers });
  }
}
