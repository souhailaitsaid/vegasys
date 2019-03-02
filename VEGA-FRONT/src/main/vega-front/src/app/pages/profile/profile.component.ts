import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { UserService } from '../../@core/data/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user : any
  
  form: FormGroup
  constructor(  private toaster: ToasterService,
    private translate: TranslateService,private userService : UserService , private userinfoService : UserInfoService) { }

  ngOnInit() {
    this.userService.findByUsername( this.userinfoService.getUserName()).subscribe(response => {
      this.user = response
      console.log(response)
    })
        this.form = new FormGroup({
      newPassword: new FormControl(null, Validators.required),
      oldPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
     
    });
   
  }

  reset() {
    this.form.reset();
  }
  passwordNotMatch() : boolean{

    return  this.form.controls['newPassword'].value !== this.form.controls['confirmPassword'].value
          
  }
  changePassword(){
      this.userService.changePassword(
        this.user.username,
        this.form.controls['oldPassword'].value,
        this.form.controls['newPassword'].value
      ).subscribe(response =>{
        if(response.success){
          this.showToast('success', this.translate.instant(response.message), '')
          this.user.reset()
        }
        else{
          this.showToast('warning', this.translate.instant(response.message), '')
         
        }
      })
  }

  private showToast(type: string, title: string, body: string) {

    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toaster.popAsync(toast);
  }

}
