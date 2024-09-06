import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/services/auth.service';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { AppRoutes } from '@shared/constants/app-routes.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faUser = faUser;
  faLogout = faArrowRightFromBracket;
  faArrow = faAngleRight;
  faBars = faBars;

  appRoutes = AppRoutes;

  isMenuOpen: Boolean = false;
  isMenuBarOpen: Boolean = false;

  constructor(private router : Router, private authService : AuthService) {}

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuBar(){
    this.isMenuBarOpen = !this.isMenuBarOpen;
    if (!this.isMenuBarOpen && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenus() {
    this.isMenuOpen = false;
    this.isMenuBarOpen = false;
  }

  scrollToSection(id: string) {
    if (window.location.pathname !== '/countries/home') {
      this.router.navigate(['/countries/home']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200); // Slight delay to ensure the page has loaded
      });
      this.closeMenus();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.closeMenus();
      }
    }
  }

  isAdmin() {
    if(this.authService.isAdmin()) {
      this.router.navigate(['/countries/admin-profile']);
    } else {
      this.router.navigate(['/countries/profile']);
    }
  }

  logOut() {
    this.authService.onLogOut();
  }

}
