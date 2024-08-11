import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepProviderComponent } from './step-provider.component';

describe('StepProviderComponent', () => {
  let component: StepProviderComponent;
  let fixture: ComponentFixture<StepProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
