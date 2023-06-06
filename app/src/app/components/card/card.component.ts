import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public apiEndpoint:string = environment.apiUrl;
  @Input() car!: any;
  
  constructor(private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService)  { }

  ngOnInit(): void {
  }

  openConfirmationPopup(carId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { carId: carId }
    });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`${environment.apiUrl}/${carId}`)
        .subscribe(
          (response) => {
            this.toastr.success('Carro excluido com sucesso!','Sucesso');
            setTimeout(()=>{
              window.location.reload();
            },1000)
          },
          (error) => {
            console.error('Erro ao criar o carro:', error);
            this.toastr.error('Insira todos os dados e uma imagem para criar um carro', 'Erro');
          }
        );
      }
    });
  }
}
