import { Component, OnInit, } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/User';



@Component({
  selector: 'form-field-overview-example',
  templateUrl: 'form-field-overview-example.html',
  styleUrls: ['./form-field-overview-example.css']
})

export class FormComponent implements OnInit {

  public formData!: FormGroup;
  public load: boolean = false  
  public count: number = 3;
  public phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  
  constructor() { }

  ngOnInit(): void {

    this.formData = new FormGroup({
      id: new FormControl(this.count),
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

  }

  submit() {
    this.load = true
    this.count += 1;
    setTimeout(() => {
      if (this.formData.invalid) { return; }
      const dataStorage = JSON.parse(localStorage.getItem('users') || '[]');
      dataStorage.push(this.formData.value)
      const dataLocal = JSON.stringify(dataStorage);
      localStorage.setItem('users', dataLocal);
      this.load = false
      alert('Cadastrado com sucesso!');
      location.reload();
    }, 2000,)
    
  }

  


}
