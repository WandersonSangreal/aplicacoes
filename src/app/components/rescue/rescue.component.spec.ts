import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RescueComponent} from './rescue.component';
import {HttpClientModule} from "@angular/common/http";

describe('RescueComponent', () => {
  let component: RescueComponent;
  let fixture: ComponentFixture<RescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
