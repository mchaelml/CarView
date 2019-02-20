import { PhotoService } from "./../../services/photo.service";
import { VehicleService } from "./../../services/service.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ProgressService } from "src/app/services/progress.service";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.css"]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  tab: string;
  photos: any[];
  progress: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService
  ) {
    route.params.subscribe(p => {
      this.vehicleId = +p["id"];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(["/vehicles"]);
        return;
      }
    });
    this.tab = "basic";
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      v => (this.vehicle = v),
      err => {
        if (err.status == 404) {
          this.router.navigate(["/vehicles"]);
          return;
        }
      }
    );

    this.photoService
      .getPhotos(this.vehicleId)
      .subscribe(photos => (this.photos = photos));
  }

  changeTab(tab) {
    this.tab = tab;
    console.log(this.tab);
  }

  uploadPhoto() {
    this.progressService.startTracking().subscribe(
      progress => {
        console.log(progress);
        this.progress = progress;
      },
      null,
      () => (this.progress = null)
    );

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = "";
    this.photoService.upload(this.vehicleId, file).subscribe(
      photo => this.photos.push(photo),
      error => {
        this.toastr.error("Oops!", error.text());
      }
    );
  }

  delete() {
    if (confirm("Are you sure?"))
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/vehicles"]);
      });
  }
}
