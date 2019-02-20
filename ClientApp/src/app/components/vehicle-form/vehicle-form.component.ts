import { SaveVehicle, Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import * as _ from "underscore";
import { isNumber } from "util";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  vehicle: SaveVehicle = {
    features: [],
    contact: { name: "", phone: "", email: "" },
    id: 0,
    makeId: 0,
    modelId: 0,
    name: "",
    isRegistered: false
  };
  models: any[];
  features: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private vehicleService: VehicleService
  ) {
    delete this.vehicle.id;
    route.params.subscribe(p => {
      if (p["id"] !== "new") {
        this.vehicle.id = +p["id"];
      }
    });
  }

  ngOnInit() {
    var services = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if (this.vehicle.id && isNumber(this.vehicle.id)) {
      services.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(services).subscribe(
      data => {
        this.makes = data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      },
      error => {
        if (error.status == 404) this.router.navigate(["/"]);
      }
    );
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    delete this.models;
    this.models = selectedMake ? selectedMake.models : [];
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(f => f.id);
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id)
      this.vehicleService.updateVehicle(this.vehicle).subscribe(x => {
        this.toastr.success("Successfully updated", "yay!");
      });
    else {
      delete this.vehicle.id;
      this.vehicleService.create(this.vehicle).subscribe(x => {
        this.toastr.success("Successfully created", "yay!");
      });
    }
  }

  delete() {
    if (confirm("Are you sure?"))
      this.vehicleService.deleteVehicle(this.vehicle.id);
  }
}
