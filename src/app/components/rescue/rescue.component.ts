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
      rescue: ['0', [Validators.min(0), Validators.max(parseFloat(max.toFixed(2)))]]
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

    const fixed = parseFloat((total * (percentage / 100)).toFixed(2));

    if (Number(value) > fixed) {

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

  public resetForm() {
    this.form.reset();
  }

  public selection(e: any) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  public rules() {

    const responses = {
      rescueTotalValueLess: (this.rescueValue <= 0),
      rescueValueBigger: (!this.form.valid && this.rescueValue > 0 && this.rescueValue <= this.application.saldoTotalDisponivel),
      rescueTotalValueBigger: (!this.form.valid && this.rescueValue > this.application.saldoTotalDisponivel),
      rescueSuccess: (this.form.valid && this.rescueValue > 0 && this.rescueValue <= this.application.saldoTotalDisponivel)
    };

    // @ts-ignore
    const [result] = Object.keys(responses).filter(key => responses[key]);

    return {
      title: result === 'rescueSuccess' ? environment.dialogs.titles.rescueSuccess : environment.dialogs.titles.error,
      // @ts-ignore
      message: environment.dialogs.messages[result]
    }

  }

  public submitValue() {

    const {title, message} = this.rules();

    this.dialog.open(DialogComponent, {
      width: '25vw',
      data: {
        title: title,
        message: message
      }
    });

  }

}
