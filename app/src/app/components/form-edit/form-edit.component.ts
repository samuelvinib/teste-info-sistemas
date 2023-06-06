import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  placa!: string;
  chassi!: string;
  renavam!: string;
  modelo!: string;
  marca!: string;
  ano!: number;

  
  constructor(public dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    console.log(this.data)
  }

  onConfirm(): void {
    this.http.put(`${environment.apiUrl}/${this.data.id}`, this.data)
    .subscribe(
      (response) => {
        this.toastr.success('Carro editado com sucesso!', 'Sucesso');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      (error) => {
        console.error('Erro ao criar o carro:', error);
        this.toastr.error('Insira todos os dados e uma imagem para criar um carro', 'Erro');
      }
    );

  }

  onCancel(): void {
    this.dialogRef.close();
    window.location.reload()
  }

}
