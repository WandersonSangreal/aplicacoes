import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Application} from "../../interfaces/Application";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.scss']
})
export class RescueComponent implements OnInit {

  public rescueValue: number = 0;
  public form: FormGroup | undefined;
  public application: Application | null = null;

  public constructor(private apiService: ApiService, private route: Router, private formBuilder: FormBuilder) {

    this.application = this.apiService.getApplication();

    if (this.application) {

      this.form = this.formBuilder.group({
        rescues: this.formBuilder.array([this.createRescue()])
      });

    } else {

      this.route.navigate(['/']);

    }

  }

  public ngOnInit(): void {


  }

  public createRescue(): FormGroup {

    return this.formBuilder.group({
      rescue: [null, [Validators.min(0)]]
    });

  }

}
