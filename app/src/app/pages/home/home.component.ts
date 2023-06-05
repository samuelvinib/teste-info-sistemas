import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  cars:any = [];
  public endpoint:string = environment.apiUrl;

  ngOnInit(): void {
      this.cars = this.http.get(environment.apiUrl)
        .subscribe(
          (response) => {
            console.log(response)
            this.cars = response;
          },
          (error) => {
            console.error('Erro ao criar o carro:', error);
          }
        );
  }

}
