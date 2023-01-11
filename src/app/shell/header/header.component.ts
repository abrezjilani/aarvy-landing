import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  bookAnAppointment() {
    this.router.navigate([], { fragment: 'form-section' });
  }

  menuClick() {
    var menu = document.getElementById('mobile-menu') as HTMLDivElement;
    var nav = document.getElementById('navContent') as HTMLDivElement;
    // console.log(nav)
    nav.classList.toggle('mobile-nav');
    menu.classList.toggle('is-active');
  }
}
