import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public formData!: FormGroup;
  public load: boolean = false
  public phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const getUserLocalStorage = JSON.parse(localStorage.getItem('users') || '');
    
    const id = this.route.snapshot.paramMap.get('id');
    const selectedUser = getUserLocalStorage.find((_: any, index: string) => index == id)

    this.formData = new FormGroup({
      id: new FormControl(selectedUser.id),
      name: new FormControl(selectedUser.name, [Validators.required]),
      cpf: new FormControl(selectedUser.cpf, [Validators.required, Validators.minLength(11)]),
      phone: new FormControl(selectedUser.phone, [Validators.required]),
      email: new FormControl(selectedUser.email, [Validators.required, Validators.email])
    });

  }

  submit() {
    this.load = true
    setTimeout(()=>{
      if (this.formData.invalid) { return; }
  
      const dataStorage = JSON.parse(localStorage.getItem('users') || '[]');
      dataStorage[this.formData.value.id] = this.formData.value
  
      const dataLocal = JSON.stringify(dataStorage);
      localStorage.setItem('users', dataLocal);

      this.load = false
      alert('Editado com sucesso!');

      location.reload();
    },2000)
  }

}
