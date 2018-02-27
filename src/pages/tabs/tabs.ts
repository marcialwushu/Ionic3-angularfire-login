import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage({
  name: 'tabs'
})

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: string = 'home';
  tab2Root: string = 'home';
  tab3Root: string = 'home';
  

  constructor() {

  }
}
