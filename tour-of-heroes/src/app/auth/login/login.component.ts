import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../admin/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
  }

  setMessage() {
    this.message = '登陆' + (this.authService.isLoggedIn ? '进入中' : '出去了');
  }

  login() {
    this.message = '正尝试登陆...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // 从认证服务获取重定向url，如果没有设置重定向，就使用默认值
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/heroes';
        // 用户重定向到这
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  ngOnInit() {
  }

}
