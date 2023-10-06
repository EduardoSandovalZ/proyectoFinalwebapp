import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var $:any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit {
  //Variables del componente registro
  public editar: boolean = false;
  public user:any = {};
 //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Para detectar errores
  public errors:any ={};
  public datePickerOptions: any;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();
    //Imprimir datos en consola
    console.log("User: ", this.user);


    // Configurar rango de fechas permitido
    const currentYear = new Date().getFullYear();
    const minDate = new Date(1900, 0, 1); // Puedes ajustar el año según tus necesidades
    const maxDate = new Date(currentYear, 11, 31); // Hasta la fecha actual

    this.datePickerOptions = {
        min: minDate,
        max: maxDate,
    };
  }

  public regresar(){

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.user.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.user.fecha_nacimiento);
  }
  /* 
  
  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.user);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Validar la contraseña
    if(this.user.password == this.user.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
      this.usuariosService.registrarUsuario(this.user).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
          return true;
        }, (error)=>{
          alert("No se pudo registrar usuario");
        }
      )
    }else{
      alert("Las contraseñas no coinciden");
      this.user.password="";
      this.user.confirmar_password="";
      return false;
    }
  }
  
  
  
  */

  public registrar(): Promise<boolean> {
    return new Promise((resolve) => {
        // Validar
        this.errors = [];

        this.errors = this.usuariosService.validarUsuario(this.user);
        if (!$.isEmptyObject(this.errors)) {
            resolve(false);
        }
        // Validar la contraseña
        if (this.user.password == this.user.confirmar_password) {
            // Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
            this.usuariosService.registrarUsuario(this.user).subscribe(
                (response) => {
                    alert("Usuario registrado correctamente");
                    console.log("Usuario registrado: ", response);
                    this.router.navigate(["/"]);
                    resolve(true);
                },
                (error) => {
                    alert("No se pudo registrar usuario");
                    resolve(false);
                }
            );
        } else {
            alert("Las contraseñas no coinciden");
            this.user.password = "";
            this.user.confirmar_password = "";
            resolve(false);
        }
    });
}

  
}
