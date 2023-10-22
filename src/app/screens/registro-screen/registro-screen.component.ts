import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit, AfterViewInit {
  // Variables del componente registro

  @ViewChild('telefonoInput') telefonoInput?: ElementRef;
  public editar: boolean = false;
  public user: any = {};
  // Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  // Para detectar errores
  public errors: any = {};
  public datePickerOptions: any;
  public idUser: number = 0;
  constructor(
    private location: Location,
    private usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();
    // Imprimir datos en consola
    console.log("User: ", this.user);
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }

    // Configurar rango de fechas permitido
    const currentYear = new Date().getFullYear();
    const minDate = new Date(1900, 0, 1); // Puedes ajustar el año según tus necesidades
    const maxDate = new Date(currentYear, 11, 31); // Hasta la fecha actual

    this.datePickerOptions = {
      min: minDate,
      max: maxDate,
    };
  }

  ngAfterViewInit() {
    // Hacer algo después de que la vista se haya inicializado
    if (this.telefonoInput) {
      // Acceder al elemento solo si está definido
    }
  }

  public regresar() {
    this.location.back();
  }
  //Función para obtener un solo usuario por su ID
  public obtenerUserByID(){
    this.usuariosService.getUserByID(this.idUser).subscribe(
      (response)=>{
        this.user = response;
        //Agregamos valores faltantes
        this.user.first_name = response.user.first_name;
        this.user.last_name = response.user.last_name;
        this.user.email = response.user.email;
        this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
        console.log("Datos user: ", this.user);
      }, (error)=>{
        alert("No se pudieron obtener los datos del usuario para editar");
      }
    );
  }

  // Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  // Función para detectar el cambio de fecha
  // Para la fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.user.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.user.fecha_nacimiento);
  }
  //Funcion para darle el formato deseado a los numeros de telefono
  formatearTelefono() {
    if (this.telefonoInput && this.telefonoInput.nativeElement && this.telefonoInput.nativeElement.value) {
      const valor = this.telefonoInput.nativeElement.value;
      const valorNumerico = valor.replace(/\D/g, '');
      const formato = "(000) 000-0000";
      let valorFormateado = "";
      let j = 0;
      for (let i = 0; i < formato.length; i++) {
        if (formato[i] === '0') {
          valorFormateado += valorNumerico[j] || ''; 
          j++;
        } else {
          valorFormateado += formato[i];
        }
      }
      this.user.telefono = valorFormateado;
    } else {
      console.error('this.telefonoInput, this.telefonoInput.nativeElement o su valor es undefined');
    }
  }

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
