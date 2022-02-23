import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../models/user.model';
import { AuthenticateService } from './../../services/authenticate.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
User;
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [CookieService],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginLoading: boolean = false;
  registerLoading: boolean = false;
  showSweetAlert: boolean = false;
  sweetAlertMessage: string = '';

  isMobile = false;
  loginFormHeightSetting = {
    mobile: '68%',
    default: '85%'
  };

  sweetAlertOptions: any = {
    confirmButtonText: 'OK',
    imageUrl: '/assets/images/oops.jpg',
    imageWidth: 200,
    imageHeigh: 200,
  };

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return v.password === v.confirmPassword
      ? null
      : {
          passwordnotmatch: true,
        };
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isMobile = window.navigator.userAgent.toLowerCase().includes('mobile');
    this.route.queryParamMap
      .pipe(map((tab) => tab.get('tab')))
      .subscribe((tab) => {
        if (!tab) {
          this.router.navigate(['/auth'], { queryParams: { tab: 'login' } });
        }
      });

    this.loginForm = this.fb.group({
      username: [
        this.cookieService.get('savedUsername') || '',
        [Validators.required, Validators.maxLength(30)],
      ],
      password: [
        this.cookieService.get('savedPassword') || '',
        [Validators.required, Validators.maxLength(30)],
      ],
      remember: [
        toBoolean(this.cookieService.get('rememberChecked')) || false,
        [],
      ],
    });

    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(4),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      pw: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.maxLength(30),
              Validators.minLength(6),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.comparePassword }
      ),
    });
  }

  submitLoginForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const user = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      };
      if (this.loginForm.get('remember')?.value) {
        this.cookieService.set('savedUsername', user.username);
        this.cookieService.set('savedPassword', user.password);
        this.cookieService.set('rememberChecked', 'true');
      } else {
        this.cookieService.set('savedUsername', '');
        this.cookieService.set('savedPassword', '');
        this.cookieService.set('rememberChecked', 'false');
      }

      this.login(user);
    }
  }

  submitRegisterForm(value: {
    username: string;
    pw: { password: string; confirmPassword: string };
    phoneNumber: string;
    email: string;
  }) {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.valid) {
      this.registerLoading = true;
      const user = {
        username: value.username,
        emailAddress: value.email,
        password: value.pw.password,
        phoneNumber: value.phoneNumber,
      };
      this.register(user);
    }
  }

  register(user: {
    username: string;
    password: string;
    emailAddress: string;
    phoneNumber: string;
  }) {
    this.authService.register(user).subscribe((result: any) => {
      if (result.success) {
        let user: User = result.userInfo;
        this.sweetAlertMessage = result.message;
        this.showSweetAlert = true;
        this.userService.logIn(user);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.sweetAlertMessage = result.message;
        this.showSweetAlert = true;
      }
      this.registerLoading = false;
    });
  }

  login(user: { username: string; password: string }) {
    this.authService.login(user).subscribe((result: any) => {
      if (result.success) {
        let user: User = result.userInfo;
        this.userService.logIn(user);
        this.router.navigate(['/']);
      } else {
        this.sweetAlertMessage = result.message;
        this.showSweetAlert = true;
      }
      this.loginLoading = false;
    });
  }
  swalDidClose() {
    this.showSweetAlert = false;
    this.sweetAlertMessage = '';
  }
}
