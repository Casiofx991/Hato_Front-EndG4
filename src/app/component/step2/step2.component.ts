import { Component, OnInit } from "@angular/core";
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  room!: string;
  drink!: string;
  food!: string;
  condom!: string;
  drinkNumber!: string;
  foodNumber!: string;
  condomNumber!: string;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    //this.hostal = this.dataService.nhostal;
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getLastOrder().pipe(
      switchMap((lastOrderId: number) => {
        return this.orderService.getOrderById(of(lastOrderId));
      })
    ).subscribe(
      (orderDetails: Order) => {
        this.room = orderDetails.roomNumber;
        this.drink = orderDetails.beverage;
        this.food = orderDetails.appetizer;
        this.condom = orderDetails.preservative;
        this.drinkNumber = orderDetails.beverageQuantity.toString();
        this.foodNumber = orderDetails.appetizerQuantity.toString();
        this.condomNumber = orderDetails.preservativeQuantity.toString();
      },
      (error) => {
        console.log("Error fetching order details:", error);
      }
    );
    
  }
  Confirmar() {
    this.router.navigate(["/room-services"]);
  }
  
}
