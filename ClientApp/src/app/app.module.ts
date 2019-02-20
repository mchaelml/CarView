import {
  ProgressService,
  BrowserXhrService
} from "./services/progress.service";
import { PhotoService } from "./services/photo.service";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle.component";
import { AppErrorHandler } from "./app.error-handler";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, ResolveEnd } from "@angular/router";
import { HttpModule, BrowserXhr } from "@angular/http";
import { CommonModule } from "@angular/common";
import { ToastrModule, ToastContainerModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import * as Raven from "raven-js";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { VehicleService } from "./services/service.service";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
import { PaginationComponent } from "./components/shared/pagination.component";
import { AuthService } from "./services/authorization.service";

Raven.config(
  "https://29b41e90ddec46c6937b8fa3c51a7ea8@sentry.io/1388256"
).install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      progressBar: true
    }),
    ToastContainerModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "vehicles/new", component: VehicleFormComponent },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "vehicles/edit/:id", component: VehicleFormComponent },
      { path: "vehicles", component: VehicleListComponent },
      { path: "vehicles/:id", component: ViewVehicleComponent }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: BrowserXhr, useClass: BrowserXhrService },
    VehicleService,
    PhotoService,
    ProgressService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
