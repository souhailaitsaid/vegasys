import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username
  constructor(private userInfo : UserInfoService) {
    this.username = this.userInfo.getUserName()
   }

  ngOnInit() {
  }

}
