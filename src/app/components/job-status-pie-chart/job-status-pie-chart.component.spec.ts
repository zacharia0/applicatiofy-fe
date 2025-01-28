import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusPieChartComponent } from './job-status-pie-chart.component';

describe('JobStatusPieChartComponent', () => {
  let component: JobStatusPieChartComponent;
  let fixture: ComponentFixture<JobStatusPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobStatusPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobStatusPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
