import { Component } from "@angular/core";
import { AuthService } from "./services/authorization.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.auth.renewTokens();
    }
  }
  title = "app";
}
