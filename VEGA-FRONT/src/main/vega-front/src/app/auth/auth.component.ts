import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <nb-layout>
  <nb-layout-column>
   

          <router-outlet></router-outlet>
    

  </nb-layout-column>
</nb-layout>
`,
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
