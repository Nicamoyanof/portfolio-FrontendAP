import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars

  constructor() { }

  ngOnInit(): void {
  }

  activeMenu(){
    let dropMenu = document.querySelector('.dropMenu')
    if(dropMenu){
      if(dropMenu.classList.contains('active')){
        dropMenu.classList.remove('active')
      }
      else{
        dropMenu.className+=' active'
      }
    }
  }

}
