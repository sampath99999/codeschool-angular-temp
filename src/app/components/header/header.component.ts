import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

interface MenuItem {
  label: string;
  link: string,
  isButton?: boolean
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Blog',
      link: '/blog'
    },
    {
      label: 'Login',
      link: '/login',
    },
    {
      label: 'Register',
      link: '/register',
    }
  ];
}
