import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: "app-add-payment",
  templateUrl: "./add-payment.component.html",
  styleUrls: ["./add-payment.component.css"],
})
export class AddPaymentComponent {
  constructor(private router: Router, private userService: UserService) {}
  
  signUp() {
    this.userService.createUser().subscribe(
      user => {
        console.log(user);
        this.router.navigate(["/room-services"]);
      },
      error => {
        console.error(error);
      }
    );
  }
}