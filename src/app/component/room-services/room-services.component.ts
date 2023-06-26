import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ServingService } from "src/app/services/serving.service";

@Component({
  selector: "app-room-services",
  templateUrl: "./room-services.component.html",
  styleUrls: ["./room-services.component.css"],
})
export class RoomServicesComponent {
  constructor(private router: Router, private servingService: ServingService) {}
  step1(servingType: string) {
    const serving = {
      servingType: servingType,
      orderDate: null,
      deliveryDate: null
    };
  
    this.servingService.postServing(serving)
      .subscribe(
        () => {
          console.log("Solicitud de servicio (" + servingType + ") enviada correctamente");
        },
        (error) => {
          console.log("Error al enviar la solicitud de servicio: ", error);
        }
      );
    this.router.navigate(["/step-1"]);
  }
}
