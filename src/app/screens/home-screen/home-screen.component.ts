import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  public token : string = "";
  public lista_usuarios: any[] = [];
  
  constructor(
    private facadeService: FacadeService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    if(this.token == ""){
      this.router.navigate([""]);
    }
  }

  
  //Cerrar sesión
  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

}
