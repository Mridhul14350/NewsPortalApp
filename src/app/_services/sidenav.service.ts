import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  api_key = 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';
  sectionApi =
    'https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=' +
    this.api_key;


  sectionSubject = new BehaviorSubject<any>({});

  constructor(private router: Router, private http: HttpClient) {}

  getSectionList() {
    return this.http.get(this.sectionApi);
  }
}
