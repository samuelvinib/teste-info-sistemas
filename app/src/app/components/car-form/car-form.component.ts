import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent {
  placa!: string;
  chassi!: string;
  renavam!: string;
  modelo!: string;
  marca!: string;
  ano!: number;
  files: File[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router, private toastr: ToastrService) {}

  selectedImages: File[] = [];
  safeImageUrls: SafeUrl[] = [];

  getImageUrl(image: File): string {
    return URL.createObjectURL(image);
  }
  
  ngOnInit(): void {
  }

  createCar() {
    const formData = new FormData();
    formData.append('placa', this.placa);
    formData.append('chassi', this.chassi);
    formData.append('renavam', this.renavam);
    formData.append('modelo', this.modelo);
    formData.append('marca', this.marca);
    formData.append('ano', this.ano.toString());

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i], this.files[i].name);
    }

    this.http.post(environment.apiUrl, formData)
      .subscribe(
        (response) => {
          this.toastr.success('Carro criado com sucesso!','Sucesso');
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1000)
        },
        (error) => {
          console.error('Erro ao criar o carro:', error);
          this.toastr.error('Insira todos os dados e uma imagem para criar um carro', 'Erro');
        }
      );
  }

  onFileSelected(event: any) {
    this.files = event.target.files;
    this.selectedImages = event.target.files;

    this.safeImageUrls = [];
    for (let i = 0; i < this.selectedImages.length; i++) {
      const url = URL.createObjectURL(this.selectedImages[i]);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.safeImageUrls.push(safeUrl);
    }
  }
}
