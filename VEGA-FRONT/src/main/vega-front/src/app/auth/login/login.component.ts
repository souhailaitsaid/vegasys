import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/api/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInfoService } from '../../services/user-info.service';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  errMsg: string = '';
  form: FormGroup

  constructor(
    private router: Router,
    private loginService: LoginService,private userInfoService : UserInfoService,private dataService : DataService) { }
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  toggleLoadingAnimation() {
    this.loading = !this.loading
  }
  login() {
    this.errMsg = null
    this.submitted = true;
    this.loading = true;
    this.loginService.getToken(this.form.controls['username'].value, this.form.controls['password'].value)
      .subscribe(resp => {
        this.submitted = false;
        
        if (resp.operationStatus === "ERROR" || resp.item === undefined ) {
          this.errMsg = 'Username or password is incorrect';
          this.loading = false;
        }
        else {
          this.loading = false;
          this.dataService.client = resp.item.client
          this.userInfoService.storeUserInfo(JSON.stringify(resp.item));
          console.log(resp)
          this.router.navigate([this.loginService.landingPage]);
        }

      },
        errResponse => {
          this.loading = false;
          switch (errResponse.status) {
            case 401:
              this.errMsg = 'Username or password is incorrect';
              break;
            case 404:
              this.errMsg = 'Service not found';
            case 408:
              this.errMsg = 'Request Timedout';
            case 500:
              this.errMsg = 'Internal Server Error';
            default:
              this.errMsg = 'Server Error';
          }
        }
      );
  }


}
