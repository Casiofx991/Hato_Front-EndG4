import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PaymentService } from "src/app/services/payment.service";
import { Payment } from "src/app/models/payment.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-payment",
  templateUrl: "./add-payment.component.html",
  styleUrls: ["./add-payment.component.css"],
})
export class AddPaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signUp() {
    if (this.paymentForm.valid) {
      const payment: Payment = this.paymentForm.value;
      this.paymentService.postPayment(payment).subscribe(
        (response: Payment) => {
          console.log("Pago realizado", response);
          this.router.navigate(["/room-services"]);
        },
        (error) => {
          console.log("Error al realizar el pago", error);
        }
      );
    }
  }

  onSubmit() {
    this.signUp();
  }
}