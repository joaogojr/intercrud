import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  urlBase: `http://localhost:5050/api/`;

  constructor() {}
}
