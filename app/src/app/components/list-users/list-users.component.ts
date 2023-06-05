import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service'
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public ELEMENT_DATA: User[] = [];
  public displayedColumns = ['Nome', 'CPF', 'Telefone', 'E-mail', 'Excluir', 'Editar'];
  public dataSource:User[] = this.ELEMENT_DATA;
  


  constructor(private userService: UserService) { }

  getUserLocalStorage():void{
    const firstAccess = !Number(localStorage.getItem('firstAccess') || 0) ;
    const dataStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    if(!dataStorage.length && firstAccess){this.getUser();}
    else{this.dataSource = dataStorage}
  }

  ngOnInit(): void {
    this.getUserLocalStorage();
  }

  getUser(): void {
    this.userService.getAll()
    .subscribe(
      (response) => {
        this.dataSource = response.map((user:User,index:any)=>({...user, id:index})) 

        localStorage.setItem('users', JSON.stringify(this.dataSource));
        localStorage.setItem('firstAccess', '1');
      }
        );
   }

   deleteUser(cpf:string){
    const users = this.dataSource;

    const userDelete = JSON.stringify(users.filter((item) => item.cpf != cpf));
    localStorage.setItem('users', userDelete);

    this.getUserLocalStorage();
   }

 


}
