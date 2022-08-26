import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ArticleComponent } from './article/article.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatListModule],
  declarations: [HomeComponent, SidenavComponent, ArticleComponent],
})
export class HomeModule {}
