import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import ptBR from "@angular/common/locales/pt";
import {RescueComponent} from './rescue.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import {LOCALE_ID} from "@angular/core";
import {NgxMaskModule} from "ngx-mask";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatDialogHarness} from "@angular/material/dialog/testing";

registerLocaleData(ptBR);

xdescribe('RescueComponent', () => {
  let component: RescueComponent;
  let fixture: ComponentFixture<RescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [RescueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('TestesResgate', () => {
  let component: RescueComponent;
  let fixture: ComponentFixture<RescueComponent>;

  let loader: HarnessLoader;
  let fakeApiService: ApiService;

  const apiResults = {
    "nome": "INVESTIMENTO I",
    "objetivo": "Minha aposentadoria",
    "saldoTotalDisponivel": 39321.29,
    "indicadorCarencia": "N",
    "acoes": [
      {
        "id": "1",
        "nome": "BBAS3",
        "percentual": 28.1
      },
      {
        "id": "2",
        "nome": "VALE3",
        "percentual": 20.71
      },
      {
        "id": "3",
        "nome": "PETR4",
        "percentual": 21.63
      },
      {
        "id": "4",
        "nome": "CMIG3",
        "percentual": 12.41
      },
      {
        "id": "5",
        "nome": "OIBR3",
        "percentual": 17.15
      }
    ]
  };

  beforeEach(async () => {

    fakeApiService = jasmine.createSpyObj<ApiService>('ApiService', {
      getApplications: undefined,
      setApplication: undefined,
      getApplication: apiResults
    });

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NoopAnimationsModule,
        NgxMaskModule.forRoot(),
      ],
      declarations: [RescueComponent],
      providers: [
        CurrencyPipe,
        {provide: ApiService, useValue: fakeApiService},
        {provide: LOCALE_ID, useValue: 'pt-BR'}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('Deve clicar em confirmar sem preenncher nenhum campo', async () => {

    const dialogTitle = 'ERRO!';
    const dialogMessage = 'zerado';

    const button = fixture.nativeElement.querySelector('.btn');
    button.click();

    fixture.detectChanges();

    const dialogs = await loader.getAllHarnesses(MatDialogHarness);

    // const popUpHeader = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    const dialogHeader = document.querySelector('.dialog-title') as HTMLHeadElement;
    const dialogBody = document.querySelector('.dialog-message') as HTMLElement;

    expect(dialogHeader.innerText).toContain(dialogTitle);
    expect(dialogBody.innerText).toContain(dialogMessage);

    await dialogs[0].close();

  });

  it('Clicar em confirmar com um dos campos a resgatar com valor invalido', async () => {

    const dialogTitle = 'ERRO!';
    const dialogMessage = 'acima do disponível';

    await fixture.whenStable();

    const inputValue = fixture.nativeElement.querySelector('input:first-child');

    inputValue.value = 100000;
    inputValue.dispatchEvent(new Event('input'));
    inputValue.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.btn');

    button.click();

    fixture.detectChanges();

    const dialogs = await loader.getAllHarnesses(MatDialogHarness);

    const dialogHeader = document.querySelector('.dialog-title') as HTMLHeadElement;
    const dialogBody = document.querySelector('.dialog-message') as HTMLElement;

    expect(dialogHeader.innerText).toContain(dialogTitle);
    expect(dialogBody.innerText).toContain(dialogMessage);

    await dialogs[0].close();

  });
});
