import {Component, Inject} from '@angular/core';
import {Activity} from '../../shared/model/activity';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivityService} from '../../shared/services/activity.service';
import {UserService} from '../../shared/services/user.service';

class ActivityModalComponent {
}

@Component({
  selector: 'app-activity-register',
  standalone: false,
  templateUrl: './activity-register.component.html',
  styleUrl: './activity-register.component.css'
})
export class ActivityRegisterComponent {
  activity: Activity = new Activity('', '', '', '', new Date(), '', '','', '', 0);

  constructor(
    public dialogRef: MatDialogRef<ActivityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activityService: ActivityService,
    public userService: UserService
  ) {}

  onSubmit(): void {
    if (
      this.activity &&
      this.activity.title &&
      this.activity.description &&
      this.activity.date &&
      this.activity.hour &&
      this.activity.title.trim() !== '' &&
      this.activity.description.trim() !== ''
    ) {
      const hour = this.activity.hour.split(':').map(Number);
      this.activity.date = new Date(this.activity.date.getFullYear(),
                                    this.activity.date.getMonth(), this.activity.date.getDate(),
                                    hour[0], hour[1]);
      this.activity.userID = this.userService.getCurrentUser().id;
      this.activityService.register(this.activity).subscribe(newActivity => this.activityService.updateActivities());
    }
    else {
      alert("Preencha os campos obrigatórios");
      return;
    }
    this.dialogRef.close();
  }

  formatHour() {
    let cleaned = this.activity.hour.replace(/\D/g, '');

    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }
    this.activity.hour = cleaned.slice(0, 5);
  }
}
