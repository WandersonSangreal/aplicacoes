import {Component, OnInit} from '@angular/core';

import {Application} from "../../interfaces/Application";

import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public applications: Array<Application> = [];

  public constructor(private apiService: ApiService, private route: Router) {
  }

  public ngOnInit(): void {

    this.apiService.getApplications().subscribe(results => this.applications = results);

  }

  public async setApplication(application: Application): Promise<void> {
    this.apiService.setApplication(application);
    await this.route.navigate(['rescue']);
  }

}
