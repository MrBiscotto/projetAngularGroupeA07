import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MemberService} from '../member/member.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _currentUrl: string;
  private _isHiddenPwdUser = true;
  public admin: Object;

  constructor(private router: Router, private _cookieService: CookieService,
              private _memberService: MemberService) {
    router.events.subscribe((_: NavigationEnd) => this._currentUrl = _.url);

  }

  ngOnInit() {}

  public adminAccess() {
    const cookieExists: boolean = this._cookieService.check('login');
    if (cookieExists === true) {
      this.admin = this._memberService.getMember(this._cookieService.get('login'));

       if (this._cookieService.get('admin') === '1') {
          this.router.navigate(['member']);
        } else {
         alert('Denied access');
        }

    } else {
      alert('Denied access');
    }

  }


  public userAccess() {

    const cookieExists: boolean = this._cookieService.check('login');

    if (cookieExists === true) {
      this.router.navigate(['add-auction']);
    } else {
      this.router.navigate(['login']);
      alert('You must be connected !');
    }
  }



}
