import { ConvertActionBindingResult } from "@angular/compiler/src/compiler_util/expression_converter";

export interface KeyValuePair {
  id: number;
  name: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export interface Vehicle {
  id: number;
  model: KeyValuePair;
  name: string;
  make: KeyValuePair;
  isRegistered: boolean;
  features: KeyValuePair[];
  contact: Contact;
  lastUpdate: string;
}

export interface SaveVehicle {
  id: number;
  modelId: number;
  makeId: number;
  name: string;
  isRegistered: boolean;
  features: number[];
  contact: Contact;
}
