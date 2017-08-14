import { Component, OnInit } from '@angular/core';
import { Reminder } from '../../Reminder';
import { ReminderService } from '../../services/reminder/reminder.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
  providers: [ReminderService]
})
export class RemindersComponent implements OnInit {

  reminders: Reminder[];

  constructor(private _reminderService: ReminderService) { }

  ngOnInit() {
    this.reminders = [];
    this._reminderService.getReminders()
      .subscribe(reminders => {
        this.reminders = reminders;
      });
  }

  addReminder(event, reminderText) {
    let result;
    let newReminder = {
      description: reminderText.value,
      author: 'Brad Sherman'
    };

    result = this._reminderService.saveReminder(newReminder);
    result.subscribe(res => {
      newReminder["_id"] = res._id;
      this.reminders.push(newReminder);
      reminderText.value = '';
    });
  }

  setEditState(reminder, state) {
    if (state) {
      reminder.isEditMode = state;
    } else {
      delete reminder.isEditMode;
    }
  }

  updateStatus(reminder) {
    let _reminder = {
      _id: reminder._id,
      description: reminder.description,
      author: null
    }
    this._reminderService.updateReminder(_reminder)
      .subscribe(data => {
        reminder.isCompleted = !reminder.isCompleted;
      });
  }

  updateReminderDescription(event, reminder) {
    if (event.which == 13) {
      reminder.description = event.target.value;
      var _reminder = {
        _id: reminder._id,
        description: reminder.description,
        author: null
      }
      this._reminderService.updateReminder(_reminder)
        .subscribe(data => {
          this.setEditState(reminder, false);
        });
    }
  } 

  deleteReminder(reminder) {
    var reminders = this.reminders;

    this._reminderService.deleteReminder(reminder._id)
      .subscribe(data => {
        console.log(reminders);
        if (data.n == 1) {
          // remove reminder from list
          for (var i = 0; i < reminders.length; i++) {
            console.log(reminders[i]);
            if (reminders[i]["_id"] == reminder._id) {
              reminders.splice(i, 1);
            }
          }
        }
      });
  }
}
