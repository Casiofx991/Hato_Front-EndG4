import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-sign-up-register',
  templateUrl: './sign-up-register.component.html',
  styleUrls: ['./sign-up-register.component.css']
})
export class SignUpRegisterComponent {

  constructor(private router: Router, public userService: UserService) { }

  createAccount(){
    debugger;
    this.userService.createUser().subscribe(
      user => {
        console.log(user);
        this.router.navigate(['/add-payment']);
      },
      error => {
        console.error(error);
      }
    );
  }
}