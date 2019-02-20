import { ToastrService } from "ngx-toastr";
import { ErrorHandler, Inject, isDevMode } from "@angular/core";
import * as Raven from "raven-js";

export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(ToastrService) private toastr: ToastrService) {}
  handleError(error: any): void {
    console.log(error);
    this.toastr.error("Oops!", "Error happened!");
    if (!isDevMode) Raven.captureException(error.originalError || error);
    else throw error;
  }
}
