import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map' ;
import { Config } from '../../app.constants';

@Injectable()
export class ReminderService {

  private headers: Headers;
  private api: string;
  private graphqlApi: string;

  constructor(private _http: Http, private _config: Config) {
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.api = _config.api;
    this.graphqlApi = _config.graphql;
  }

  getReminders() {
    return this._http.get(this.api+'/reminder')
      .map(r => r.json());
  }

  saveReminder(reminder) {
    return this._http.post(this.api+'/reminder', JSON.stringify(reminder), {headers: this.headers})
      .map(r => r.json());
  }

  updateReminder(reminder) {
    return this._http.post(this.api+'/reminder'+reminder._id, JSON.stringify(reminder), {headers: this.headers})
      .map(r => r.json());
  }

  deleteReminder(reminder) {
    return this._http.delete(this.api+'/reminder'+reminder._id)
      .map(r => r.json());
  }
}