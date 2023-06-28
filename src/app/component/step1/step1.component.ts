import { Component } from '@angular/core';
//import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})

export class Step1Component {
  constructor(private orderService: OrderService, private router: Router) {}

  selectedOptionNro!:string;
  selectedOptionfood!: string;
  selectedOptiondrink!: string;
  selectedOptioncondoms!:string;
  drinknumber!:string;
  foodnumber!:string;
  condomsnumber!:string;
  optionshostal: string[] = ['AA1', 'AA2', 'AA3','AA4','AA5','AB2','AB4'];
  optionsdrink: string[] = ['Inka Cola 650mml', 'Pepsi Cola 500mml', 'Coca Cola 650mml','Vino RocaForte 1L','Pisco Sour','Ron Cartavio 650mml','FourLoko 600mml'];
  optionsfoods: string[] = ['Papa Lays' ,'Chesse triz','Piqueo Snacks','Chocolate Donnas','Galleta Margarita', 'Galleta Blackout','Galleta Rellenita'];
  optionscondoms: string[] = ['Durex','Piel','Prudence','Generico'];
  Save() {
    const order: Order = {
      roomNumber: this.selectedOptionNro,
      beverage: this.selectedOptiondrink,
      beverageQuantity: parseInt(this.drinknumber),
      appetizer: this.selectedOptionfood,
      appetizerQuantity: parseInt(this.foodnumber),
      preservative: this.selectedOptioncondoms,
      preservativeQuantity: parseInt(this.condomsnumber)
    };
    this.orderService.postOrder(order).subscribe(
      response => {
        console.log('Orden registrada:', response);
        this.router.navigate(['/step-2']);
      },
      error => {
        console.error('Error al registrar la orden:', error);
      }
    );
  }
  
  
}
