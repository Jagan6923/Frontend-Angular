import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { FeedbackComponent } from './feedback.component';
import { SharedService } from 'src/app/shared.service';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SharedService', ['addFeedback']);

    TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [{ provide: SharedService, useValue: spy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit feedback successfully', () => {
    const feedbackData = {
      Feedbackmailid: 'sample@mail.com',
      Feedback: 'No Feedback'
    };

    component.feedbackData = feedbackData;

    sharedServiceSpy.addFeedback.and.returnValue(of({ success: true }));

    component.submitFeedback();

    expect(sharedServiceSpy.addFeedback).toHaveBeenCalledWith(feedbackData);
    expect(component.successMessage).toBe('Feedback submitted successfully.');
  });

  it('should handle feedback submission error', () => {
    const feedbackData = {
      Feedbackmailid: 'sample@mail.com',
      Feedback: 'No Feedback'
    };

    component.feedbackData = feedbackData;

    sharedServiceSpy.addFeedback.and.returnValue(throwError('Error'));

    component.submitFeedback();

    expect(sharedServiceSpy.addFeedback).toHaveBeenCalledWith(feedbackData);
    expect(component.errorMessage).toBe('Failed to add feedback. Please check the console for details.');
  });
});
