import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faUser = faUser;
  faLogout = faArrowRightFromBracket;
  faArrow = faAngleRight;

  isMenuOpen: Boolean = false;

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}
