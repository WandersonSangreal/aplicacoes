import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {ApiResponse} from "../interfaces/ApiResponse";
import {Application} from "../interfaces/Application";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private selectedApplication: Application;

  public constructor(private http: HttpClient) {

  }

  public getApplications(): Observable<Array<Application>> {

    return this.http.get<ApiResponse>('http://www.mocky.io/v2/5e76797e2f0000f057986099').pipe(map(data => data.response.data.listaInvestimentos));

  }

  public setApplication(application: Application): void {

    this.selectedApplication = application;

  }

  public getApplication(): Application {

    return this.selectedApplication;

  }


}
