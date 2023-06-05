import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public apiEndpoint:string = environment.apiUrl;
  @Input() car!: any;
  constructor()  { }

  ngOnInit(): void {
  }

}
