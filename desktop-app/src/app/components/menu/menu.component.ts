import { Component, OnInit } from '@angular/core';
import { faHome, faBroadcastTower, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  faHome = faHome;
  faRadio = faBroadcastTower;
  faExplore = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
