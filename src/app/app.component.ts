import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "trabajoparcial";
  /*constructor(private http: HttpClient) {
    this.http.get("https://hato-back-end.ue.r.appspot.com/api/hato/payments").subscribe((data) => {
      console.log(data);
    });
  }*/
}
