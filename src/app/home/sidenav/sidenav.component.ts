import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidenavService } from 'src/app/_services/sidenav.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  sidenavList = Array<any>();

  fillerContent = Array.from(
    { length: 2 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidenaveServie: SidenavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getSectionList();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getSectionList() {
    this.sidenaveServie.getSectionList().subscribe((resp: any) => {
      console.log('getSectionList : ', resp);
      this.sidenavList = resp.results;
      console.log('sidenavList : ', this.sidenavList);
    });
  }
  getNavDisplayName(nav: any) {
    return nav['display_name'];
  }

  onSectionClick(section: string) {
    this.sidenaveServie.sectionSubject.next(section);
  }
}
