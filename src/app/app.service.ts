import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  listActivated: Subject<string> = new Subject<string>();
  listDeactivated: Subject<any> = new Subject<any>();

  constructor() { }
}
