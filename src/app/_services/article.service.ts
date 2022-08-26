import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  api_key = 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';
  articleApi =
    'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=' +
    this.api_key;

  constructor(private router: Router, private http: HttpClient) {}

  getArticleList() {
    return this.http.get(this.articleApi);
  }
}
