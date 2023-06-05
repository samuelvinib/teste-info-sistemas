import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

interface CarData {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  imagens: FileList | null;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent {
  carData: CarData = {
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: 0,
    imagens: null
  };

  constructor(private http: HttpClient) { }

  submitForm() {
    const formData = new FormData();
    formData.append('placa', this.carData.placa);
    formData.append('chassi', this.carData.chassi);
    formData.append('renavam', this.carData.renavam);
    formData.append('modelo', this.carData.modelo);
    formData.append('marca', this.carData.marca);
    formData.append('ano', String(this.carData.ano));

    if (this.carData.imagens) {
      for (let i = 0; i < this.carData.imagens.length; i++) {
        formData.append('imagens', this.carData.imagens[i]);
      }
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post(environment.apiUrl, formData, { headers })
      .subscribe(
        (response) => {
          console.log(response)
          console.log('Carro criado:', response);
          // Realizar as ações desejadas após o envio do formulário
        },
        (error) => {
          console.log()
          console.error('Erro ao criar carro:', error);
          // Lidar com o erro de criação do carro
        }
      );
  }
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      // Faça o processamento dos arquivos aqui
      console.log(files);
    }
  }
}
