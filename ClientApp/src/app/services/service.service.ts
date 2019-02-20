import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class VehicleService {
  private readonly vehiclesEndPoint = "api/vehicles";
  constructor(private http: Http) {}

  getMakes() {
    return this.http.get("/api/makes").pipe(map(res => res.json()));
  }
  getFeatures() {
    return this.http.get("/api/features").pipe(map(res => res.json()));
  }
  create(vehicle) {
    return this.http
      .post(this.vehiclesEndPoint, vehicle)
      .pipe(map(res => res.json()));
  }

  getVehicle(id) {
    return this.http
      .get(this.vehiclesEndPoint + "/" + id)
      .pipe(map(res => res.json()));
  }

  getVehicles(filter) {
    return this.http
      .get(this.vehiclesEndPoint + "?" + this.toQueryString(filter))
      .pipe(map(res => res.json()));
  }

  toQueryString(obj) {
    var parts = [];
    for (var prop in obj) {
      var value = obj[prop];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(prop) + "=" + encodeURIComponent(value));
    }
    return parts.join("&");
  }

  updateVehicle(vehicle) {
    return this.http
      .put(this.vehiclesEndPoint, vehicle)
      .pipe(map(res => res.json()));
  }

  deleteVehicle(id) {
    return this.http
      .delete(this.vehiclesEndPoint, id)
      .pipe(map(res => res.json()));
  }
}
