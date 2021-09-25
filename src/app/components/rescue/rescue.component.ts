import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Application} from "../../interfaces/Application";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.scss']
})
export class RescueComponent implements OnInit {

  public form: FormGroup;
  public rescueValue: number = 0;
  public application: Application | null = null;

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

      this.route.navigate(['/']);

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
          title: 'ERRO!',
          message: 'O valor digitado está acima do disponível. Tente um valor mais baixo!'
        }
      });

      return;
    }

    const rescues = this.form.get('rescues') as FormArray;

    this.rescueValue = Array.from(rescues.controls.entries()).map(item => {
      const [index, form] = item;
      console.log(form.get('rescue')?.value);
      return Number(form.get('rescue')?.value);
    }).reduce((a, b) => a + b, 0);

  }

  public submitValue() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '25vw',
      data: {
        title: 'RESGATE EFETUADO COM SUCESSO!',
        message: 'O valor solicitado estará em sua conta em até 5 dias úteis.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.route.navigate(['/']);
    });

  }

}
