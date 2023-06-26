import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-sign-up-plans',
  templateUrl: './sign-up-plans.component.html',
  styleUrls: ['./sign-up-plans.component.css']
})
export class SignUpPlansComponent {

  constructor(private router: Router, private userService: UserService) { }

  inputActive: boolean = false;
  roomCount: number = 0;
  totalPrice: number = 0;

  calculatePrice(): void {
    this.totalPrice = this.roomCount * 7;
  }

  subscribe(): void {
    this.userService.updateUserPlan('Plan ' + this.roomCount);
    this.router.navigate(['/sign-up-register']);
  }

  toggleGlow(active: boolean): void {
    this.inputActive = active;
  }
}