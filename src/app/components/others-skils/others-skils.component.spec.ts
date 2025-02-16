import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersSkilsComponent } from './others-skils.component';

describe('OthersSkilsComponent', () => {
  let component: OthersSkilsComponent;
  let fixture: ComponentFixture<OthersSkilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersSkilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersSkilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
