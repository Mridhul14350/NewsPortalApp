import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { ArticleService } from 'src/app/_services/article.service';
import { SidenavService } from 'src/app/_services/sidenav.service';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articleList = Array<any>();
  articleListFiltered = Array<any>();
  newsSection: string = 'All';

  constructor(
    public articleService: ArticleService,
    private accountService: AccountService,
    private router: Router,
    private sidenaveServie: SidenavService
  ) {}

  ngOnInit() {
    this.newsSection = 'All';
    this.getArticleList();
    this.sidenaveServie.sectionSubject.subscribe((section: string) => {
      // console.log('section : ', section);
      if (typeof section == 'string') this.newsSection = section;

      this.articleListFiltered = this.articleList.filter((article, index) => {
        // console.log('article : ', article);
        return article['section'].toLowerCase() == section.toLowerCase()
          ? true
          : false;
      });
      // console.log(' this.articleListFiltered ', this.articleListFiltered);
    });
  }

  getArticleList() {
    this.articleService.getArticleList().subscribe((resp: any) => {
      // console.log('getArticles : ', resp);
      this.articleList = resp.results;
      // console.log('articleList : ', this.articleList);
      this.articleListFiltered = JSON.parse(JSON.stringify(this.articleList));
    });
  }

  logout() {
    this.accountService.logout();
  }

  goToProfile() {
    this.router.navigate(['../account/profile']);
  }
}
