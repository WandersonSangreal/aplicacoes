import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Application} from "../../interfaces/application";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.scss']
})
export class RescueComponent implements OnInit {

  public form: FormGroup;
  public rescueValue: number = 0;
  public application: Application;

  public constructor(private apiService: ApiService, private route: Router, private formBuilder: FormBuilder, private dialog: MatDialog) {

    this.application = this.apiService.getApplication();

    if (this.application) {

      const rescues = this.application.acoes.map(item => {
        // @ts-ignore
        return this.createRescue((this.application.saldoTotalDisponivel * (item.percentual / 100)));
      });

      this.form = this.formBuilder.group({
        rescues: this.formBuilder.array(rescues)
      });

    } else {

      this.route.navigate(['/']).then().catch(reason => console.error(reason));

    }

  }

  public ngOnInit(): void {

  }

  public createRescue(max: number): FormGroup {

    return this.formBuilder.group({
      rescue: ['0', [Validators.min(0), Validators.max(max)]]
    });

  }

  public getRescue(index: number): any {
    if (this.form) {
      const item = <FormArray>this.form.get('rescues');
      if (item) {
        return item.at(index);
      }
    }
    return null;
  }

  public sumValue(total: number, percentage: number, value: number) {
    if (Number(value) > (total * (percentage / 100))) {

      this.dialog.open(DialogComponent, {
        width: '25vw',
        data: {
          title: environment.dialogs.titles.error,
          message: environment.dialogs.messages.rescueValueBigger
        }
      });

      return;
    }

    const rescues = this.form.get('rescues') as FormArray;

    this.rescueValue = Array.from(rescues.controls.entries()).map(item => {
      const [, form] = item;
      return Number(form.get('rescue')?.value);
    }).reduce((a, b) => a + b, 0);

  }

  public submitValue() {

    if (this.rescueValue <= this.application.saldoTotalDisponivel) {

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '25vw',
        data: {
          title: environment.dialogs.titles.rescueSuccess,
          message: environment.dialogs.messages.rescueSuccess
        }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.route.navigate(['/']).then().catch(reason => console.error(reason));
      });

      return;

    }

    if (this.rescueValue <= 0) {

      this.dialog.open(DialogComponent, {
        width: '25vw',
        data: {
          title: environment.dialogs.titles.error,
          message: environment.dialogs.messages.rescueTotalValueLess
        }
      });

      return;

    }

    this.dialog.open(DialogComponent, {
      width: '25vw',
      data: {
        title: environment.dialogs.titles.error,
        message: environment.dialogs.messages.rescueTotalValueBigger
      }
    });


  }

}
