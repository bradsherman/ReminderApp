import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  public host: string = 'http://localhost';
  public port: string = '3000';
  public url: string = this.host + ':' + this.port;
  public api: string = this.url + '/api';
  public graphql: string = this.url + '/graphql';
}