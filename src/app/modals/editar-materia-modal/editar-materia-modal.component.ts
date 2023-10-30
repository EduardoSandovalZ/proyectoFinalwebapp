import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriaService } from 'src/app/services/materia.service';
@Component({
  selector: 'app-editar-materia-modal',
  templateUrl: './editar-materia-modal.component.html',
  styleUrls: ['./editar-materia-modal.component.scss']
})
export class EditarMateriaModalComponent {
  constructor(
    private materiaServices: MateriaService,
    private dialogRef: MatDialogRef<EditarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    console.log("Materia id:", this.data.id);
  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  public editarMateria(){
    this.materiaServices.getMateriaByID(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },(error)=>{
        alert("Prueba "+ error);
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
