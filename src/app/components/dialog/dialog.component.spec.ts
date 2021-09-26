import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

xdescribe('DialogComponent', () => {

  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const data = {
    title: 'title',
    message: 'message'
  };
  const matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['onNoClick', 'closeDialog']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [DialogComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: matDialogSpy
      },
        {
          provide: MAT_DIALOG_DATA,
          useValue: data
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
