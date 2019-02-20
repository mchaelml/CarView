import { SaveVehicle, Vehicle, KeyValuePair } from "./../../models/vehicle";
import { VehicleService } from "./../../services/service.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"]
})
export class VehicleListComponent implements OnInit {
  Page_Size = 3;
  vehicles: SaveVehicle[];
  allVehicles: SaveVehicle[];
  makes: KeyValuePair[];
  query: any = { pageSize: this.Page_Size };
  totalItems: number;
  columns = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: false }
  ];
  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit() {
    var services = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(this.query)
    ];

    forkJoin(services).subscribe(
      data => {
        this.makes = data[0];
        this.vehicles = data[1].items;
        this.totalItems = data[1].totalItems;
      },
      error => {
        if (error.status == 404) this.router.navigate(["/"]);
      }
    );
  }

  populateVehicles() {
    this.vehicleService
      .getVehicles(this.query)
      .subscribe(vehicles => (this.vehicles = vehicles.items));
  }

  onFilterChange() {
    this.query.page = 1;
    this.query.pageSize = this.Page_Size;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {};
    this.query.page = 1;
    this.query.pageSize = this.Page_Size;
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy == columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
