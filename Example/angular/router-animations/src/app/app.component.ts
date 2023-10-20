import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routeFadeAnimation } from "./app.animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [routeFadeAnimation],
})
export class AppComponent {
  title = "router-animations";

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}
