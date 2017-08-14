import { Component } from '@angular/core';
import { Config } from './app.constants';
import { ReminderService } from './services/reminder/reminder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Config, ReminderService]
})
export class AppComponent {
  title = 'app works!';
}
