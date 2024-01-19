import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackData = {
    Feedbackmailid: '',
    Feedback: ''
  };

  errorMessage: string = null;
  successMessage: string = null;

  constructor(private sharedService: SharedService) {}

  submitFeedback() {
    this.sharedService.addFeedback(this.feedbackData).subscribe(
      () => {
        this.successMessage = 'Feedback submitted successfully.';
        this.clearForm();
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to add feedback. Please check the console for details.';
      }
    );
  }

  clearForm() {
    this.feedbackData.Feedbackmailid = '';
    this.feedbackData.Feedback = '';
  }
}
