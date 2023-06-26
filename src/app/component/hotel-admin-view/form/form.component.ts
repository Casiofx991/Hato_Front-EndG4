import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Room } from "src/app/models/room.model";

//import * as _ from 'lodash';

import { HttpDataService } from "../../../services/http-data.service";
import { TableComponent } from "../table/table.component";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  @ViewChild("roomForm", { static: false })
  roomForm!: NgForm;

  // Declare tableComp variable of type TableComponent
  @ViewChild(TableComponent) tableComp!: TableComponent;

  isEditMode = false;
  roomData!: Room;

  constructor(private HttpDataServices: HttpDataService) {
    this.roomData = {} as Room;
  }

  paginator!: MatPaginator;

  cancelEdit() {
    this.isEditMode = false;
    this.roomForm.resetForm();
  }

  onSumit() {
    if (this.roomForm.valid) {
      console.log("valid");
      if (this.isEditMode == true) {
        console.log("Update");
        //this.updateRoom();
      } else {
        console.log("Create");
        this.createRoom();
      }
    } else {
      console.log("invalid data");
    }
  }

  createRoom() {
    this.roomData.id = 0;
    this.HttpDataServices.createItem(this.roomData).subscribe(
      (response: any) => {
        this.tableComp.dataSource.data.push({ ...response });
        this.tableComp.dataSource.data = this.tableComp.dataSource.data.map(
          (o: any) => {
            return o;
          }
        );
      }
    );
  }
}
